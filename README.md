# ![Burst SMS Logo](https://cdn.burstsms.com.au/_ui/images/au/logo.png) Challenge
**Engineered by:** [Francisco Preller](https://au.linkedin.com/in/francisco-preller-64508a5a)

## Overview
The challenge in question asks for a relatively simple implementation of an interface
which uses internal BurstSMS API endpoints to achieve the following task:

> Create a web form in which a user can enter a phone number and upto 3 SMS messages worth
> of text The application must load in credentials from a .env file in the root directory and we will
> use our tokens when testing it.
> On submission of the form search and replace any found http urls with a bitly shortlink via the
> Bitly API Once the message is ready, send it to the given phone number as an sms via the
> HTTP BurstSMS API Please do not use the existing BurstSMS API client libraries

![alt text](https://bit.ly/2DqW9YR)

__*Note the architecture and technologies chosen are simply to be showcased, the
project's requirements are actually much too simple for this much infrastructure;
However, it is built with readability, scalability and performance in mind.*__

## Technologies Used
- Containerisation: [docker](https://docs.docker.com/)
- Orchestration: [docker-compose](https://docs.docker.com/compose/)
- Internal load balancing: [traefik](https://traefik.io/)
- Service container OS: [node:alpine-11](https://hub.docker.com/_/node/)
- Web interface container OS: [node:11](https://hub.docker.com/_/node/)
- Web interface views: [reactJS](https://reactjs.org/)
- Web interface state management: [redux](https://redux.js.org/)
- Web interface components: [materialUI](https://material-ui.com/)

**Note:**
For the purposes of this challenge, ReactJS, Redux and Webpack were installed using
an existing boilerplate template; this comes ready with industry standards for
react-redux development, but is minimalistic in nature.
[This open source template was used.](<https://github.com/flexdinesh/react-redux-boilerplate>)

## Installation Instructions
*Installation assumes that __docker__ and __docker-compose__ are installed on the
runtime environment, see <https://docs.docker.com/install/> for instructions on how
to install docker and <https://docs.docker.com/compose/install/> for docker-compose)*

1. Rename `docker-compose.env.sample` to `docker-compose.env`, note that `.env` files
   are listed under `.gitignore` to prevent leaking of environment variables into Github.
2. Add necessary BurstSMS testing credentials into the env file; `BURSTSMS_KEY` and `BURSTSMS_SECRET`
3. Add Bitly API token into the env file; `BITLY_ACCESS_TOKEN`.
   [How to get your Bitly token.](https://dev.bitly.com/v4/#section/HTTP-Basic-Authentication-Flow)
4. From the root directory, run the following commands:
```
# NOTE: Linux users will likely require the use of sudo with the below commands

# To start all services
$ docker-compose up -d --build --scale webclient=2 --scale=smsgateway=2 --scale=bitlygateway=3

# Alternatively, I've included an npm script to do exactly the same as the above
$ npm start

# To watch all logs
$ docker-compose logs -f
```

## Accessing the application
To access the web application, simply open your favourite browser and navigate
to: <http://localhost:3333/>, don't be confused by the terminal output which may
point you towards port 80, that is only the local port it runs in docker. To
avoid conflicts with computers that have web servers installed, I have used
Traefik as a reverse proxy to port-forward to 3333 for all services.

## Accessing traefik web UI
Traefik includes a control panel where statistics and information about the running
containers can be analysed and debugged. To access the Traefik web UI simply
navigate your browser to: <htto://localhost:8888>

The web UI offers good insight and is proof of the container replication
being used, here is a screenshot of what it looks like:
![Traefik Web UI](https://i.imgur.com/nHVZJQz.png)

## Notes and observations
- The entire challenge took about 12-14 hours all up, and also some of the scope
  was de-scoped as I took on too much initially (this was fun!).
- There are still some bugs lurking on the client, one known issue is to do with
  the client-side validations of the fields, where clearing the field completely
  can be difficult.
- The server-side validations are lackluster at best and on a real-world project
  would be cause for concern. This is a known issue and happy to expand on the
  importance of server-side validation as opposed to mostly client-side validation.
- Testing is lackluster but i did try to include some as examples on the front
  end; again server-side unit testing and test driven development would have
  been a choice of mine, given more time on the challenge.
- Containers are designed to be stateless, and thus, horizontally available for
  scaling by default, the replicas can be controlled with the `--scale` flag
  during the `docker-compose up` command issue.
- The module system used on all server side services is `CommonJS`, while the
  web interface uses `Native Ecmascript` modules using webpack as a transpiler.
- Web interface was created with ReactJS and Redux to demonstrate competence
  with these technologies, as mentioned on the list of technologies used though,
  I have chosen to use a pre-existing boilerplate made by someone else.
  
### Issues or Concerns?
You can get in touch by emailing me! [francisco.preller@gmail.com](mailto:francisco.preller@gmail.com)

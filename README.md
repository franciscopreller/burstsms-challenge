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
- Message queues: [nats](https://nats.io/)
- Websocket: [socketcluster](https://socketcluster.io/#!/)
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

1. Rename `docker-compose.env.sample` to `docker-compose.env`, note that `docker-compose.yml`
   is listed under `.gitignore` to prevent leaking of environment variables into Github.
2. Add necessary testing credentials into the env file; `BURSTSMS_KEY` and `BURSTSMS_SECRET`
3. From the root directory, run the following commands:
```
# Linux users will likely require the use of sudo with the below commands

# To start all services
$ docker-compose up -d --build

# To watch all logs
$ docker-compose logs -f
```

## Accessing the application
To access the web application, simply open your favourite browser and navigate
to: <http://localhost:3333/>

## Notes and observations
- Containers are replicated by default, this is to demonstrate statelessness and
  the ability to horizontally scale any of the components, to see container
  replication, examine the `docker-compose.yml` file on the root.
- The module system used on all server side services is `CommonJS`, while the
  web interface uses `Native Ecmascript` modules using webpack as a transpiler.
- Web interface was created with ReactJS and Redux to demonstrate competence
  with these technologies, as mentioned on the list of technologies used though,
  I have chosen to use a pre-existing boilerplate made by someone else.
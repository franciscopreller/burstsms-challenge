const restify = require('restify');
const pkg = require('../package.json');
const server = restify.createServer({
  name: pkg.name,
  version: pkg.version,
});
// server.use(restify.bodyParser());

// Routes
server.get('/api/sms/:id', (req, res, next) => {
  const messageId = req.params.id;
  res.send({ ok: true, messageId });
  next();
});

server.post('/api/sms', (req, res, next) => {
  console.log('Got post', req);
  res.send(req.body);
  next();
});

server.listen(process.env.PORT || 80, () => {
  console.log(`${server.name} listening at ${server.url}`);
});

const languages = require('./languages.json');

exports.handler = (req, resp, context) => {
  resp.setHeader('Content-Type', 'application/json');
  resp.send(JSON.stringify(languages));
};

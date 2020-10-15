const languages = require('./languages.json');

exports.handler = (req, resp, context) => {
  resp.setHeader('Content-Type', 'application/json');
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.send(JSON.stringify(languages));
};

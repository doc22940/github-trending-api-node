const { fetchRepositories } = require('./utils/fetch');

exports.handler = async (req, resp, context) => {
  const { language, since, spoken_language_code: spokenLanguage } = req.queries;
  const data = await fetchRepositories({ language, since, spokenLanguage });
  resp.setHeader('Content-Type', 'application/json');
  resp.setHeader('Cache-Control', 'max-age=900');
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.send(JSON.stringify(data));
};

const { fetchRepositories } = require('./utils/fetch');

exports.handler = async (req, resp, context) => {
  const { language, since, spoken_language_code: spokenLanguage } = req.queries;
  const data = await fetchRepositories({ language, since, spokenLanguage });
  resp.setHeader('Content-Type', 'application/json');
  resp.send(data);
};

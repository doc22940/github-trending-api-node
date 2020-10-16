const { fetchRepositories } = require('./utils/fetch');

const cache = {
  data: {},
  get: function (key) {
    let result;
    if (this.data[key]) {
      if (this.data[key].expiredTime >= Date.now()) {
        result = this.data[key].value;
      } else {
        delete this.data[key];
      }
    }
    return result;
  },
  set: function (key, value, lifetime) {
    this.data[key] = { value, expiredTime: Date.now() + lifetime };
  },
};

exports.handler = async (req, resp, context) => {
  const { language, since, spoken_language_code: spokenLanguage } = req.queries;
  const cacheKey = JSON.stringify({ language, since, spokenLanguage });
  let data = cache.get(cacheKey);
  if (!data) {
    data = await fetchRepositories({ language, since, spokenLanguage });
    cache.set(cacheKey, data, 3600 * 1000);
  }
  resp.setHeader('Content-Type', 'application/json');
  resp.setHeader('Cache-Control', 'max-age=3600');
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.send(JSON.stringify(data));
};

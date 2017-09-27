
const request = require('request');

function paramsWithTag (tag) {
  let query = {sort: 'votes',
    order: 'desc',
    site: 'softwareengineering',
    fromdate: '1320969600',
    todate: '1506475291',
    pagesize: '5',
    page: '1',
    answered: 'false',
    tagged: tag
  };

  let requestParams = {
    method: 'GET',
    uri: 'https://api.stackexchange.com/2.2/questions',
    gzip: 'true',
    json: 'body',
    qs: query
  };
  return requestParams;
}

function Questions (tag) {
  let params = paramsWithTag(tag);
  return function downloader (arr) {
    return new Promise(function (resolve, reject) {
      request(params, (error, response, body) => {
        if (!error) {
          if (response.body && response.body.items) {
            resolve(arr.concat(response.body.items));
          } else {
            resolve(arr);
          }
        } else {
          reject(`error: ${response}`);
        }
      });
    });
  };
}

module.exports = Questions;

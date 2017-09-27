const encodeUrl = require('encodeurl');

describe('POC', () => {
  it('request using manual connection', (done) => {
    const request = require('request');
    const query = {sort: 'votes',
      order: 'desc',
      site: 'softwareengineering',
      fromdate: '1320969600',
      todate: '1506475291',
      pagesize: '10',
      page: '1',
      tagged: 'programming-practices',
      answered: 'false'
    };

    const requestParams = {
      method: 'GET',
      uri: 'https://api.stackexchange.com/2.2/questions',
      gzip: 'true',
      json: 'body',
      qs: query
    };

    request(requestParams, (error, response, body) => {
      if (!error) {
        console.log(response);
        if (response.body && response.body.items) {
          response.body.items.map((item) => {
            return {score: item.score, link: item.link, title: item.title};
          }).forEach((scored) => {
            console.log(scored);
          });
        }
      } else {
        console.log(`error: ${response}`);
      }
      done();
    });
  });
  it.skip('encode tags', (done) => {
    console.log(encodeUrl('good-practices'));
    done();
  });
  it.skip('connect on SE and get some data', (done) => {
    const Stackexchange = require('stackexchange-node');
    const apiOptions = { version: 2.2 };
    const api = new Stackexchange(apiOptions);
    const filter = {
      pagesize: 5,
      tagged: ['programming-practices'],
      sort: 'votes',
      order: 'desc',
      site: 'softwareengineering'
    };
    console.log(`Searching using: ${filter}`);
    api.questions.questions(filter, function (err, results) {
      if (err) throw err;
      console.log(results);
      done();
    });
  }).timeout(5000);
});

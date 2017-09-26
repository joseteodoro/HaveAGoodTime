
const Stackexchange = require('stackexchange-node');
const encodeUrl = require('encodeurl');

describe ('POC', () => {
  it('encode tags', (done) => {
    console.log(encodeUrl('good-practices'));
    done();
  });
  it('connect on SE and get some data', (done) => {
    const apiOptions = { version: 2.2 };
    const api = new Stackexchange(apiOptions);
    const filter = {
      pagesize: 5,
      tagged: ['pattern'],
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

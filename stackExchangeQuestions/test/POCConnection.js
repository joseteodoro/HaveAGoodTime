
describe('POC', () => {
  it('request using manual connection', (done) => {
    const Questions = require('../Questions');
    Questions('programming-practices')([])
    .then(Questions('good-practices'))
    .then(Questions('patterns-and-practices'))
    .then((arr) => {
      arr.map((question) => {
        return {score: question.score, link: question.link, title: question.title, tags: question.tags};
      }).forEach((scored) => {
        console.log(scored);
      });
      done();
    });
  }).timeout(60000);
});

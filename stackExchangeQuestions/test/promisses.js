
const Promise = require('bluebird');
const assert = require('assert');

function A (str) {
  return new Promise(function (resolve, reject) {
    var result = `${str} A`;
    resolve(result);
  });
}

function B (str) {
  return new Promise(function (resolve, reject) {
    var result = `${str} B`;
    setTimeout(function () {
      resolve(result);
    }, 1000);
  });
}

function C (str) {
  return new Promise(function (resolve, reject) {
    var result = `${str} C`;
    resolve(result);
  });
}

function D (str) {
  return new Promise(function (resolve, reject) {
    var result = `${str} D`;
    resolve(result);
  });
}

describe.skip('promisses suite', () => {
  it('First one working', (done) => {
    A('')
    .then(B)
    .then(C)
    .then(D)
    .then((str) => {
      assert(`A B C D`, str);
      done();
    });
  });
  it('Another one working', (done) => {
    A('')
    .then(B)
    .then(C)
    .then(D)
    .then(done); // works with error messages
  });
  it('This doesnt work', (done) => {
    A('')
    .then(B)
    .then(C)
    .then(D)
    .then(done()); // promisse controls the flow, when I call done() it runs done awhile defining the chain
    // you must define the chain and let promisse take care of that.
  });
});

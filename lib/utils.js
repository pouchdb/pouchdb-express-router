'use strict';

module.exports.sendError = function(res, err, baseStatus) {
  var status = err.status || baseStatus || 500;
  // last argument is optional
  if (err.name && err.message) {
    if (err.name === 'Error' || err.name === 'TypeError') {
      if (err.message.indexOf("Bad special document member") !== -1) {
        err.name = 'doc_validation';
      // add more clauses here if the error name is too general
      } else {
        err.name = 'bad_request';
      }
    }
    err = {
      error: err.name,
      reason: err.message
    };
  }
  module.exports.sendJSON(res, status, err);
};

module.exports.sendJSON = function(res, status, body) {
  res.status(status);
  res.setHeader('Content-Type', 'application/json');
  res.send(new Buffer(JSON.stringify(body) + "\n", 'utf8'));
};

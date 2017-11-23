'use strict';

// PouchDB is not a dependency of pouchdb-express-router so to run
// this example server you will need to `npm install pouchdb`
// TODO: would be nice to have the error message say that.
var PouchDB = require('pouchdb');

var router = require('./index.js');
var app = require('express')();

const PORT = process.env.PORT || 5984;

app.use(router(PouchDB));
app.listen(PORT);

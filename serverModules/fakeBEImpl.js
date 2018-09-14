module.exports = function(aLogLevel) {
  'use strict';

  const Utils = require('swagger-boilerplate').Utils;
  const logger = new Utils.MultiLevelLogger('FakeBE Implementation', aLogLevel);

  const DEFAULT_WIDTH = 400;
  const DEFAULT_HEIGHT = 400;

  function dumpReq(req) {
    logger.log('req.path:', req.path, 'params:', req.params);
    logger.log('query:', req.query, 'body:', req.body);
    logger.log('req.user:', req.user, 'req.someData:', req.someData);
  }

  const validator = new(require('./validator'))(aLogLevel);

  const misPruebas = new(require('./misPruebas'))(aLogLevel);

  function setHeaders(aRes, length) {
    aRes.setHeader("Content-Type", "image/png");
    aRes.setHeader("Content-Length", length);
  }

  function normalize(aReq, aRes, aNext) {
    let query = aReq.query || {};

    // Whatever is needed to do with the query

    aReq.query = query;
    aNext();
  }

  function parseData(aReq, aRes, aNext) {
    //if (!aReq.path.startsWith('/charts')) {
    //  return aNext();
    //}

    aNext();
  }

  function validate(aReq, aRes, aNext) {
    //if (!aReq.path.startsWith('/charts')) {
    //  return aNext();
    //}

    let isValid = validator.isValid(aReq);
    if (!isValid) {
      aRes.status(403).send('Unauthorized access');
    } else {
      aNext();
    }
  }

  function regenerateQuery(aReq, aRes, aNext) {
    // let paramB64 = aReq.query.param;
    // let param = Buffer.from(paramB64, 'base64').toString('ascii');
    // aReq.query = JSON.parse(param);
    aNext();
  }

  return {
    validate: validate,
    regenerateQuery: regenerateQuery,
    normalize: normalize,
    parseData: parseData,
    getUser: misPruebas.getUserMovistarHome
  };

};

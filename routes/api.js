'use strict';
const ConvertHandler = require('../controllers/convertHandler.js');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.route('/api/convert').get((req, res, data) => {
    let initNum = null;
    let initUnit = null;
    const myRegex = /[a-z]/i;
    const regexMatch = req.query.input.match(myRegex);
    if(regexMatch==null) {
      initNum = req.query.input;
      initUnit = "invalid unit";
    } else {
      initNum = req.query.input.split("").splice(0, regexMatch.index).join("");
      initUnit = req.query.input.split("").splice(regexMatch.index).join("");
    };
    let convertHandler = new ConvertHandler(initNum, initUnit);
    res.json(convertHandler.getString);
  })
};

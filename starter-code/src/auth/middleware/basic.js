'use strict';

const base64 = require('base-64');
const { users } = require('../models')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ');
  let encodedString = basic.pop();
  let [username, pass] = base64.decode(encodedString).split(':');

  try {
    req.user = await user.authenticateBasic(username, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}


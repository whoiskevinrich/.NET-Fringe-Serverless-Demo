//var util = require('util');

import util from "util";

module.exports = function(ctx, cb) {
  //console.log(util.inspect(ctx.body, {depth:null}));
  console.log(util.inspect(ctx.body.issue.url));
  cb();
};
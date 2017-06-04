var util = require('util');
module.exports = function(ctx, cb) {
  console.log(util.inspect(ctx.body, {depth:null}));
  cb();
};
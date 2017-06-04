module.exports = function(ctx, cb) {
  console.log("Webhook invoked");
  cb(null, { hello: ctx.data.name || 'Anonymous' });
};
module.exports = function(ctx, cb) {
  var slack = require("slack-notify")(ctx.secrets.SLACK_URL);
  var body = ctx.body;
  var attempts;
  
  if (ctx.data.showstats === "true") {
    return getStats();
  }
  else if (body.issue && body.action === "opened") {
    console.log("issue created");
    var issue = body.issue;

    var text='*New Issue*\n\n' + 
             `Repository: ${body.repository.full_name}\n` +
             `Number: ${issue.number}\n` +
             `Url: ${issue.url}\n` +
             `Title: ${issue.title}\n\n` +
             `${issue.body}`;
             
    slack.send({text:text, username: "webtask-bot", icon_emoji: ":robot_face:"}); 
    incrementCounter();
  }

  function incrementCounter() {
    ctx.storage.get(function(error, data){
      if (data === undefined) {
        data={};
      }
      var repoName = body.repository.full_name
      data[repoName] === undefined ? data[repoName] = 1 : data[repoName]++;
      attempts = 3 ;
      ctx.storage.set(data, function(error) {
        setStorage(error, data);
      });
    });
  }
  
  function setStorage(error,data) {
    if(error) {
      if (error.code == 409 && attempts--) {
        data.counter = Math.max(data.counter, error.conflict.counter) + 1;
        return ctx.storage.set(data, setStorage);
      }
      else {
        return cb(error);
      }
    }
    cb();
  }
  
  function getStats() {
    ctx.storage.get(function(error,data){
      cb(null, data); 
    });
  }
}; 
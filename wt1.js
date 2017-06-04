module.exports = function(ctx, cb) {
  var slack = require("slack-notify")(ctx.secrets.SLACK_URL);
  var body = ctx.body;
  if (body.issue && body.action === "opened") {
    var issue = body.issue;

    var text='*New Issue*\n\n' + 
             `Repository: ${body.repository.full_name}\n` +
             `Number: ${issue.number}\n` +
             `Url: ${issue.url}\n` +
             `Title: ${issue.title}\n\n` +
             `${issue.body}`;

    slack.send({text:text, username: "webtask-bot", icon_emoji: ":robot_face:"});   
  }
  cb();
};
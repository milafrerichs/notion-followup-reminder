var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1"  });

const sendEmail = async function sendEmail(to, from, subject, text) {
  var params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: { Data: text },
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };
  return ses.sendEmail(params).promise()
};
module.exports = {
  sendEmail
}

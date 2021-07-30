'use strict';

const { sendNextContactEmail } = require('./lib/followup');

module.exports.followup= async (event) => {
  const result = await sendNextContactEmail();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: result,
      },
      null,
      2
    ),
  };
};

/* jshint camelcase:false */
'use strict';

var crypto = require('crypto');

module.exports = {
  description: 'Gets S3 policy',
  tags:['s3'],
  handler: function(request, reply){
    var policy = {
      'expiration': '2020-01-01T00:00:00Z',
      'conditions': [
        {'bucket': 'kjones-notetakr'},
        ['starts-with', '$key', ''],
        {'acl': 'public-read'},
        ['starts-with', '$Content-Type', ''],
        ['starts-with', '$filename', ''],
        ['content-length-range', 0, 524288000]
      ]
    },
    encodedPolicy = new Buffer(JSON.stringify(policy)).toString('base64'),
    secret = process.env.AWS_SECRET_ACCESS_KEY,
    accessKey = process.env.AWS_ACCESS_KEY_ID,
    signature = crypto.createHmac('sha1', secret).update(encodedPolicy).digest('base64');

    reply({policy:encodedPolicy, signature:signature, accessKey:accessKey});
  }
};

/* jshint camelcase:false */
'use strict';

var pg = require('../postgres/manager'),
    AWS    = require('aws-sdk'),
    crypto = require('crypto'),
    path   = require('path'),
    concat = require('concat-stream');

function Note(){
}

Note.create = function(user, obj, cb){
  pg.query('select add_note($1, $2, $3, $4, $5)', [user.id, obj.title, obj.body, obj.tags, obj.photos], function(err, results){
    cb();
  });
};

Note.all = function(user, query, cb){
  pg.query('select * from query_notes($1, $2, $3, $4)', [user.id, query.limit, query.offset, query.tag], function(err, results){
    cb(err, results.rows);
  });
};

Note.show = function(query, cb){
  pg.query('select * from get_note($1)', [query.noteId], function(err, results){
    var note = results.rows[0];
    cb(err, note);
  });
};

Note.remove = function(user, noteId, cb){
  pg.query('select delete_note($1, $2)', [user.id, noteId], function(err, results){
    cb(err, results);
  });
};

Note.count = function(user, cb){
  pg.query('select count(*) from notes where user_id = $1', [user.id], function(err, results){
    cb(err, results && results.rows ? results.rows[0].count : null);
  });
};

Note.phoneUpload = function(user, b64, noteId, cb){

  var s3   = new AWS.S3(),
      imgBuf = new Buffer(b64, 'base64');

  crypto.randomBytes(48, function(ex, buf){
    var hex = buf.toString('hex'),
    loc = user.token + '/' + noteId + '/' + hex + '.png',
    url = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc;

    pg.query('insert into photos (url, note_id) values ($1, $2) returning id', [url, noteId], function(err, results){
      if(err){return cb(err);}
        console.log(results);
        var params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: imgBuf, ACL: 'public-read'};
        s3.putObject(params, cb);

    });
  });
};

module.exports = Note;

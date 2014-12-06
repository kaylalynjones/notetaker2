'use strict';

var pg = require('../postgres/manager');

function Note(){
}

Note.create = function(user, obj, cb){
  pg.query('select add_note($1, $2, $3, $4)', [user.id, obj.title, obj.body, obj.tags], function(err, results){
    cb();
  });
};

Note.all = function(user, query, cb){
  pg.query('select * from query_notes('+ user.id + ',' + query.limit +',' + query.offset +')', [], function(err, results){
    cb(err, results.rows);
  });
};

module.exports = Note;

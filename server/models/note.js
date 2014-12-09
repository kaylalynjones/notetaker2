/* jshint camelcase:false */
'use strict';

var pg = require('../postgres/manager');

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

module.exports = Note;

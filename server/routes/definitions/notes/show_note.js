/* jshint camelcase:false */
'use strict';

var Joi  = require('joi'),
Note = require('../../../models/note');

module.exports = {
  description: 'Display user notes',
  tags:['notes'],
  validate: {
    query: {
      note_id: Joi.string().required()
    }
  },
  handler: function(request, reply){
    console.log('HAI!!!! request.query=' + request.query);
    Note.show(request.query, function(err, note){
      console.log('ERROR', err);
      reply({note:note, err:err}).code(err ? 400 : 200);
    });
  }
};

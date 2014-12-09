/* jshint camelcase:false */
'use strict';

var Joi  = require('joi'),
Note = require('../../../models/note');

module.exports = {
  description: 'Display user notes',
  tags:['notes'],
  validate: {
    params: {
      noteId: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Note.show(request.params, function(err, note){
      reply({note:note, err:err}).code(err ? 400 : 200);
    });
  }
};

/* jshint camelcase:false */
'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Display user notes',
  tags:['notes'],
  validate: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
      tag: Joi.string()
    }
  },
  handler: function(request, reply){
    Note.all(request.auth.credentials, request.query, function(err, notes){
        reply({notes:notes, err:err}).code(err ? 400 : 200);
    });
  }
};

'use strict';

var Joi  = require('joi'),
Note = require('../../../models/note');

module.exports = {
  description: 'Upload a Photo from Device',
  tags:['notes'],
  validate: {
    params: {
      noteId: Joi.number().required()
    }
  },
  payload:{
    maxBytes: 20500500
  },
  handler: function(request, reply){
    Note.phoneUpload(request.auth.credentials, request.payload.b64, request.params.noteId, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};

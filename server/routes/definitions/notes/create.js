'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Create a Note',
  tags:['notes'],
  validate: {
    payload: {
      title: Joi.string().required(),
      body: Joi.string().required(),
      tags: Joi.string().required(),
      photos: Joi.string().allow('').optional()
    }
  },
  handler: function(request, reply){
    Note.create(request.auth.credentials, request.payload, function(err, note){
      reply({note:note}).code(err ? 400 : 200);
    });
  }
};

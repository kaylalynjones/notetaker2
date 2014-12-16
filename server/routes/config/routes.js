
'use strict';

module.exports = [
  {method: 'get',     path: '/{param*}',               config: require('../definitions/static/angular')},
  {method: 'post',    path: '/register',               config: require('../definitions/users/register')},
  {method: 'post',    path: '/login',                  config: require('../definitions/users/login')},
  {method: 'delete',  path: '/logout',                 config: require('../definitions/users/logout')},
  {method: 'get',     path: '/status',                 config: require('../definitions/users/status')},
  {method: 'post',    path: '/notes',                  config: require('../definitions/notes/create')},
  {method: 'get',     path: '/notes',                  config: require('../definitions/notes/get_user_notes')},
  {method: 'get',     path: '/s3policy',               config: require('../definitions/notes/s3_policy')},
  {method: 'get',     path: '/notes/{noteId}',         config: require('../definitions/notes/show_note')},
  {method: 'delete',  path: '/notes/{noteId}',         config: require('../definitions/notes/delete_note')},
  {method: 'post',    path: '/notes/{noteId}/device/upload',     config: require('../definitions/notes/phone_upload')},
  {method: 'get',     path: '/notes/count',            config: require('../definitions/notes/count')}

];

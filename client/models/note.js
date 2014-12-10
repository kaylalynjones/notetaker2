/* jshint loopfunc:true, camelcase:false */
(function(){
  'use strict';

  angular.module('notetakr')
  .factory('Note', ['$http', function($http){

    function create(note){
      return $http.post('/notes', note);
    }

    function recent(){
      return $http.get('/notes?limit=10&offset=0');
    }

    function show(noteId){
      return $http.get('/notes/'+ noteId);
    }

    function relevantNotes(name){
      return $http.get('/notes?tag=' + name);
    }

    function remove(note){
      return $http.delete('/notes/' + note.note_id);
    }

    return {create:create, recent:recent, show:show, relevantNotes:relevantNotes, remove:remove};
  }]);
})();

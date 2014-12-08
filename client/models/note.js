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

    function show(id){
      return $http.get('/notes/show?note_id=' + id);
    }

    return {create:create, recent:recent, show:show};
  }]);
})();

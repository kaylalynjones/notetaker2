(function(){
  'use strict';

  angular.module('notetakr')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
    $scope.note = {};
    $scope.notes = [];

    function getRecent(){
      Note.recent().then(function(response){
        console.log('RECENT >>>>', response.data.notes);
        $scope.notes = response.data.notes;
      });
    }

    getRecent();

    $scope.create = function(note){
      Note.create(note).then(function(response){
        $scope.notes.push(response.data.notes.rows);
        $scope.note = {};
        getRecent();
      });
    };
  }]);
})();

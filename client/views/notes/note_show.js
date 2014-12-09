(function(){
  'use strict';

  angular.module('notetakr')
  .controller('NoteShowCtrl', ['$rootScope', '$scope', '$state', 'Note', '$stateParams', function($rootScope, $scope, $state, Note, $stateParams){

    Note.show($state.params.noteId).then(function(response){
      $scope.note = response.data.note;
    });


  }]);
})();

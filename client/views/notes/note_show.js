(function(){
  'use strict';

  angular.module('notetakr')
  .controller('NoteShowCtrl', ['$rootScope', '$scope', '$state', 'Note', '$stateParams', function($rootScope, $scope, $state, Note, $stateParams){
    var id = $stateParams.id;
    debugger;
    $scope.note = {};

    function showNote(){
      Note.show(id).then(function(note){
        console.log('NOTE>>>>>>>', note);
        $scope.note = note;
      });
    }
    showNote();


  }]);
})();

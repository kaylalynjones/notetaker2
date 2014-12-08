(function(){
  'use strict';

  angular.module('notetakr')
  .controller('NoteShowCtrl', ['$rootScope', '$scope', '$state', 'Note', '$stateParams', function($rootScope, $scope, $state, Note, $stateParams){
    var id = $stateParams.id;
    $scope.note = [];

    function showNote(){
      Note.show(id).then(function(response){
        $scope.note = response.data.note;
      });
    }
    showNote();


  }]);
})();

  (function(){
  'use strict';

  angular.module('notetakr')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', '$location', '$upload', '$http', function($rootScope, $scope, $state, Note, $location, $upload, $http){
    $scope.note = {};
    $scope.notes = [];
    $scope.imageUploads = [];
    $scope.uploadProgress = 0;

    $scope.removeNote = function(note){
      Note.remove(note).then(function(response){
        console.log('frontend res>', response);
        $state.reload();
      });
    };

    $rootScope.$on('$locationChangeSuccess', function(event){
      getRecentOrByTag();
    });

    function filterByTag(){
      var params = $location.search();
      Note.relevantNotes(params.tag).success(function(response){
        $scope.notes = response.notes;
      });
    }

    function getRecent(){
      Note.recent().then(function(response){
        $scope.notes = response.data.notes;
      });
    }

    function getRecentOrByTag(){
      if ($location.search().tag){
        filterByTag();
      } else {
        getRecent();
      }
    }

    getRecentOrByTag();

    $scope.create = function(note){
      note.photos = $scope.imageUploads.join(',');
      Note.create(note).then(function(response){
        $scope.notes.push(response.config.data);
        $scope.note = {};
        getRecent();
      });
    };

    function progress(evt){
      $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
    }

    function error(err){
      //console.log(err);
    }

    $scope.onFileSelect = function($files){
      $scope.imageUploads = [];
      $http.get('/s3policy').success(function(response){
        for (var i = 0; i < $files.length; i++) {
          $scope.uploadProgress = 0;
          var file = $files[i],
              filename = window.uuid(16) + '.' + file.name.split('.').pop();
          $scope.imageUploads.push(filename);
          $upload.upload({
            url: 'https://s3.amazonaws.com/kjones-notetakr', //S3 upload url including bucket name,
            method: 'POST',
            data : {
              key: filename, // the key to store the file on S3, could be file name or customized
              AWSAccessKeyId: response.accessKey,
              acl: 'public-read', // sets the access to the uploaded file in the bucker: private or public
              policy: response.policy, // base64-encoded json policy (see article below)
              signature: response.signature, // base64-encoded signature based on policy string (see article below)
              'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty),
              filename: file.name // this is needed for Flash polyfill IE8-9
            },
            file: file
          }).progress(progress).error(error);
        }
      });
    };

  }]);
})();

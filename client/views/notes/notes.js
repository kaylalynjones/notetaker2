  (function(){
  'use strict';

  angular.module('notetakr')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', '$location', '$upload', '$http', function($rootScope, $scope, $state, Note, $location, $upload, $http){
    $scope.note = {};
    $scope.notes = [];
    $scope.imageUploads = [];
    $scope.uploadProgress = 0;

    function progress(evt){
      $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
    }

    function success(data, status, headers, config){
      // file is uploaded successfully
    }

    function error(err){
      //console.log(err);
    }

    function getRecent(){
      Note.recent().then(function(response){
        $scope.notes = response.data.notes;
      });
    }

    getRecent();

    $scope.create = function(note){
      note.photos = $scope.imageUploads.join(',');
      Note.create(note).then(function(response){
        $scope.notes.push(response.config.data);
        $scope.note = {};
        getRecent();
      });
    };

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
          }).progress(progress).success(success).error(error);
        }
      });
    };

  }]);
})();

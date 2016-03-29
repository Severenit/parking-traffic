(function () {
  'use strict';

  angular.module('fileupload.service', [])
    .factory('fileUpload', fileUpload);

  function fileUpload($q) {
    return {
      upload: upload
    };

    function upload(event) {
      //=================================
      console.group('Upload File Start');
      //=================================
      var deferred = $q.defer();
      var input = event.target.files[0];
      var reader = new FileReader();
      reader.readAsText(input);
      reader.onload = function(){
        deferred.resolve(reader.result.substring(0, 1000));
      };
      //=================================
      console.groupEnd();
      //=================================
      return deferred.promise;
    }
  }
})();
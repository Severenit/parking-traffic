(function () {
  'use strict';

  angular.module('fileUpload.component',['fileupload.service', 'dateNow.service', 'timeParse.service'])
    .component('fileUpload', {
      template: '<input type=file accept=text/plain>',
      controller: fileUploadController
    });

  function fileUploadController($element, fileUpload, dateNow, timeParse) {
    console.group('File Upload Component');
    $element.on('change', function (event) {
      fileUpload.upload(event).then(function (data) {
        console.log(data);
        var _timeArr = [];

        data.split('\n').map(function (item) {

          var _item = item.split(', ');

          var _timesStart = _item[0].split(':');
          var _timesEnd = _item[1].split(':');

          var _startDate = new Date(dateNow.year(), dateNow.month(), dateNow.day(), _timesStart[0], _timesStart[1]),
              _endDate = new Date(dateNow.year(), dateNow.month(), dateNow.day(), _timesEnd[0], _timesEnd[1]);

          _timeArr.push({
            'start' : _startDate,
            'end': _endDate
          });
        });
        timeParse.parse(_timeArr);
      })
    });
    console.groupEnd();
  }
})();
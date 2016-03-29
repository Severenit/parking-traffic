(function () {
  'use strict';

  angular.module('timeParse.service', [])
    .factory('timeParse', timeParse);

  function timeParse($rootScope) {

    return {
      parse: parse
    };
    
    function parse(arr) {

      var result = [];

      var sortbleArray = arr.reduce(function(previousValue, currentValue) {
        return previousValue.concat([currentValue.start,currentValue.end])
      },[]).sort();

      var beginDate = sortbleArray[0];
      var endDate = sortbleArray[sortbleArray.length-1];

      for (var i = beginDate; i <= endDate; i.addMinutes(1)) {
        var count = 0;
        arr.map(function (item) {
          if ( i.betweenTime(item.start, item.end) ) {
            count++;
          }
        });
        result.push({ 'date' : i.toString(), 'count': count});
      }

      var resultArr =  _.map(result, 'count');

      $rootScope.$broadcast('watchArray', [resultArr, new Date(result[0].date), result]);

      
    }


  }
})();
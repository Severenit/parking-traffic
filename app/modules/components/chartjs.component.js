(function () {
  'use strict';

  angular.module('charjs.component',[])
    .component('chartJs', {
      template: '<div id="container">Placeholder for chart</div>',
      controller: charJsController
    });

  function charJsController($scope) {
    console.group('ChartJs Component');
    var vm = this;
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    vm.chartJs = [];

    $scope.$on('watchArray', function(event, data) {
      vm.chartJs = data[0];

      var home = _(data[2]).sortBy(['count', 'date']).reverse().value();

      var homeMax = _.filter(home, {count:home[0].count});

      var countResult = [],
          prevState,
          pushObj;

      if (homeMax.length > 1) {
        _.each(_.reverse(homeMax), function (val, key) {
          if (!pushObj) {
            pushObj = {
              start:val.date
            };
          }
          if (prevState) {
            var oldDate = new Date(prevState.date);
            oldDate = oldDate.setMinutes(oldDate.getMinutes()+1);
            if (oldDate != +new Date(val.date)) {
              pushObj.end = prevState.date;
              countResult.push(pushObj);
              pushObj = {
                start: val.date
              }
            }
            if (homeMax.length == key+1) {
              console.log(countResult);
              console.log(val.date);
              pushObj.end = val.date;
              countResult.push(pushObj);
            }
          }
          prevState = val;
        });
      } else {
        countResult = [
          {
            start: homeMax[0].date,
            end: homeMax[0].date
          }
        ]
      }

      var text = monthNames[data[1].getMonth()] +' '+data[1].getDate()+' '+data[1].getFullYear();

      _.each(countResult, function (val, key) {
        if (countResult.length > 1) {
          if (countResult.length != key+1) {
            text += ', from ' + new Date(val.start).getHours() + ':' + new Date(val.start).getMinutes() + ' to ' + new Date(val.end).getHours() + ':' + new Date(val.end).getMinutes();
          } else {
            text += ' and from '+ new Date(val.start).getHours()+':'+new Date(val.start).getMinutes() +' to '+ new Date(val.end).getHours()+':'+new Date(val.end).getMinutes();
          }
        } else {
          console.log('yes');
          text += ', from ' + new Date(val.start).getHours() + ':' + new Date(val.start).getMinutes() + ' to ' + new Date(val.end).getHours() + ':' + new Date(val.end).getMinutes();
        }
      });

      text += ' was the most cars, '+_.filter(home, {count:home[0].count})[0].count;

      Highcharts.chart('container', {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'How many cars have been'
        },
        subtitle: {
          text: text
        },
        xAxis: {
          type: 'datetime',
          labels: {
            overflow: 'justify'
          }
        },
        yAxis: {
          title: {
            text: 'Counts cars'
          },
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null
        },
        plotOptions: {
          spline: {
            lineWidth: 4,
            states: {
              hover: {
                lineWidth: 5
              }
            },
            marker: {
              enabled: false
            },
            pointInterval: 60000, // one hour
            pointStart: Date.UTC(data[1].getUTCFullYear(), data[1].getUTCMonth(), data[1].getUTCDate(), data[1].getHours(), data[1].getUTCMinutes(), data[1].getUTCSeconds())
          },
        },
        series: [{
          name: 'Сars',
          data: vm.chartJs
        }] 
      });
    });

    console.groupEnd();
  }
})();
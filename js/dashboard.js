      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Published',     11],
          ['Unpublished',      2],
        ]);

        var options = {
          animation: {
            duration: 2000
          }
        };

        var chart = new google.visualization.PieChart(document.getElementById('nodes-chart'));

        chart.draw(data, options);
      }

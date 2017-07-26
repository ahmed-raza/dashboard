google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Nodes status'],
    ['Events',   1],
    ['Basic Page', 1],
    ['Article', 1],
  ]);

  var options = {
    title: 'Nodes status',
    titleTextStyle: {
      color: 'limegreen'
    },
    tooltip: {
      textStyle: {
        color: 'limegreen'
      }
    },
    legend: {
      textStyle: {
        color: 'limegreen'
      }
    },
    is3D: true,
    backgroundColor: {
      fill: '#333'
    },
  };

  var chart = new google.visualization.PieChart(document.getElementById('nodes-chart'));

  setInterval(function(){
    jQuery.getJSON('/admin/dashboard/data', function(result){
      data.setValue(0, 1, result.nodes.events);
      chart.draw(data, options);
    });
  }, 5000);

  setInterval(function(){
    jQuery.getJSON('/admin/dashboard/data', function(result){
      data.setValue(1, 1, result.nodes.pages);
      chart.draw(data, options);
    });
  }, 5000);

  setInterval(function(){
    jQuery.getJSON('/admin/dashboard/data', function(result){
      data.setValue(2, 1, result.nodes.articles);
      chart.draw(data, options);
    });
  }, 5000);
  chart.draw(data, options);
}

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawGaugeChart);

function drawGaugeChart() {

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['', 1],
  ]);

  var options = {
    min: 0,
    max: 10,
    width: 400, height: 300,
    redFrom: 9, redTo: 10,
    yellowFrom:7.5, yellowTo: 9,
    minorTicks: 5,
    animation: {
      duration: 2000,
    },
    majorTicks: ['0','2','4','6','8','10'],
  };

  var chart = new google.visualization.Gauge(document.getElementById('guage'));

  chart.draw(data, options);

  setInterval(function() {
    jQuery.getJSON('/admin/dashboard/data', function(result){
      data.setValue(0, 1, result.users.online);
      chart.draw(data, options);
      if (result.users.online > 7) {
        jQuery('strong').addClass('red');
      }
    });
  }, 3000);
}

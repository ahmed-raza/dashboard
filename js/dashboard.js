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

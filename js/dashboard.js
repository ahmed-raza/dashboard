google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Published',   3],
    ['Unpublished', 0],
  ]);

  var options = {
    title: 'Nodes status',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('nodes-chart'));

  setInterval(function(){
    jQuery.getJSON('/admin/dashboard/data', function(result){
      data.setValue(0, 1, result.nodes.published);
      chart.draw(data, options);
    });
  }, 5000);

  setInterval(function(){
    jQuery.getJSON('/admin/dashboard/data', function(result){
      data.setValue(1, 1, result.nodes.unpublished);
      chart.draw(data, options);
    });
  }, 5000);
  chart.draw(data, options);
}

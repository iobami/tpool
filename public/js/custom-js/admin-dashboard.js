window.onload = function () {
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Users Graphical Information',
    },
    axisY: {
      title: 'No. of Employers',
      titleFontColor: '#4F81BC',
      lineColor: '#4F81BC',
      labelFontColor: '#4F81BC',
      tickColor: '#4F81BC',
    },
    axisY2: {
      title: 'Number of Employees',
      titleFontColor: '#C0504E',
      lineColor: '#C0504E',
      labelFontColor: '#C0504E',
      tickColor: '#C0504E',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries,
	},
    data: [{
      type: 'column',
      name: 'Employees',
      legendText: 'No. of Employees',
      showInLegend: true,
      dataPoints: [
        { label: 'January', y: 500.21 },
        { label: 'Feburary', y: 302.25 },
        { label: 'March', y: 157.20 },
        { label: 'April', y: 148.77 },
        { label: 'May', y: 101.50 },
        { label: 'June', y: 97.8 },
        { label: 'July', y: 101.50 },
        { label: 'August', y: 97.8 },
        { label: 'September', y: 101.50 },
        { label: 'October', y: 97.8 },
        { label: 'November', y: 101.50 },
        { label: 'December', y: 97.8 },
      ],
    },
    {
      type: 'column',
      name: 'Employers',
      legendText: 'No. of Employers',
      axisYType: 'secondary',
      showInLegend: true,
      dataPoints: [
        { label: 'January', y: 10.46 },
        { label: 'Feburary', y: 2.27 },
        { label: 'March', y: 3.99 },
        { label: 'April', y: 4.45 },
        { label: 'May', y: 2.92 },
        { label: 'June', y: 3.1 },
        { label: 'July', y: 2.92 },
        { label: 'August', y: 3.1 },
        { label: 'September', y: 2.92 },
        { label: 'October', y: 3.1 },
        { label: 'November', y: 2.92 },
        { label: 'December', y: 3.1 },
      ],
    }],
  });
  chart.render();

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
};

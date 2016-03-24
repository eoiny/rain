function createViz() {
  d3.csv("data/test.csv", function (error, data) {
    dataViz(data)
  });
}

  function dataViz(data) {
    console.log(data)
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var x = d3.scale.ordinal()
      .domain(["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"])
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "%");

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    y.domain([0, d3.max(data, function (d) {
      return d.rain;
    })]);
  }

function createViz() {
  d3.csv("data/test.csv",type, function (error, data) {
    if (error) throw error;
    dataViz(data)
  });
}

  function dataViz(data) {
    console.log(data)

    var tooltip = d3.select("#tooltip")
      .style("opacity", 0);

   /* var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
*/


    var margin = {top: 20, right: 10, bottom: 30, left: 10},
      width = 960 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

    //var x = d3.scale.ordinal()
    //  .rangeRoundBands([0, width], .05);

    var x = d3.time.scale().range([0, width]);



    /*var x1 = d3.time.scale()
      .domain([x(new Date(1986, 0, 1)), x(new Date(1986, 11, 31))])
      .range([0, width]);*/

    var y = d3.scale.linear()
      .range([0,height]);

   var xAxis = d3.svg.axis()
      .scale(x)
      .orient("top")
      .tickSize(height)
      .ticks(20)
      .tickFormat("");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "mm");

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //x.domain(data.map(function(d) { return d.date; }));
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.rain; })]);

    // function for the x grid lines
    function make_x_axis() {
      return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(d3.time.months)
    }


    // Draw the x Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .style("opacity",0)
      .transition()
      .duration(2000)
      .style("opacity",1)
      .call(make_x_axis()
        //.ticks(52)
        .tickSize(-height, 0,0)
        .tickFormat("")
    );


    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")");
      //.call(xAxis);



    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("y", 0)
      //.attr("width", x.rangeBand())
      .attr("width", width/data.length)
      .attr("height", 0)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .transition()
      .duration(900)
      .ease("quad")
      .attr("height", function(d) { return y(d.rain); });


    function mouseover(d) {
      tooltip.transition()
        .duration(50)
        .style("opacity", .9);

      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(d.date+"<br>"+d.rain+"mm")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }

    function mouseout(){
      tooltip.transition()
        .duration(500)
        .style("opacity", 1e-6);
    }


  }


function type(d) {
  var format = d3.time.format("%d-%b-%Y");
  d.rain = +d.rain;
  d.date = format.parse(d.date);
  return d;
}



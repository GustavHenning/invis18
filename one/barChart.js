var barChart = function (selector, data, w, h, r){
  //Width and height
  var barPadding = 1;

  var dataset = data;
  d3.select(selector).selectAll("svg").remove();

  //Create SVG element
  var svg = d3.select(selector)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
        return i * (w / dataset.length);
     })
     .attr("y", function(d) {
        return h - (d * 4);
     })
     .attr("width", w / dataset.length - barPadding)
     .attr("height", function(d) {
        return d * 4;
     })
     .attr("fill", function(d) {
      return "rgb(" + r + ", 0, " + (d * 10) + ")";
     });

  svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(function(d) {
        return d;
     })
     .attr("x", function(d, i) {
        return i * (w / dataset.length) + 5;
     })
     .attr("y", function(d) {
        return h - (d * 4) + 15;
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("fill", "white");
}

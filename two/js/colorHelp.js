"use strict"

var HIGH = "#ff00ff"
var LOW = "#003300"
var LENGTH = 20

var hund_colors = getColorSet(LOW, HIGH, LENGTH);

/* e.g. "#007AFF", "#007A00", 10 */
function getColorSet(from, to, length){
  var colors = d3.scale.linear().domain([1,length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb(from), d3.rgb(to)]);


    return colors
}

function setColorLegend() {
  var colDiv = document.getElementById("colors")
  if(colDiv.childNodes.length > 0){
    return
  }
  for(var i=0;i<LENGTH+30; i++){
    var col = document.createElement("div");
    col.style = "width:20px;height:20px; display:inline-block;"
    col.style.backgroundColor = hund_colors(i)
    colDiv.appendChild(col)
  }
  console.log(colDiv)
}

"use strict"
/* e.g. "#007AFF", "#007A00", 10 */
function getColorSet(from, to, length){
  return d3.scale.linear().domain([1,length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb(from), d3.rgb(to)]);
}

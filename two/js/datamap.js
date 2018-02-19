"use strict";

function mapInit(){
  var datamap = new Datamap({
    element: document.getElementById("map"),
    projection: 'mercator',
    fills: {
      defaultFill: "#d3d3d3", /* NO DATA */
      authorHasTraveledTo: "#fa0fa0"
    },
  });
}

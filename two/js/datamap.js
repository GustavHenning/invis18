"use strict";
var datamap = undefined;
var focusCountry = undefined;

/*{
  USA: "#fafafa"
} */
function setCountryColor(countryToColor){
  datamap.updateChoropleth(countryToColor);
}

function sumOf(arr){
  var sum = 0;
  for(var i in arr){
    sum += arr[i]
  }
  return sum
}

function deepSum(series) {
  var yay = 0, nay = 0;
  for(var i in series){
    if(!series[i]["label"].includes("not asked")){
      if(series[i]["label"].includes("no")){
        nay += sumOf(series[i]["values"])
      } else {
        yay += sumOf(series[i]["values"])
      }
    }
  }
  return yay / (yay+nay)
}

function infer(countries){
  var mult = {}

  for (var i = 0, j = countries.length; i < j; i++) {
    if(wvsAbout(countries[i].properties.name)){
      mult[countries[i].properties.name] = deepSum(wvsAbout(countries[i].properties.name).series)
    }
  }
  return mult
}

function updateMapColors(){
  setColorLegend()
  var isoToColor = {}
  var countries = Datamap.prototype.worldTopo.objects.world.geometries;
  var infers = infer(countries)
  for (var i = 0, j = countries.length; i < j; i++) {
    var iso = countries[i].properties.iso
    var avg = avgEmployment(countries[i].properties.name)
    var mult = infers[countries[i].properties.name] ? infers[countries[i].properties.name] : 0.1
    isoToColor[iso] = avg === NaN ? "no_data" : hund_colors(Math.floor(avg * mult))
  }
  setCountryColor(isoToColor)
}

function onClickCountry(country){
  focusCountry = country;
  updateDonuts("#wvsBox","wvsBox", wvsAbout(country));
  updateBarChart("#gapBox", gapAbout(country), "Employment Rate (%)");
}

function mapInit(){
  datamap = new Datamap({
    element: document.getElementById("map"),
    projection: 'mercator',
    fills: {
      defaultFill: "#d3d3d3", /* NO DATA */
      no_data: "#d3d3d3", /* NO DATA */
      hasData: "#fa0fa0"
    },
    done: function(datamap) {

      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
        /*document.getElementById('infoBox').innerHTML = */
        onClickCountry(geography.properties.name)
      });
    }
  });
}

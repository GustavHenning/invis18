"use strict";

var year = 1981

function initSlider(){
  var slider = document.getElementById("myRange");
  var output = document.getElementById("sliderValue");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
      output.innerHTML = this.value;
      year = this.value;
      updateMapColors();
      if(focusCountry){
        onClickCountry(focusCountry)
      }
  }

}

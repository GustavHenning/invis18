"use strict"

/* year => Country name = Questions => Answer : frequency */
var yearWVS = {}
/* year => title => country => percentage */
var yearGap = {}

var gapData = [f_teens, m_teens, t_teens, f_above, m_above, t_above]

function dataInit() {
  for(var i = 1981; i <= 1984; i++){
    yearWVS[i] = wvs_one
  }
  for(var i = 1989; i <= 1993; i++){
    yearWVS[i] = wvs_two
  }
  for(var i = 1994; i <= 1999; i++){
    yearWVS[i] = wvs_three
  }
  for(var i = 1999; i <= 2004; i++){
    yearWVS[i] = wvs_four
  }
  for(var i = 2005; i <= 2007; i++){
    yearWVS[i] = wvs_five
  }
  for(var i = 2010; i <= 2013; i++){
    yearWVS[i] = wvs_six
  }

  for(var y = 0; y < gapData[0].length; y++){
    var ye = gapData[0][y]["Year"]
    yearGap[ye] = {}
    yearGap[ye]["Female 15-24"] = gapData[0][y]
    yearGap[ye]["Male 15-24"] = gapData[1][y]
    yearGap[ye]["Total 15-24"] = gapData[2][y]
    yearGap[ye]["Female above 15"] = gapData[3][y]
    yearGap[ye]["Male above 15"] = gapData[3][y]
    yearGap[ye]["Total above 15"] = gapData[3][y]
  }
  for(var y in yearGap){
    for(var m in yearGap[y]){
      delete yearGap[y][m]["Year"]
    }
  }
}

function countrySplice(country){
  var comma = country.indexOf(',')
  if(comma > -1){
    return country.substring(0, comma)
  } else if (country.indexOf('Russia') > -1){
    return "Russia"
  }
  return country
}

function avg(arr){
  var sum = 0
  for(var i in arr){
    sum += arr[i]
  }
  return sum / arr.length
}

function avgEmployment(country) {
  country = countrySplice(country)
  var result = []
  for(var title in yearGap[year]){
    result.push(yearGap[year][title][country])
  }
  return avg(result)
}

function gapAbout(country){
  country = countrySplice(country)
  /* TODO select all cateroies in between*/
  var result = []
  for(var title in yearGap[year]){
    result.push({"name": title, "value": Math.floor(yearGap[year][title][country]) })
    //result[title] = yearGap[year][title][country]
  }
  return result
}

function normalize(arr){
  var sum = 0
  for(var i in arr){
    sum += arr[i]
  }
  for(var i in arr){
    arr[i] = Math.floor((arr[i] / sum) * 100)
  }
  return arr
}

function wvsAbout(country){
  if(!yearWVS[year] || !yearWVS[year][country])
    return

  var result = {}
  var finalLabels = []
  var possibleAnswers = []

  var titles = yearWVS[year][country]

  for(var title in titles){
    var cleanTitle = title.indexOf(":") > -1 ? title.substring(title.indexOf(":")+1, title.length) : title
    finalLabels.push(cleanTitle)
    for(var answer in titles[title]){
      if(!possibleAnswers.includes(answer)){
        possibleAnswers.push(answer)
      }
    }
  }
  var finalSeries = []
  for(var answer in possibleAnswers){
    var label = possibleAnswers[answer]
    var record = []
    for(var title in titles){
      record.push(titles[title][label] ? titles[title][label] : 0)
    }
    finalSeries.push({"label": label, "values" : normalize(record)})
  }



  result.labels = finalLabels
  result.series = finalSeries
  return result
}

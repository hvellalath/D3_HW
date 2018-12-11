//You need to create a scatter plot between two of the data -noHealthInsurance vs. Poverty 

var margin = {
  top: 30,
  right: 20,
  bottom: 60,
  left: 50
};
var svgWidth = 1000;
var svgHeight = 850;

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var grpCht = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv('assets/data/data.csv').then(function (scData) {
  console.log(scData);

 
  // Import Data
  scData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log("healthcare:", data.healthcare);
    console.log("poverty:", data.poverty)
  });

  // xAxisScale function above csv import
  var xAxisScale = d3.scaleLinear()
    .domain([d3.min(scData, d => d.poverty) * 0.9, d3.max(scData, d => d.poverty) * 1.2])
    .range([0, width]);
  console.log(xAxisScale);

  // Create y scale function
  var yAxisScale = d3.scaleLinear()
    .domain([d3.min(scData, d => d.healthcare) * 0.9, d3.max(scData, d => d.healthcare) * 1.2])
    .range([height, 0]);
  console.log(yAxisScale);
  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xAxisScale);
  var leftAxis = d3.axisLeft(yAxisScale);

  // // append x axis
  grpCht.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  grpCht.append("g")
    .attr("stroke", "pink")
    .call(leftAxis);

  // append initial circles
  var toolTip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

  // append initial circles
  var circlesGroup = grpCht.selectAll("circle")
    .data(scData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xAxisScale(d.poverty))
    .attr("cy", d => yAxisScale(d.healthcare))
    .attr("r", 9)
    .attr("fill", "lightblue")

  //append circles to data points
  grpCht.selectAll("xxx")
    .data(scData)
    .enter()
    .append("text")
    .attr("x", (d) => xAxisScale(d.poverty))
    .attr("y", d => yAxisScale(d.healthcare))
    .attr("text-anchor", "middle")
    .attr("text-color", "blue")
    .attr("font-size", 8)
    .text(d => d.abbr)

  
  //append chart axes


  grpCht.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 0)
    .attr("x", 0 - (height / 2) - 30)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text(" Lacks HealthInsurance(%)");
 

  grpCht.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 5})`)
    .attr("class", "axisText")
    .text("Poverty(%)");
 
});
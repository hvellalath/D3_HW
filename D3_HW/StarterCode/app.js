// @TODO: YOUR CODE HERE!

d3.csv('./data.csv').then(function (data) {

    svg = d3.select('#scatter').append('svg')
    svg
        .attr('width', 500)
        .attr('height', 500)
        .class
    console.log(data)
    
});

// You need to create a scatter plot 
// between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.

var margin = {
    top:20,
    right:40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
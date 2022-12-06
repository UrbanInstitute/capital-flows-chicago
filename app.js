// Browser detection to add css class

/***************************** BEGIN CHICAGO GRAPHIC 1 *****************************/
		function chicagoGraphic1() {    
			// Loading data
            var tooltipArea1 = d3.select("#urb-tooltip1");
			var catOverall1=true;
			var catSF1=false;
			var catMF1=false;
			var catSmallBiz1=false;
			var catNonRes1=false;
			var catMission1=false;
			var catPublic1=false;
			
			
			// Set the dimensions and margins of the graph
			var w1 = 600;
			var h1 = 400;
			var xPadding1 = 0;
			var yPadding1 = 20;			
			
			var margin1 = {top: 10, right: 0, bottom: 30, left: 10},
				width1 = w1 - margin1.left - margin1.right,
				height1 = h1 - margin1.top - margin1.bottom;
			

			// Create SVG element
			var svg1 = d3.select("#urb-graphic-container1")
				.append("svg")
				.attr("id","urb-chicago-graphic1")
			//	.attr("width", width1 + margin1.left + margin1.right)
			//	.attr("height", height1 + margin1.top + margin1.bottom)
				.attr("viewBox",(-xPadding1)+" "+(-yPadding1)+" "+w1+" "+h1)
				.attr("preserveAspectRatio","xMinYMin meet")
  				.append("g");
			//	.attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
			
			
//Read the data
d3.csv("data/chicago-graphic1-data.csv", function(data) {
	
data.forEach(function(d) {
  d.line = +d.line;
  d.valueOverall1 = +d.valueOverall1;
  d.valueSF1 = +d.valueSF1;
  d.valueMF1 = +d.valueMF1;
  d.valueSmallBiz1 = +d.valueSmallBiz1;
  d.valueNonRes1 = +d.valueNonRes1;
  d.valueMission1 = +d.valueMission1;
  d.valuePublic1 = +d.valuePublic1;
});

	
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0,d3.max(data, d=>d.line)])
      .range([ 60, width1 ]);
    svg1.append("g")
		.attr("class", "x1 axis1")
		.attr("transform", "translate(0," + height1 + ")")
		.attr("opacity","0")
		.call(d3.axisBottom(x));

    // Add Y axis
	var y = d3.scaleLinear()
   //   .domain( [0,d3.max(data, d=>d.valueOverall1)])
      .domain( [0,35000])
      .range([ height1, 0 ]);
	
    svg1.append("g")
	.attr("class", "y1 axis1")
//    .call(d3.axisLeft(y).tickSize(-width1).ticks(4).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
    .call(d3.axisLeft(y).tickSize(-width1).tickValues(y.ticks(6).concat(y.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));


    // Initialize dots with group a
    var dot1 = svg1
      .selectAll('circle')
     .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x(+d.line); })
        .attr("cy", function(d) { return y(+d.valueOverall1); })
        .attr("data-value", function(d) { return d.valueOverall1; })
        .attr("data-city", function(d) { return d.placeOverall1; })
        .attr("r", 4)
        .style("stroke-width", "1px")
        .style("stroke", "#1695d1")
        .style("fill", "#FFF");
	
	// Add text for Chicago
	var dot1chicago1 = svg1
		.append("g")
		.classed("urb-label-chicago1",true);
	var dot1chicago2 = svg1
		.append("g")
		.classed("urb-label-chicago2",true);
	var dot1chicagoLine = svg1
		.append("g")
		.classed("urb-label-chicago-line",true);
	dot1chicago1
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {
			if(d.placeOverall1=="Chicago, IL"){
				return d.placeOverall1;
			}
		})
		.attr("text-anchor", "middle")
		.attr("fill","#12719e")
		.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.valueOverall1)-60; });	
	dot1chicago2
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {
			if(d.placeOverall1=="Chicago, IL"){
				return "$"+d3.format(",.0f")(parseFloat(d.valueOverall1));
			}
		})
		.attr("text-anchor", "middle")
		.attr("fill","#12719e")
		.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.valueOverall1)-42; });
	dot1chicagoLine
		.selectAll("line")
		.data(data)
		.enter()
		.append("line")
		.attr("stroke", "#12719e")
		.attr("stroke-width", "1px")
		.attr("class", function(d) {
			if(d.placeOverall1=="Chicago, IL"){
				return "urb-line-chicago";
			}else{
				return "urb-line-nochicago";
			}
		})
		.attr("x1", function(d) { return x(+d.line); })
		.attr("x2", function(d) { return x(+d.line); })
        .attr("y1", function(d) { return y(+d.valueOverall1); })
        .attr("y2", function(d) { return y(+d.valueOverall1)-37; });

	
	hoverCircle1();


    // A function that update the chart
    function updateGraphic1(selectedGroup,selectedCity) {		
		// Create new data with the selection?
		var dataFilter = data.map(function(d){return {line: d.line, value:d[selectedGroup], place:d[selectedCity]} });
	//	y.domain( [0,d3.max(data, d => d[selectedGroup] )]);
		if (selectedGroup=="valueSF1"){
			y.domain( [0,40000]);
		}else if (selectedGroup=="valueMF1"){
			y.domain( [0,10000]);
		}else if (selectedGroup=="valueSmallBiz1"){
			y.domain( [0,10000]);
		}else if (selectedGroup=="valueNonRes1"){
			y.domain( [0,12000]);
		}else if (selectedGroup=="valueMission1"){
			y.domain( [0,1000]);
		}else if (selectedGroup=="valuePublic1"){
			y.domain( [0,1000]);
		}else{
			y.domain( [0,35000]);
		}
		
      // Give these new data to update circles
      dot1
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(+d.line) })
          .attr("cy", function(d) { return y(+d.value) })
		  .attr("data-value", function(d) { return d.value; })
		  .attr("data-city", function(d) { return d.place; })
	dot1chicago1
		.selectAll("text")
		.data(dataFilter)
		.transition()
        .duration(1000)
		.text(function(d) {
			if(d.place=="Chicago, IL"){
				return d.place;
			}
		})
		.attr("text-anchor",function() {
			if(catNonRes1||catMission1){
				return "left";
			}else{
				return "middle";
			}
		})
		.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.value)-60; });	
	dot1chicago2
		.selectAll("text")
		.data(dataFilter)
		.transition()
        .duration(1000)
		.text(function(d) {
			if(d.place=="Chicago, IL"){
				return "$"+d3.format(",.0f")(parseFloat(d.value));
			}
		})
		.attr("text-anchor",function() {
			if(catNonRes1||catMission1){
				return "left";
			}else{
				return "middle";
			}
		})
		.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.value)-42; });
	dot1chicagoLine
		.selectAll("line")
		.data(dataFilter)
		.transition()
        .duration(1000)
		.attr("class", function(d) {
			if(d.place=="Chicago, IL"){
				return "urb-line-chicago";
			}else{
				return "urb-line-nochicago";
			}
		})
		.attr("x1", function(d) { return x(+d.line); })
		.attr("x2", function(d) { return x(+d.line); })
        .attr("y1", function(d) { return y(+d.value); })
        .attr("y2", function(d) { return y(+d.value)-37; });
		
	svg1.select(".y1.axis1")
		.transition()
  		.duration(1000)
  //  	.call(d3.axisLeft(y).tickSize(-width1).ticks(4).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
    	.call(d3.axisLeft(y).tickSize(-width1).tickValues(y.ticks(6).concat(y.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
		
		hoverCircle1();
    };

	// CHANGE SET OF DATA WITH SELECT
    // When the button is changed, run the updateChart function
/*    d3.select("#urb-selectButton1").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption1 = d3.select(this).property("value");
        // run the updateChart function with this selected option
        updateGraphic1(selectedOption1);
    })*/
	
		d3.select("#urb-container1 .urb-button-01").on("click", function() {
			catOverall1=true;
			catSF1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;catPublic1=false;
			$("#urb-container1 h3").text("Chicago ranks 40th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Overall");
			$("#urb-container1 h2 span.urb-data1-cat").text("Overall");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-02").on("click", function() {
			catSF1=true;
			catOverall1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;catPublic1=false;
			$("#urb-container1 h3").text("Chicago ranks 46th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Single-Family");
			$("#urb-container1 h2 span.urb-data1-cat").text("Single-Family");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Owner-Occupied Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-03").on("click", function() {
			catMF1=true;
			catOverall1=false;catSF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;catPublic1=false;
			$("#urb-container1 h3").text("Chicago ranks 65th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Multifamily");
			$("#urb-container1 h2 span").text("Multifamily");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Renter-Occupied Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-04").on("click", function() {
			catSmallBiz1=true;
			catOverall1=false;catSF1=false;catMF1=false;catNonRes1=false;catMission1=false;catPublic1=false;
			$("#urb-container1 h3").text("Chicago ranks 45th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Small-Business");
			$("#urb-container1 h2 span.urb-data1-cat").text("Small-Business");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Small-Business Employee");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);			
		});
		d3.select("#urb-container1 .urb-button-05").on("click", function() {
			catNonRes1=true;
			catOverall1=false;catSF1=false;catMF1=false;catSmallBiz1=false;catMission1=false;catPublic1=false;
			$("#urb-container1 h3").text("Chicago ranks 9th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Nonresidential");
			$("#urb-container1 h2 span.urb-data1-cat").text("Nonresidential");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Employee");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-06").on("click", function() {
			catMission1=true;
			catOverall1=false;catSF1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catPublic1=false;
			$("#urb-container1 h3").text("Chicago ranks 18th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Mission");
			$("#urb-container1 h2 span.urb-data1-cat").text("Mission");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-07").on("click", function() {
			catPublic1=true;
			catOverall1=false;catSF1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;
			$("#urb-container1 h3").text("Chicago ranks 42th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$(this).parent().addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Public");
			$("#urb-container1 h2 span.urb-data1-cat").text("Public");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});

});
			

			function hoverCircle1(){
				$("#urb-chicago-graphic1 circle").each(function() {
                    $(this).on({
                        mouseenter:function(){
							var currentValue=$(this).attr("data-value");
                    		var cityName=$(this).attr("data-city");
							d3.select(this).transition().duration(100).style("stroke-width","2").attr("r","6");
							$("#urb-tooltip1 .urb-tooltip-city").text(cityName);
							$("#urb-tooltip1 .urb-tooltip-number").text("$"+d3.format(",.0f")(parseFloat(currentValue)));
							
                            if (catOverall1){
                            } else if (catSF1){
                            } else if (catMF1) {							
                            } else {							
                            }
    						//Show the tooltip
							if (cityName!=="Chicago, IL"){
								$("#urb-tooltip1").removeClass("hidden");
							}							
                        },mouseleave:function(){
    						//Hide the tooltip
							d3.select(this).transition().duration(100).style("stroke-width","1").attr("r","4");
							$("#urb-tooltip1").addClass("hidden");
                        }
                    }); 
                });
                var lateral1 = $("#urb-container1").width();
				d3.select("#urb-chicago-graphic1")
					.selectAll("circle")
				    .on("mousemove", function () {
						if (lateral1-d3.event.pageX<lateral1/4) {
        					return tooltipArea1
            					.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX - 150) + "px");
						} else if (lateral1-d3.event.pageX<lateral1/1.33333) {
        					return tooltipArea1
								.style("top", (d3.event.pageY + 24) + "px")
            					.style("left", (d3.event.pageX -75) + "px");
						} else {
        					return tooltipArea1
								.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX) + "px");
						}
    				});
            };
		};
/***************************** END CHICAGO GRAPHIC 1 *****************************/

/***************************** BEGIN CHICAGO GRAPHIC 3 *****************************/
		function chicagoGraphic3() {    
			// Loading data
            var tooltipArea3 = d3.select("#urb-tooltip3");
			var catOverall3=true;
			var catSF3=false;
			var catMF3=false;
			var catSmallBiz3=false;
			var catNonRes3=false;
			var catMission3=false;
			var catPublic3=false;
			
			
			// Set the dimensions and margins of the graph
			var w3 = 600;
			var h3 = 400;
			var xPadding3 = 0;
			var yPadding3 = 20;			
			
			var margin3 = {top: 10, right: 0, bottom: 30, left: 10},
				width3 = w3 - margin3.left - margin3.right,
				height3 = h3 - margin3.top - margin3.bottom;
			

			// Create SVG element
			var svg3 = d3.select("#urb-graphic-container3")
				.append("svg")
				.attr("id","urb-chicago-graphic3")
			//	.attr("width", width1 + margin1.left + margin1.right)
			//	.attr("height", height1 + margin1.top + margin1.bottom)
				.attr("viewBox",(xPadding3)+" "+(-yPadding3)+" "+w3+" "+h3)
				.attr("preserveAspectRatio","xMinYMin meet")
  				.append("g");
			//	.attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
			
			var g3 = svg3.append("g");
			
			var parseTime3 = d3.timeParse("%d-%b-%y");
			var formatYear3 = d3.timeFormat("%Y");
			
    // Add X axis --> it is a date format	
	var x3 = d3.scaleTime()
    	.rangeRound([0, width3]);

    // Add Y axis
	var y3 = d3.scaleLinear()
		.rangeRound([height3, 0]);
	
var area = d3.area()
    .x(function(d) { return x3(d.date); })
    .y1(function(d) { return y3(d.valueOverall3); })
	.y0(y3(0));		
		
			
	
			
//Read the data
	d3.csv("data/chicago-graphic3-data.csv", function(d) {
  d.date = parseTime3(d.date);
//  d.line = +d.line;
  d.valueOverall3 = +d.valueOverall3;
  d.valueSF3 = +d.valueSF3;
  d.valueMF3 = +d.valueMF3;
  d.valueSmallBiz3 = +d.valueSmallBiz3;
  d.valueNonRes3 = +d.valueNonRes3;
  d.valueMission3 = +d.valueMission3;
  d.valuePublic3 = +d.valuePublic3;
  return d;
}, function(error, data) {
  if (error) throw error;
	

		
	x3.domain(d3.extent(data, function(d) { return d.date; })).range([ 65, width3-6 ]);
//	y3.domain([0, d3.max(data, function(d) { return d.valueOverall3; })]);
	y3.domain( [0,30000]);

		
  g3.append("path")
      .datum(data)
      .attr("fill", "#DAEEF8")
      .attr("d", area);


	svg3.append("g")
		.attr("class", "x3 axis3")
		.attr("transform", "translate(0," + height3 + ")")
		.call(d3.axisBottom(x3));

	
    svg3.append("g")
	.attr("class", "y3 axis3")
    .call(d3.axisLeft(y3).tickSize(-width3+6).ticks(5).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
 //   .call(d3.axisLeft(y3).tickSize(-width3+6).tickValues(y3.ticks(5).concat(y3.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));


    // Initialize line with group a
    var line3 = svg3
      .append('g')
      .append("path")
      .datum(data)
      .attr("d", d3.line()
          .x(function(d) { return x3(+d.date) })
          .y(function(d) { return y3(+d.valueOverall3) })
      )
      .attr("stroke", "#1695D1")
	  .classed("urb-line3",true)
      .style("stroke-width", 5)
      .style("fill", "none");

    // Initialize dots with group a
    var dot3 = svg3
      .selectAll('circle')
     .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x3(+d.date); })
        .attr("cy", function(d) { return y3(+d.valueOverall3); })
        .attr("data-value", function(d) { return d.valueOverall3; })
        .attr("data-year", function(d) { return formatYear3(d.date); })
		.attr("r",function(d) {
			if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
				return 7;
			}else{
				return 5;
			}
		})
        .style("stroke-width", "2px")
        .style("stroke", "#1695d1")
        .style("fill", "#FCBE11");
		
		
	// Add text for first and last
	var dot3first1 = svg3
		.append("g")
		.classed("urb-label-first1",true);
	var dot3first2 = svg3
		.append("g")
		.classed("urb-label-first2",true);
	dot3first1
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {
			if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
				return formatYear3(d.date);
			}
		})
		.attr("text-anchor", function(d) {
			if(formatYear3(d.date)=="2010"){
				return "start";
			} else {
				return "end";
			}
		})
		.attr("fill","#000000")
		.attr("x", function(d) {
			if(formatYear3(d.date)=="2010"){
				return x3(+d.date)+5;
			}else{
				return x3(+d.date)-5;
			}
		})
        .attr("y", function(d) {
			if(formatYear3(d.date)=="2010"){
				return y3(+d.valueOverall3)-32;
			}else{
				return y3(+d.valueOverall3)+30;
			}
		});	
	dot3first2
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {
			if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
				return "$"+d3.format(",.0f")(parseFloat(d.valueOverall3));
			}
		})
		.attr("text-anchor", function(d) {
			if(formatYear3(d.date)=="2010"){
				return "start";
			} else {
				return "end";
			}
		})
		.attr("fill","#12719e")
		.attr("x", function(d) {
			if(formatYear3(d.date)=="2010"){
				return x3(+d.date)+5;
			}else{
				return x3(+d.date)-5;
			}
		})
        .attr("y", function(d) {
			if(formatYear3(d.date)=="2010"){
				return y3(+d.valueOverall3)-14;
			}else{
				return y3(+d.valueOverall3)+48;
			}
		});		
		

	
	hoverCircle3();


    // A function that update the chart
    function updateGraphic3(selectedGroup) {		
		// Create new data with the selection?
		var dataFilter = data.map(function(d){return {date: d.date, value:d[selectedGroup]} });
	//	y3.domain( [0,d3.max(data, d => d[selectedGroup] )]);
		if (selectedGroup=="valueSF3"){
			y3.domain( [0,20000]);
		}else if (selectedGroup=="valueMF3"){
			y3.domain( [0,7000]);
		}else if (selectedGroup=="valueSmallBiz3"){
			y3.domain( [0,7000]);
		}else if (selectedGroup=="valueNonRes3"){
			y3.domain( [0,14000]);
		}else if (selectedGroup=="valueMission3"){
			y3.domain( [0,700]);
		}else if (selectedGroup=="valuePublic3"){
			y3.domain( [0,600]);
		}else{
			y3.domain( [0,30000]);
		}

	
var areaNew = d3.area()
    .x(function(d) { return x3(d.date); })
    .y1(function(d) { return y3(d.value); })
	.y0(y3(0));		
		

    // Give these new data to update area, line and dots		

	  g3.selectAll("path")
		  .datum(dataFilter)
          .transition()
          .duration(1000)
		  .attr("d", areaNew);
	
		
      line3
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x3(+d.date) })
            .y(function(d) { return y3(+d.value) })
          );
      dot3
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x3(+d.date) })
          .attr("cy", function(d) { return y3(+d.value) })
		  .attr("data-value", function(d) { return d.value; })
		  .attr("data-year", function(d) { return formatYear3(d.date); })

	dot3first1
		.selectAll("text")
		.data(dataFilter)
		.transition()
        .duration(1000)
		.text(function(d) {
			if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
				return formatYear3(d.date);
			}
		})
		.attr("text-anchor", function(d) {
			if(formatYear3(d.date)=="2010"){
				return "start";
			} else {
				return "end";
			}
		})
		.attr("fill","#000000")
		.attr("x", function(d) {
			if(formatYear3(d.date)=="2010"){
				return x3(+d.date)+5;
			}else{
				if (catSF3){
					return x3(+d.date)-14;
				} else if (catSmallBiz3){
					return x3(+d.date)-21;
				} else {
					return x3(+d.date)-5;
				}
			}
		})
        .attr("y", function(d) {
			if(formatYear3(d.date)=="2010"){
				if (catOverall3||catSF3){
					return y3(+d.value)-32;
				} else {
					return y3(+d.value)+28;
				}
			}else{
				if (catSF3){
					return y3(+d.value)-15;
				} else if (catSmallBiz3){
					return y3(+d.value)+5;
				} else {
					return y3(+d.value)+30;
				}
			}
		});			
	dot3first2
		.selectAll("text")
		.data(dataFilter)
		.transition()
        .duration(1000)		
		.text(function(d) {
			if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
				return "$"+d3.format(",.0f")(parseFloat(d.value));
			}
		})
		.attr("text-anchor", function(d) {
			if(formatYear3(d.date)=="2010"){
				return "start";
			} else {
				return "end";
			}
		})
		.attr("fill","#12719e")
		.attr("x", function(d) {
			if(formatYear3(d.date)=="2010"){
				return x3(+d.date)+5;
			}else{
				if (catSF3){
					return x3(+d.date)-14;
				} else if (catSmallBiz3){
					return x3(+d.date)-21;
				} else {
					return x3(+d.date)-5;
				}
			}
		})
        .attr("y", function(d) {
			if(formatYear3(d.date)=="2010"){
				if (catOverall3||catSF3){
					return y3(+d.value)-14;
				} else {
					return y3(+d.value)+46;
				}
			}else{
				if (catSF3){
					return y3(+d.value)+3;
				} else if (catSmallBiz3){
					return y3(+d.value)+23;
				} else {
					return y3(+d.value)+48;
				}
			}
		});			
		
		
		
	svg3.select(".y3.axis3")
		.transition()
  		.duration(1000)
    	.call(d3.axisLeft(y3).tickSize(-width3+6).ticks(6).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
   // 	.call(d3.axisLeft(y3).tickSize(-width3+6).tickValues(y3.ticks(5).concat(y3.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
		
		hoverCircle3();
    };
	
	
		d3.selectAll("#urb-container3 .urb-button-01").on("click", function() {			
			catOverall3=true;
			catSF3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;catPublic3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Overall");
			$("#urb-container3 h2 span.urb-data3-cat").text("Overall");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-02").on("click", function() {
			catSF3=true;
			catOverall3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;catPublic3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Single-Family");
			$("#urb-container3 h2 span.urb-data3-cat").text("Single-Family");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Owner-Occupied Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-03").on("click", function() {
			catMF3=true;
			catOverall3=false;catSF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;catPublic3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Multifamily");
			$("#urb-container3 h2 span.urb-data3-cat").text("Multifamily");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Renter-Occupied Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-04").on("click", function() {
			catSmallBiz3=true;
			catOverall3=false;catSF3=false;catMF3=false;catNonRes3=false;catMission3=false;catPublic3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Small-Business");
			$("#urb-container3 h2 span.urb-data3-cat").text("Small-Business");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Small-Business Employee");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);		
		});
		d3.selectAll("#urb-container3 .urb-button-05").on("click", function() {
			catNonRes3=true;
			catOverall3=false;catSF3=false;catMF3=false;catSmallBiz3=false;catMission3=false;catPublic3=false;					
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Nonresidential");
			$("#urb-container3 h2 span.urb-data3-cat").text("Nonresidential");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Employee");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-06").on("click", function() {
			catMission3=true;
			catOverall3=false;catSF3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catPublic3=false;					
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Mission");
			$("#urb-container3 h2 span.urb-data3-cat").text("Mission");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-07").on("click", function() {
			catPublic3=true;
			catOverall3=false;catSF3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;					
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Public");
			$("#urb-container3 h2 span.urb-data3-cat").text("Public");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});

});
			

			
			function hoverCircle3(){
				$("#urb-chicago-graphic3 circle").each(function() {
                    $(this).on({
                        mouseenter:function(){
							var currentValue=$(this).attr("data-value");
                    		var currentYear=$(this).attr("data-year");
							d3.select(this).transition().duration(100).style("fill","#FFF");
							$("#urb-tooltip3 .urb-tooltip-year").text(currentYear);
							$("#urb-tooltip3 .urb-tooltip-number").text("$"+d3.format(",.0f")(parseFloat(currentValue)));
							
                            if (catOverall3){
                            } else if (catSF3){
                            } else if (catMF3) {							
                            } else {							
                            }
    						//Show the tooltip
							if (currentYear!=="2010"&&currentYear!=="2020"){
								$("#urb-tooltip3").removeClass("hidden");
							}							
                        },mouseleave:function(){
    						//Hide the tooltip
							d3.select(this).transition().duration(100).style("fill","#FCBE11");
							$("#urb-tooltip3").addClass("hidden");
                        }
                    }); 
                });
                var lateral3 = $("#urb-container3").width();
				d3.select("#urb-chicago-graphic3")
					.selectAll("circle")
				    .on("mousemove", function () {
						if (lateral3-d3.event.pageX<lateral3/4) {
        					return tooltipArea3
            					.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX - 90) + "px");
						} else if (lateral3-d3.event.pageX<lateral3/1.33333) {
        					return tooltipArea3
								.style("top", (d3.event.pageY + 24) + "px")
            					.style("left", (d3.event.pageX -45) + "px");
						} else {
        					return tooltipArea3
								.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX) + "px");
						}
    				});
            };			
		};
/***************************** END CHICAGO GRAPHIC 3 *****************************/

/***************************** BEGIN CHICAGO GRAPHIC 4 *****************************/
		function chicagoGraphic4() {
			var catOverall4=true;
			var catSF4=false;
			var catMF4=false;
			var catSmallBiz4=false;
			var catNonRes4=false;
			var catMission4=false;
			var catPublic4=false;
			
			
			// Set the dimensions and margins of the graph
			var w4 = 600;
			var h4 = 550;
			var xPadding4 = 60;
			var yPadding4 = 20;	


// set the dimensions and margins of the graph
var margin4 = {top: 0, right: 0, bottom: 40, left: 0},
    width4 = w4 - margin4.left - margin4.right,
    height4 = h4 - margin4.top - margin4.bottom;

// append the svg object to the body of the page
	var svg4 = d3.select("#urb-graphic-container4")
		.append("svg")
		.attr("id","urb-chicago-graphic4")
		.attr("viewBox",(-xPadding4)+" "+(-yPadding4)+" "+w4+" "+h4)
		.attr("preserveAspectRatio","xMinYMin meet")
	//	.attr("width", width4 + margin4.left + margin4.right)
	//	.attr("height", height4 + margin4.top + margin4.bottom)
		.append("g");
	//	.attr("transform","translate(" + margin4.left + "," + margin4.top + ")");

// Parse the Data
d3.csv("data/chicago-graphic4-data.csv", function(data) {
	
data.forEach(function(d) {
  d.valueOverall4 = +d.valueOverall4;
  d.valueSF4 = +d.valueSF4;
  d.valueMF4 = +d.valueMF4;
  d.valueSmallBiz4 = +d.valueSmallBiz4;
  d.valueNonRes4 = +d.valueNonRes4;
  d.valueMission4 = +d.valueMission4;
  d.valuePublic4 = +d.valuePublic4;
});
	
	// Divide CSV in chukns of 5 rows
	var dataDivide = [], i, chunk = 5; 
    for (i=0; i<data.length; i+=chunk) {
         dataDivide.push(data.slice(i, i+chunk));
    }
	
	// Add X axis
	var x4 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d.valueOverall4)])
    	.range([ 0, width4-130]);
	/* Uncomment to visualize x Axis */
	/*
	svg4.append("g")
		.attr("transform", "translate(0," + height4 + ")")
		.attr("class","x4 axis4")
		.call(d3.axisBottom(x4))
		.selectAll("text")
		.attr("transform", "translate(0,0)")
		.style("text-anchor", "middle");
	*/

	// Y axis
  var y4asian = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[0].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4asian")
		.call(d3.axisLeft(y4asian).tickFormat(function(d, i){
			if(i==0){
			   return "0–5%";
			}else if(i==1){
			   return "6–10%";
			}else if(i==2){
			   return "11–20%";
			}else if(i==3){
			   return "21+%";
			}else{
				return "";
			}
		}));
	
  var y4black = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[1].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4black")
		.attr("transform", "translate(0,118)")
		.call(d3.axisLeft(y4black).tickFormat(function(d, i){
			if(i==0){
			   return "0–20%";
			}else if(i==1){
			   return "21–40%";
			}else if(i==2){
			   return "41–60%";
			}else if(i==3){
			   return "61–80%";
			}else{
				return "81+%";
			}
		}));
	
  var y4latine = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[2].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4latine")
		.attr("transform", "translate(0,258)")
		.call(d3.axisLeft(y4latine).tickFormat(function(d, i){
			if(i==0){
			   return "0–20%";
			}else if(i==1){
			   return "21–40%";
			}else if(i==2){
			   return "41–60%";
			}else if(i==3){
			   return "61+%";
			}else{
				return "";
			}
		}));

  var y4white = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[3].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4white")
		.attr("transform", "translate(0,376)")
		.call(d3.axisLeft(y4white).tickFormat(function(d, i){
			if(i==0){
			   return "0–20%";
			}else if(i==1){
			   return "21–40%";
			}else if(i==2){
			   return "41–60%";
			}else if(i==3){
			   return "61–80%";
			}else{
				return "81+%";
			}
		}));

	
	// Bars
	// Bars g's
	var bars4asianTitle = svg4
		.append("g")
		.classed("urb-bars4-asian-title",true);	
	var bars4blackTitle = svg4
		.append("g")
		.classed("urb-bars4-black-title",true)
		.attr("transform", "translate(0,118)");
	var bars4latineTitle = svg4
		.append("g")
		.classed("urb-bars4-latine-title",true)
		.attr("transform", "translate(0,258)");
	var bars4whiteTitle = svg4
		.append("g")
		.classed("urb-bars4-white-title",true)
		.attr("transform", "translate(0,376)");
	var bars4asian = svg4
		.append("g")
		.classed("urb-bars4-asian",true);	
	var bars4black = svg4
		.append("g")
		.classed("urb-bars4-black",true)
		.attr("transform", "translate(0,118)");
	var bars4latine = svg4
		.append("g")
		.classed("urb-bars4-latine",true)
		.attr("transform", "translate(0,258)");
	var bars4white = svg4
		.append("g")
		.classed("urb-bars4-white",true)
		.attr("transform", "translate(0,376)");

	// Bar titles
	bars4asianTitle
		.append("text")
		.classed("urb-bars4-asian-title-blue",true)
		.text(function(d) {
			return "Asian";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4asianTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 44)
		.attr("y", -6);
	bars4blackTitle
		.append("text")
		.classed("urb-bars4-black-title-blue",true)
		.text(function(d) {
			return "Black";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4blackTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 44)
		.attr("y", -6);
	bars4latineTitle
		.append("text")
		.classed("urb-bars4-latine-title-blue",true)
		.text(function(d) {
			return "Latine";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4latineTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 48)
		.attr("y", -6);
	bars4whiteTitle
		.append("text")
		.classed("urb-bars4-white-title-blue",true)
		.text(function(d) {
			return "White";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4whiteTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 48)
		.attr("y", -6);
	
	// Bars
	bars4asian
		.selectAll("urb-bars4")
		.data(dataDivide[0])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4asian(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4asian.bandwidth() )
		.attr("fill", "#73b9e2");
	
	bars4black
		.selectAll("urb-bars4")
		.data(dataDivide[1])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4black(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4black.bandwidth() )
		.attr("fill", "#1695d1");

	bars4latine
		.selectAll("urb-bars4")
		.data(dataDivide[2])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4latine(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4latine.bandwidth() )
		.attr("fill", "#12719e");
	
	bars4white
		.selectAll("urb-bars4")
		.data(dataDivide[3])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4white(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4white.bandwidth() )
		.attr("fill", "#0a4c6a");

	// Bars labels
	bars4asian
		.selectAll("urb-bars4-labels")
		.data(dataDivide[0])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4asian(d.percentile) + (y4asian.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	bars4black
		.selectAll("urb-bars4-labels")
		.data(dataDivide[1])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4black(d.percentile) + (y4black.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	bars4latine
		.selectAll("urb-bars4-labels")
		.data(dataDivide[2])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4latine(d.percentile) + (y4latine.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	bars4white
		.selectAll("urb-bars4-labels")
		.data(dataDivide[3])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4white(d.percentile) + (y4white.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	

	
    // A function that update the chart
    function updateGraphic4(selectedGroup4) {		
		// Create new data with the selection?
		var dataFilter4 = data.map(function(d){return {percentile: d.percentile, value:d[selectedGroup4]} });
		x4.domain([0, d3.max(data, d=>d[selectedGroup4])]);
		var newx4 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d[selectedGroup4])])
    	.range([ 0, width4-130]);
		
		// Divide CSV in chunks of 5 rows
		var dataFilter4Divide = [], i, chunk = 5; 
    	for (i=0; i<dataFilter4.length; i+=chunk) {
			dataFilter4Divide.push(dataFilter4.slice(i, i+chunk));
    	}		
		
	//	x4.domain([0, d3.max(dataFilter4, d=>d[selectedGroup4])])
		
	// Give these new data to update bars
	bars4asian
	  	.selectAll("rect")
        .data(dataFilter4Divide[0])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
	bars4black
	  	.selectAll("rect")
        .data(dataFilter4Divide[1])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
	bars4latine
	  	.selectAll("rect")
        .data(dataFilter4Divide[2])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
	bars4white
	  	.selectAll("rect")
        .data(dataFilter4Divide[3])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
		
	// Give these new data to update labels
	bars4asian
		.selectAll("text")
		.data(dataFilter4Divide[0])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	bars4black
		.selectAll("text")
		.data(dataFilter4Divide[1])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	bars4latine
		.selectAll("text")
		.data(dataFilter4Divide[2])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	bars4white
		.selectAll("text")
		.data(dataFilter4Divide[3])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	
	/* Uncomment to visualize x Axis */
	/*
	svg4.select(".x4.axis4")
		.transition()
  		.duration(1000)
		.call(d3.axisBottom(x4));
	*/	
    };	
	
	
		d3.select("#urb-container4 .urb-button-01").on("click", function() {
			catOverall4=true;
			catSF4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;catPublic4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");			
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Overall");			
			$("#urb-container4 h2 span").text("Overall");
			$("#urb-container4 h3 span").text("per household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-02").on("click", function() {
			catSF4=true;
			catOverall4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;catPublic4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Single-Family");	
			$("#urb-container4 h2 span").text("Single-Family");
			$("#urb-container4 h3 span").text("per owner-occupied household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-03").on("click", function() {
			catMF4=true;
			catOverall4=false;catSF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;catPublic4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Multifamily");	
			$("#urb-container4 h2 span").text("Multifamily");
			$("#urb-container4 h3 span").text("per renter-occupied household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-04").on("click", function() {
			catSmallBiz4=true;
			catOverall4=false;catSF4=false;catMF4=false;catNonRes4=false;catMission4=false;catPublic4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Small-Business");
			$("#urb-container4 h2 span").text("Small-Business");
			$("#urb-container4 h3 span").text("per small-business employee");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);		
		});
		d3.select("#urb-container4 .urb-button-05").on("click", function() {
			catNonRes4=true;
			catOverall4=false;catSF4=false;catMF4=false;catSmallBiz4=false;catMission4=false;catPublic4=false;					
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Nonresidential");
			$("#urb-container4 h2 span").text("Nonresidential");
			$("#urb-container4 h3 span").text("per employee");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-06").on("click", function() {
			catMission4=true;
			catOverall4=false;catSF4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catPublic4=false;					
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Mission");
			$("#urb-container4 h2 span").text("Mission");
			$("#urb-container4 h3 span").text("per household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-07").on("click", function() {
			catPublic4=true;
			catOverall4=false;catSF4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;					
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Public");
			$("#urb-container4 h2 span").text("Public");
			$("#urb-container4 h3 span").text("per household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});

});
			
		};
/***************************** END CHICAGO GRAPHIC 4 *****************************/

/***************************** BEGIN CHICAGO GRAPHIC 5 *****************************/
		function chicagoGraphic5() {
			var catOverall5=true;
			var catSF5=false;
			var catMF5=false;
			var catSmallBiz5=false;
			var catNonRes5=false;
			var catMission5=false;
			var catPublic5=false;
			
			
			// Set the dimensions and margins of the graph
			var w5 = 600;
			var h5 = 240;
			var xPadding5 = 60;
			var yPadding5 = 5;	


// set the dimensions and margins of the graph
var margin5 = {top: 0, right: 0, bottom: 40, left: 0},
    width5 = w5 - margin5.left - margin5.right,
    height5 = h5 - margin5.top - margin5.bottom;

// append the svg object to the body of the page
	var svg5 = d3.select("#urb-graphic-container5")
		.append("svg")
		.attr("id","urb-chicago-graphic5")
		.attr("viewBox",(-xPadding5)+" "+(-yPadding5)+" "+w5+" "+h5)
		.attr("preserveAspectRatio","xMinYMin meet")
	//	.attr("width", width5 + margin5.left + margin5.right)
	//	.attr("height", height5 + margin5.top + margin5.bottom)
		.append("g");
	//	.attr("transform","translate(" + margin5.left + "," + margin5.top + ")");

// Parse the Data
d3.csv("data/chicago-graphic5-data.csv", function(data) {
	
data.forEach(function(d) {
  d.valueOverall5 = +d.valueOverall5;
  d.valueSF5 = +d.valueSF5;
  d.valueMF5 = +d.valueMF5;
  d.valueSmallBiz5 = +d.valueSmallBiz5;
  d.valueNonRes5 = +d.valueNonRes5;
  d.valueMission5 = +d.valueMission5;
  d.valuePublic5 = +d.valuePublic5;
});

	
	// Add X axis
	var x5 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d.valueOverall5)])
    	.range([ 0, width5-130]);
	/* Uncomment to visualize x Axis */
	/*
	svg5.append("g")
		.attr("transform", "translate(0," + height5 + ")")
		.attr("class","x5 axis5")
		.call(d3.axisBottom(x5))
		.selectAll("text")
		.attr("transform", "translate(0,0)")
		.style("text-anchor", "middle");
	*/

	// Y axis
  var y5 = d3.scaleBand()
  	.range([ 0, (height5)/1.08 ])
  	.domain(data.map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg5.append("g")
		.attr("class","y5 axis5")
		.call(d3.axisLeft(y5).tickFormat(function(d, i){
			if(i==0){
			   return "0–11%";
			}else if(i==1){
			   return "12–20%";
			}else if(i==2){
			   return "21–31%";
			}else{
				return "32+%";
			}
		}));


	// Bars
	// Bars g's
	var bars5 = svg5
		.append("g")
		.classed("urb-bars5",true);	
	
	// Bars
	bars5
		.selectAll("urb-bars5")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", x5(0) )
		.attr("y", function(d) { return y5(d.percentile); })
		.attr("width", function(d) { return x5(d.valueOverall5); })
		.attr("height", y5.bandwidth() )
		.attr("fill", function(d,i){
			if(i==0){
				return "#73b9e2";
			}else if(i==1){
				return "#1695d1";
			}else if(i==2){
				return "#12719e";
			}else {
				return "#0a4c6a";
			}
		});

	// Bars labels
	bars5
		.selectAll("urb-bars5-labels")
		.data(data)
		.enter()
		.append("text")
		.attr("class","urb-bars5-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x5(d.valueOverall5)+5; })
		.attr("y", function(d) { return y5(d.percentile) + (y5.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall5));
		})
		.attr("fill", "#000");
	

    // A function that update the chart
    function updateGraphic5(selectedGroup5) {		
		// Create new data with the selection?
		var dataFilter5 = data.map(function(d){return {percentile: d.percentile, value:d[selectedGroup5]} });
		x5.domain([0, d3.max(data, d=>d[selectedGroup5])]);
		var newx5 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d[selectedGroup5])])
    	.range([ 0, width5-130]);		
		
	//	x5.domain([0, d3.max(dataFilter5, d=>d[selectedGroup5])])
		
	// Give these new data to update bars
	bars5
	  	.selectAll("rect")
        .data(dataFilter5)
        .transition()
        .duration(750)
		.attr("width", function(d) { return x5(d.value); });
		
	// Give these new data to update labels
	bars5
		.selectAll("text")
		.data(dataFilter5)
        .transition()
        .duration(750)
		.attr("x", function(d) { return x5(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	
	/* Uncomment to visualize x Axis */
	/*
	svg5.select(".x5.axis5")
		.transition()
  		.duration(1000)
		.call(d3.axisBottom(x5));
	*/
    };	
	
	
		d3.select("#urb-container5 .urb-button-01").on("click", function() {
			catOverall5=true;
			catSF5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;catPublic5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Overall");
			$("#urb-container5 h2 span").text("Overall");
			$("#urb-container5 h3 span").text("per household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-02").on("click", function() {
			catSF5=true;
			catOverall5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;catPublic5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Single-Family");
			$("#urb-container5 h2 span").text("Single-Family");
			$("#urb-container5 h3 span").text("per owner-occupied household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-03").on("click", function() {
			catMF5=true;
			catOverall5=false;catSF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;catPublic5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Multifamily");
			$("#urb-container5 h2 span").text("Multifamily");
			$("#urb-container5 h3 span").text("per renter-occupied household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-04").on("click", function() {
			catSmallBiz5=true;
			catOverall5=false;catSF5=false;catMF5=false;catNonRes5=false;catMission5=false;catPublic5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Small-Business");
			$("#urb-container5 h2 span").text("Small-Business");
			$("#urb-container5 h3 span").text("per small-business employee");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);	
		});
		d3.select("#urb-container5 .urb-button-05").on("click", function() {
			catNonRes5=true;
			catOverall5=false;catSF5=false;catMF5=false;catSmallBiz5=false;catMission5=false;catPublic5=false;					
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Nonresidential");
			$("#urb-container5 h2 span").text("Nonresidential");
			$("#urb-container5 h3 span").text("per employee");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-06").on("click", function() {
			catMission5=true;
			catOverall5=false;catSF5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catPublic5=false;					
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Mission");
			$("#urb-container5 h2 span").text("Mission");
			$("#urb-container5 h3 span").text("per household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-07").on("click", function() {
			catPublic5=true;
			catOverall5=false;catSF5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;					
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Public");
			$("#urb-container5 h2 span").text("Public");
			$("#urb-container5 h3 span").text("per household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});

});
			
		};
/***************************** END CHICAGO GRAPHIC 5 *****************************/

/***************************** BEGIN CHICAGO GRAPHIC 6 *****************************/
		function chicagoGraphic6() {
			// Set the dimensions and margins of the graph
			var w = 600;
			var h = 620;
			var xPadding = 30;
			var yPadding = 60;			
			

			// Define map projection
			var projection = d3.geoAlbers()
				.center([0, 41.83])
				.rotate([87.65, 0])
				.parallels([40, 45])
				.scale(90000)
				.translate([w/1.7, h/2.2]);
			
			// Define path generator
			var path = d3.geoPath()
							.projection(projection);
			//Define quantize scale to sort data values into buckets of color
			var color = d3.scaleQuantize()
							.range(["rgb(207,232,243)","rgb(115,185,226)","rgb(22,149,209)","rgb(18,113,158)","rgb(10,76,106)"]);

			// Loading data
            var tooltipArea6 = d3.select("#urb-tooltip6");
			var globalTract='1000000';
			var dataset;
			var dataset_tract=[];			
			var dataset_tractAsian=[];
			var dataset_tractBlack=[];
			var dataset_tractLatine=[];
			var dataset_tractWhite=[];
			var dataset_tractNoMajority=[];
			var dataset_tract011=[];			
			var dataset_tract1220=[];
			var dataset_tract2131=[];
			var dataset_tractOver31=[];
			// Graphic 6.1 Overall
			var dataset_number1=[];
			var dataset_percent1=[];
			// Graphic 6.2 Single family
			var dataset_number2=[];
			var dataset_percent2=[];
			// Graphic 6.3 Multifamily
			var dataset_number3=[];
			var dataset_percent3=[];
			// Graphic 6.4 Small business
			var dataset_number4=[];
			var dataset_percent4=[];
			// Graphic 6.5 Nonresidential
			var dataset_number5=[];
			var dataset_percent5=[];
			// Graphic 6.6 Mission
			var dataset_number6=[];
			var dataset_percent6=[];
			// Graphic 6.7 Public
			var dataset_number7=[];
			var dataset_percent7=[];
			// Categories
			var catOverall6=true;
			var catSF6=false;
			var catMF6=false;
			var catSmallBiz6=false;
			var catNonRes6=false;
			var catMission6=false;
			var catPublic6=false;

			// Create SVG element
			var svg6 = d3.select(".urb-graphic-container6")
				.append("svg")
				.attr("id","urb-chicago-map")
			//	.attr("width", w)
			//	.attr("height", h)
				.attr("viewBox",(-xPadding)+" "+(-yPadding)+" "+w+" "+h)
				.attr("preserveAspectRatio","xMinYMin meet");
			
			var mapAsian = svg6
				.append("g")
				.classed("urb-map-partial urb-map-asian",true);
			var mapBlack = svg6
				.append("g")
				.classed("urb-map-partial urb-map-black",true);	
			var mapLatine = svg6
				.append("g")
				.classed("urb-map-partial urb-map-latine",true);	
			var mapWhite = svg6
				.append("g")
				.classed("urb-map-partial urb-map-white",true);	
			var mapNoMajority = svg6
				.append("g")
				.classed("urb-map-partial urb-map-nomajority",true);
			var map011 = svg6
				.append("g")
				.classed("urb-map-partial urb-map-011",true);
			var map1220 = svg6
				.append("g")
				.classed("urb-map-partial urb-map-1220",true);
			var map2131 = svg6
				.append("g")
				.classed("urb-map-partial urb-map-2131",true);
			var mapOver31 = svg6
				.append("g")
				.classed("urb-map-partial urb-map-over31",true);
			var mapChicagoAll = svg6
				.append("g")
				.classed("urb-map-chicago-all-paths",true);
		
		function funMainChicagoMap(){				
			// Read data
			d3.csv("data/chicago-graphic6-data.csv", function(data) {
				dataset=data;
				data.map(function(d) {
					dataset_tract.push(d.tract_geoid);
					if (d.majority_race=="Asian"){
						dataset_tractAsian.push(d.tract_geoid);
					}
					if (d.majority_race=="Black"){
						dataset_tractBlack.push(d.tract_geoid);
					}
					if (d.majority_race=="Latine"){
						dataset_tractLatine.push(d.tract_geoid);
					}
					if (d.majority_race=="white"){
						dataset_tractWhite.push(d.tract_geoid);
					}
					if (d.majority_race=="no racial majority"){
						dataset_tractNoMajority.push(d.tract_geoid);
					}
					if (d.poverty_cat=="0 to 11 percent"){
						dataset_tract011.push(d.tract_geoid);
					}
					if (d.poverty_cat=="12 to 20 percent"){
						dataset_tract1220.push(d.tract_geoid);
					}
					if (d.poverty_cat=="21 to 31 percent"){
						dataset_tract2131.push(d.tract_geoid);
					}
					if (d.poverty_cat=="Over 31%"){
						dataset_tractOver31.push(d.tract_geoid);
					}
					// Graphic 6.1 Overall
					dataset_number1.push(d3.format(",f")(parseFloat(d.aggregate_avg)));					
					dataset_percent1.push(parseFloat(d.aggregate_pct));
					// Graphic 6.2 Single family
					dataset_number2.push(d3.format(",f")(parseFloat(d.SF_avg)));					
					dataset_percent2.push(parseFloat(d.SF_pct));
					// Graphic 6.3 Multifamily
					dataset_number3.push(d3.format(",f")(parseFloat(d.MF_avg)));					
					dataset_percent3.push(parseFloat(d.MF_pct));
					// Graphic 6.4 Small business
					dataset_number4.push(d3.format(",f")(parseFloat(d.small_biz_avg)));					
					dataset_percent4.push(parseFloat(d.small_biz_pct));
					// Graphic 6.5 Nonresidential
					dataset_number4.push(d3.format(",f")(parseFloat(d.nonres_avg)));					
					dataset_percent4.push(parseFloat(d.nonres_pct));
					// Graphic 6.6 Mission
					dataset_number4.push(d3.format(",f")(parseFloat(d.mission_avg)));					
					dataset_percent4.push(parseFloat(d.mission_pct));
					// Graphic 6.7 Public
					dataset_number4.push(d3.format(",f")(parseFloat(d.public_avg)));					
					dataset_percent4.push(parseFloat(d.public_pct));
				});
	
				color.domain([0,100]);

				// Load in GeoJSON data
				d3.json("data/chicagocensus22.json", function(error6, json) {
					if (error6) throw error6;
					
					var selectedAsian = d3.set(dataset_tractAsian);
					var selectedBlack = d3.set(dataset_tractBlack);
					var selectedLatine = d3.set(dataset_tractLatine);
					var selectedWhite = d3.set(dataset_tractWhite);
					var selectedNoMajority = d3.set(dataset_tractNoMajority);
					var selected011 = d3.set(dataset_tract011);
					var selected1220 = d3.set(dataset_tract1220);
					var selected2131 = d3.set(dataset_tract2131);
					var selectedOver31 = d3.set(dataset_tractOver31);
					
  					mapAsian.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selectedAsian.has(d.properties.GEOID); })))
						.attr("d", path);			
					mapBlack.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selectedBlack.has(d.properties.GEOID); })))
						.attr("d", path);
					mapLatine.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selectedLatine.has(d.properties.GEOID); })))
						.attr("d", path);
					mapWhite.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selectedWhite.has(d.properties.GEOID); })))
						.attr("d", path);
					mapNoMajority.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selectedNoMajority.has(d.properties.GEOID); })))
						.attr("d", path);
					map011.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selected011.has(d.properties.GEOID); })))
						.attr("d", path);
					map1220.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selected1220.has(d.properties.GEOID); })))
						.attr("d", path);
					map2131.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selected2131.has(d.properties.GEOID); })))
						.attr("d", path);
					mapOver31.append("path")
						.datum(topojson.merge(json, json.objects.chicagocensus222.geometries.filter(function(d) { return selectedOver31.has(d.properties.GEOID); })))
						.attr("d", path);
		
					
					var allTracts = topojson.feature(json, json.objects.chicagocensus222);
      				//	selectionAll = {type: "FeatureCollection", features: allTracts.features.filter(function(d) { return d.properties.GEOID; })};
					jsonmap=json;
					//Merge the ag. data and GeoJSON
					//Loop through once for each ag. data value
					for (var i = 0; i < data.length; i++) {
				
						//Grab state name
						var dataTract = data[i].tract_geoid;
						
						//Grab data value
						var tractName = data[i].communityok;
						var majorityRace = data[i].majority_race;
						var povertyCat = data[i].poverty_cat;
						var dataValue1 = data[i].aggregate_pct;
						var dataValue2 = data[i].SF_pct;
						var dataValue3 = data[i].MF_pct;
						var dataValue4 = data[i].small_biz_pct;
						var dataValue5 = data[i].nonres_pct;
						var dataValue6 = data[i].mission_pct;
						var dataValue7 = data[i].public_pct;
				
						//Find the corresponding state inside the GeoJSON
						for (var j = 0; j < allTracts.features.length; j++) {
						
							var jsonTract = allTracts.features[j].properties.GEOID;
				
							if (dataTract == jsonTract) {
						
								//Copy the data value into the JSON
								allTracts.features[j].properties.tractName = tractName;
								allTracts.features[j].properties.majority_race = majorityRace;
								allTracts.features[j].properties.poverty_cat = povertyCat;
								allTracts.features[j].properties.aggregate_pct = dataValue1;
								allTracts.features[j].properties.SF_pct = dataValue2;
								allTracts.features[j].properties.MF_pct = dataValue3;
								allTracts.features[j].properties.small_biz_pct = dataValue4;
								allTracts.features[j].properties.nonres_pct = dataValue5;
								allTracts.features[j].properties.mission_pct = dataValue6;
								allTracts.features[j].properties.public_pct = dataValue7;
								
								//Stop looking through the JSON
								break;
								
							}
						}		
					}

					//Bind data and create one path per GeoJSON feature
					mapChicagoAll.selectAll("path")
					   .data(allTracts.features)
					   .enter()
					   .append("path")
					   .attr("d", path)
					   .attr("data-censustract", function(d) { return d.properties.GEOID; })
					   .attr("data-tract-name", function(d) { return d.properties.tractName; })
					   .attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					   .attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					   .attr("data-percent", function(d) {										
							return d.properties.aggregate_pct;
						})
					   .attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.aggregate_pct){
								if(d.properties.aggregate_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.aggregate_pct>=21) && (d.properties.aggregate_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.aggregate_pct>=41) && (d.properties.aggregate_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.aggregate_pct>=61) && (d.properties.aggregate_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Overall investment data not available";
							}
							return percentileText;
						})
					   .attr("data-percentile", function(d) {					
							var percentileTextLong;
							if(d.properties.aggregate_pct){
								if(d.properties.aggregate_pct<21){
									percentileTextLong = "0 to 20th percentile";
								}else if( (d.properties.aggregate_pct>=21) && (d.properties.aggregate_pct<41) ){
									percentileTextLong = "21st to 40th percentile";
								}else if( (d.properties.aggregate_pct>=41) && (d.properties.aggregate_pct<61) ){
									percentileTextLong = "41st to 60th percentile";
								}else if( (d.properties.aggregate_pct>=61) && (d.properties.aggregate_pct<81) ){
									percentileTextLong = "61st to 80th percentile";
								}else{
									percentileTextLong = "81st to 100th percentile";
								}
							}else{
								percentileTextLong = "Overall investment data not available";
							}
							return percentileTextLong;
						})
					   .attr("data-percentile-ispresent", function(d) {					
							var percentileTextYes;
							if(d.properties.aggregate_pct){
								percentileTextYes = "Yes";
							}else{
								percentileTextYes = "No";
							}
							return percentileTextYes;
						})
					   .style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.aggregate_pct;
					 //  		var value = 0;
					   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					   });
					selectTract();
					hoverTract(); 			
			
				});
				
			
				d3.select("#urb-container6 .urb-button-01").on("click", function() {
					catOverall6=true;
					catSF6=false;catMF6=false;catSmallBiz6=false;catNonRes6=false;catMission6=false;catPublic6=false;					
					buttonOverall();
				});
				d3.select("#urb-container6 .urb-button-02").on("click", function() {
					catSF6=true;
					catOverall6=false;catMF=false;catSmallBiz6=false;catNonRes6=false;catMission6=false;catPublic6=false;					
					buttonSF();
				});
				d3.select("#urb-container6 .urb-button-03").on("click", function() {
					catMF6=true;
					catOverall6=false;catSF6=false;catSmallBiz6=false;catNonRes6=false;catMission6=false;catPublic6=false;					
					buttonMF();
				});
				d3.select("#urb-container6 .urb-button-04").on("click", function() {
					catSmallBiz6=true;
					catOverall6=false;catSF6=false;catMF6=false;catNonRes6=false;catMission6=false;catPublic6=false;					
					buttonSmallBiz();
				});
				d3.select("#urb-container6 .urb-button-05").on("click", function() {
					catNonRes6=true;
					catOverall6=false;catSF6=false;catMF6=false;catSmallBiz6=false;catMission6=false;catPublic6=false;					
					buttonNonRes();
				});
				d3.select("#urb-container6 .urb-button-06").on("click", function() {
					catMission6=true;
					catOverall6=false;catSF6=false;catMF6=false;catSmallBiz6=false;catNonRes6=false;catPublic6=false;					
					buttonMission();
				});
				d3.select("#urb-container6 .urb-button-07").on("click", function() {
					catPublic6=true;
					catOverall6=false;catSF6=false;catMF6=false;catSmallBiz6=false;catNonRes6=false;catMission6=false;					
					buttonPublic();
				});				
				
				
				d3.select("#urb-container6 .urb-check-asian").on("click", function() {
					buttonEthnicityAsian();
				});
				d3.select("#urb-container6 .urb-check-black").on("click", function() {
					buttonEthnicityBlack();
				});
				d3.select("#urb-container6 .urb-check-latine").on("click", function() {
					buttonEthnicityLatine();
				});				
				d3.select("#urb-container6 .urb-check-white").on("click", function() {
					buttonEthnicityWhite();
				});
				d3.select("#urb-container6 .urb-check-nomajority").on("click", function() {
					buttonEthnicityNoMajority();
				});
				d3.select("#urb-container6 .urb-check-0").on("click", function() {
					buttonEthnicity0();
				});
				d3.select("#urb-container6 .urb-check-12").on("click", function() {
					buttonEthnicity12();
				});
				d3.select("#urb-container6 .urb-check-21").on("click", function() {
					buttonEthnicity21();
				});
				d3.select("#urb-container6 .urb-check-31").on("click", function() {
					buttonEthnicity31();
				});
				
				d3.select("#urb-container6 .urb-button-container2 .urb-clear6").on("click", function() {
					$("#urb-container6 .urb-check").removeClass("urb-active6");
					$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
					$("#urb-container6 .urb-map-scale .urb-check-text").removeClass("urb-check-text-visible");
					$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");					
					$(this).css("visibility","hidden");
				});
				
				d3.select("#urb-container6 .urb-data .urb-clear-tract6").on("click", function() {
					globalTract='1000000';
					$("#urb-container6 .urb-data .urb-data-before").css("display","block");
					$("#urb-container6 .urb-data .urb-data-hover").css("display","none");
					d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");
					$(this).css("visibility","hidden");
				});
				
				d3.select("#urb-container6 .urb-data .urb-clear-tract6-small").on("click", function() {
					globalTract='1000000';
					$("#urb-container6 .urb-data .urb-data-before").css("display","block");
					$("#urb-container6 .urb-data .urb-data-hover").css("display","none");
					d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");
					$(this).css("visibility","hidden");
				});
				
				d3.select(".urb-hint").on("click", function(){
					globalTract='1000000';
					$(".fns-data-unit-coverage p").removeClass();
					d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");
					if (catOverall6){
						buttonOverall();
					};
					if (catSF6){
						buttonSF();
					};
					if (catMF6){
						buttonMF();
					};
					if (catSmallBiz6){
						buttonSmalBiz();
					};
					if (catNonRes6){
						buttonNonRes();
					};
					if (catMission6){
						buttonMission();
					};
					if (catPublic6){
						buttonPublic();
					};
				});
				
              
			});
		};

			
			function selectTract(){
				$("#urb-chicago-map path").each(function() {
					var currentSentence="";
					var currentTract=$(this).attr("data-censustract");
                    var tractName=$(this).attr("data-tract-name");
                    var povertyRate=$(this).attr("data-poverty");
                    var ethnicity=$(this).attr("data-ethnicity");
                    var percentile=$(this).attr("data-percentile");
                    var percentilePresent=$(this).attr("data-percentile-ispresent");
					$(this).click(function(){
						globalTract=currentTract;
						if (catOverall6){
							currentSentence="overall investment per household";
							currentCat="Overall";
						};
						if (catSF6){
							currentSentence="overall investment per owner-occupied household";
							currentCat="Single family";
						};
						if (catMF6){
							currentSentence="overall investment per renter-occupied household";
							currentCat="Multifamily";
						};
						if (catSmallBiz6){
							currentSentence="overall investment per small-business employee";
							currentCat="Small business";
						};
						if (catNonRes6){
							currentSentence="overall investment per employee";
							currentCat="Nonresidential";
						};
						if (catMission6){
							currentSentence="overall investment per household";
							currentCat="Mission";
						};
						if (catPublic6){
							currentSentence="overall investment per household";
							currentCat="Public";
						};
						$("#urb-container6 .urb-data .urb-data-before").css("display","none");
						$("#urb-container6 .urb-data .urb-data-hover").css("display","block");
						$("#urb-container6 .urb-data .urb-clear-tract6").css("visibility","visible");
						$("#urb-container6 .urb-data .urb-clear-tract6-small").css("visibility","visible");
						if(percentilePresent=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+currentTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">'+currentSentence+'</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(currentTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+currentTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">'+currentSentence+'</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+currentTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">'+currentSentence+'</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">'+currentCat+'</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+currentTract+'</span> are not available because the tract has an insufficient number of households.');
						}
				//		$(".urb-check").removeClass("urb-active6");
						d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");
						d3.select(this).attr("class","urb-active6");
						$(this).parent().append(this);
					});
                });
			};
			
			function alreadyTract(globalTract){
				$("#urb-chicago-map path").each(function() {
					var SelectedTractName=$("#urb-chicago-map path[data-censustrack='"+globalTract+"']").attr("data-tract-name");
					var SelectedPovertyRate=$("#urb-chicago-map path[data-censustrack='"+globalTract+"']").attr("data-poverty");
					var SelectedEthnicity=$("#urb-chicago-map path[data-censustrack='"+globalTract+"']").attr("data-ethnicity");
					var SelectedPercentile=$("#urb-chicago-map path[data-censustrack='"+globalTract+"']").attr("data-percentile");
					$("#urb-container6 .urb-data-unit-tract").text(globalTract);
					$("#urb-container6 .urb-data-unit-area").text(SelectedTractName);
					$("#urb-container6 .urb-data-unit-poverty").text(SelectedPovertyRate);
					$("#urb-container6 .urb-data-unit-ethnicity").text(SelectedEthnicity);
					$("#urb-container6 .urb-data-unit-percentile").text(SelectedPercentile);
            	});
			};
			
			function hoverTract(){
				$("#urb-chicago-map path").each(function() {
					var currentTract=$(this).attr("data-censustract");
                    var tractName=$(this).attr("data-tract-name");
                    var povertyRate=$(this).attr("data-poverty");
                    var ethnicity=$(this).attr("data-ethnicity");
                    var percentile=$(this).attr("data-percentile-hover");
                    $(this).on({
                        mouseenter:function(){
						//	$("#urb-container6 .urb-data-unit-tract").text(currentTract);
						//	$("#urb-container6 .urb-data-unit-area").text(tractName);
						//	$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
						//	$("#urb-container6 .urb-data-unit-ethnicity").text(ethnicity);
						//	$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							$("#urb-tooltip6 .urb-tooltip-tract").text(currentTract);
							$("#urb-tooltip6 .urb-tooltip-percentile").text(percentile);
							
                            if (catOverall6){
                            } else if (catSF6){
                            } else if (catMF6) {							
                            } else {							
                            }
    						//Show the tooltip
							$("#urb-tooltip6").removeClass("hidden");
						//	$("#urb-container6 .urb-data .urb-data-before").css("display","none");
						//	$("#urb-container6 .urb-data .urb-data-hover").css("display","block");	
                        },mouseleave:function(){
    						//Hide the tooltip
							$("#urb-tooltip6").addClass("hidden");
						//	if (globalTract==='1000000') {
						//	$("#urb-container6 .urb-data .urb-data-before").css("display","block");
						//	$("#urb-container6 .urb-data .urb-data-hover").css("display","none");
						//	}
                        }
                    }); 
                });
                var lateral6 = $("#urb-container6").width();
				d3.select("#urb-chicago-map")
					.selectAll("path")
				    .on("mousemove", function () {
						if (lateral6-d3.event.pageX<lateral6/4) {
        					return tooltipArea6
            					.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX - 180) + "px");
						} else if (lateral6-d3.event.pageX<lateral6/1.33333) {
        					return tooltipArea6
								.style("top", (d3.event.pageY + 24) + "px")
            					.style("left", (d3.event.pageX -90) + "px");
						} else {
        					return tooltipArea6
								.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX) + "px");
						}
    				});
            };

			function buttonOverall(){
				$("#urb-container6 .urb-data-unit-currentcat").text("Overall");
				$("#urb-container6 .urb-data-unit-category").text("overall investment per househould");
				$("#urb-container6 .urb-button").removeClass("urb-active6");
				$("#urb-container6 .urb-button-01").addClass("urb-active6");
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-button-container p.urb-dropdown-title span").text("Overall");
		//		d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");

				var overallcolor = mapChicagoAll.selectAll("path");
				overallcolor
					.attr("data-censustract", function(d) { return d.properties.GEOID; })
					.attr("data-tract-name", function(d) { return d.properties.tractName; })
					.attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					.attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					.attr("data-percent", function(d) {										
						return d.properties.aggregate_pct;
					})
					.attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.aggregate_pct){
								if(d.properties.aggregate_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.aggregate_pct>=21) && (d.properties.aggregate_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.aggregate_pct>=41) && (d.properties.aggregate_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.aggregate_pct>=61) && (d.properties.aggregate_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Overall investment data not available";
							}					
							return percentileText;
					})
					.attr("data-percentile", function(d) {					
						var percentileTextLong;
						if(d.properties.aggregate_pct){
							if(d.properties.aggregate_pct<21){
								percentileTextLong = "0 to 20th percentile";
							}else if( (d.properties.aggregate_pct>=21) && (d.properties.aggregate_pct<41) ){
								percentileTextLong = "21st to 40th percentile";
							}else if( (d.properties.aggregate_pct>=41) && (d.properties.aggregate_pct<61) ){
								percentileTextLong = "41st to 60th percentile";
							}else if( (d.properties.aggregate_pct>=61) && (d.properties.aggregate_pct<81) ){
								percentileTextLong = "61st to 80th percentile";
							}else{
								percentileTextLong = "81st to 100th percentile";
							}
						}else{
							percentileTextLong = "Overall investment data not available";
						}
						return percentileTextLong;
					})
					.attr("data-percentile-ispresent", function(d) {					
						var percentileTextYes;
						if(d.properties.aggregate_pct){
							percentileTextYes = "Yes";
						}else{
							percentileTextYes = "No";
						}
						return percentileTextYes;
					})
					.style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.aggregate_pct;		   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					});
				selectTract();
				hoverTract();
				if (globalTract!=='1000000') {
					$("#urb-chicago-map path").each(function() {
						var percentile=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile");
						var percentileYes=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile-ispresent");
						var tractName=$("#urb-chicago-map").find(".urb-active6").attr("data-tract-name");
						var ethnicity=$("#urb-chicago-map").find(".urb-active6").attr("data-ethnicity");
						var povertyRate=$("#urb-chicago-map").find(".urb-active6").attr("data-poverty");						
						
						if(percentileYes=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">overall investment per household</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(globalTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">overall investment per household</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">overall investment per household</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">Overall</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> are not available because the tract has an insufficient number of households.');
						}						
                	});
					
				}
			};
			
			function buttonSF(){
				$("#urb-container6 .urb-data-unit-currentcat").text("Single family");
				$("#urb-container6 .urb-data-unit-category").text("single family investment per owner-occupied househould");
				$("#urb-container6 .urb-button").removeClass("urb-active6");
				$("#urb-container6 .urb-button-02").addClass("urb-active6");
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-button-container p.urb-dropdown-title span").text("Single family");
		//		d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");

				var sfcolor = mapChicagoAll.selectAll("path");
				sfcolor
					.attr("data-censustract", function(d) { return d.properties.GEOID; })
					.attr("data-tract-name", function(d) { return d.properties.tractName; })
					.attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					.attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					.attr("data-percent", function(d) {										
						return d.properties.SF_pct;
					})
					.attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.SF_pct){
								if(d.properties.SF_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.SF_pct>=21) && (d.properties.SF_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.SF_pct>=41) && (d.properties.SF_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.SF_pct>=61) && (d.properties.SF_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Single family investment data not available";
							}
							return percentileText;
					})
					.attr("data-percentile", function(d) {					
						var percentileTextLong;
						if(d.properties.SF_pct){
							if(d.properties.SF_pct<21){
								percentileTextLong = "0 to 20th percentile";
							}else if( (d.properties.SF_pct>=21) && (d.properties.SF_pct<41) ){
								percentileTextLong = "21st to 40th percentile";
							}else if( (d.properties.SF_pct>=41) && (d.properties.SF_pct<61) ){
								percentileTextLong = "41st to 60th percentile";
							}else if( (d.properties.SF_pct>=61) && (d.properties.SF_pct<81) ){
								percentileTextLong = "61st to 80th percentile";
							}else{
								percentileTextLong = "81st to 100th percentile";
							}
						}else{
							percentileTextLong = "Overall investment data not available";
						}
						return percentileTextLong;
					})
					.attr("data-percentile-ispresent", function(d) {					
						var percentileTextYes;
						if(d.properties.SF_pct){
							percentileTextYes = "Yes";
						}else{
							percentileTextYes = "No";
						}
						return percentileTextYes;
					})
					.style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.SF_pct;		   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					});
				selectTract();
				hoverTract();
				if (globalTract!=='1000000') {
					$("#urb-chicago-map path").each(function() {
						var percentile=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile");
						var percentileYes=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile-ispresent");
						var tractName=$("#urb-chicago-map").find(".urb-active6").attr("data-tract-name");
						var ethnicity=$("#urb-chicago-map").find(".urb-active6").attr("data-ethnicity");
						var povertyRate=$("#urb-chicago-map").find(".urb-active6").attr("data-poverty");						
						
						if(percentileYes=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">single-family investment per owner-occupied household</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(globalTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">single-family investment per owner-occupied household</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">single-family investment per owner-occupied household</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">Single family</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> are not available because the tract has an insufficient number of households.');
						}
                	});
				}
			};
			
			function buttonMF(){
				$("#urb-container6 .urb-data-unit-currentcat").text("Multifamily");
				$("#urb-container6 .urb-data-unit-category").text("multifamily investment per renter-occupied househould");
				$("#urb-container6 .urb-button").removeClass("urb-active6");
				$("#urb-container6 .urb-button-03").addClass("urb-active6");
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-button-container p.urb-dropdown-title span").text("Multifamily");
		//		d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");

				var mfcolor = mapChicagoAll.selectAll("path");
				mfcolor
					.attr("data-censustract", function(d) { return d.properties.GEOID; })
					.attr("data-tract-name", function(d) { return d.properties.tractName; })
					.attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					.attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					.attr("data-percent", function(d) {										
						return d.properties.MF_pct;
					})
					.attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.MF_pct){
								if(d.properties.MF_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.MF_pct>=21) && (d.properties.MF_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.MF_pct>=41) && (d.properties.MF_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.MF_pct>=61) && (d.properties.MF_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Multifamily investment data not available";
							}
							return percentileText;
					})
					.attr("data-percentile", function(d) {					
						var percentileTextLong;
						if(d.properties.MF_pct){
							if(d.properties.MF_pct<21){
								percentileTextLong = "0 to 20th percentile";
							}else if( (d.properties.MF_pct>=21) && (d.properties.MF_pct<41) ){
								percentileTextLong = "21st to 40th percentile";
							}else if( (d.properties.MF_pct>=41) && (d.properties.MF_pct<61) ){
								percentileTextLong = "41st to 60th percentile";
							}else if( (d.properties.MF_pct>=61) && (d.properties.MF_pct<81) ){
								percentileTextLong = "61st to 80th percentile";
							}else{
								percentileTextLong = "81st to 100th percentile";
							}
						}else{
							percentileTextLong = "Overall investment data not available";
						}
						return percentileTextLong;
					})
					.attr("data-percentile-ispresent", function(d) {					
						var percentileTextYes;
						if(d.properties.MF_pct){
							percentileTextYes = "Yes";
						}else{
							percentileTextYes = "No";
						}
						return percentileTextYes;
					})
					.style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.MF_pct;		   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					});
				selectTract();
				hoverTract();
				if (globalTract!=='1000000') {
					$("#urb-chicago-map path").each(function() {
						var percentile=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile");
						var percentileYes=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile-ispresent");
						var tractName=$("#urb-chicago-map").find(".urb-active6").attr("data-tract-name");
						var ethnicity=$("#urb-chicago-map").find(".urb-active6").attr("data-ethnicity");
						var povertyRate=$("#urb-chicago-map").find(".urb-active6").attr("data-poverty");						
						
						if(percentileYes=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">multifamily investment per renter-occupied household</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(globalTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">multifamily investment per renter-occupied household</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">multifamily investment per renter-occupied household</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">Multifamily</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> are not available because the tract has an insufficient number of households.');
						}
                	});
				}
			};

			function buttonSmallBiz(){
				$("#urb-container6 .urb-data-unit-currentcat").text("Small business");
				$("#urb-container6 .urb-data-unit-category").text("small business investment per small-business employee");
				$("#urb-container6 .urb-button").removeClass("urb-active6");
				$("#urb-container6 .urb-button-04").addClass("urb-active6");
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-button-container p.urb-dropdown-title span").text("Small business");
		//		d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");

				var smallbizcolor = mapChicagoAll.selectAll("path");
				smallbizcolor
					.attr("data-censustract", function(d) { return d.properties.GEOID; })
					.attr("data-tract-name", function(d) { return d.properties.tractName; })
					.attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					.attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					.attr("data-percent", function(d) {										
						return d.properties.small_biz_pct;
					})
					.attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.small_biz_pct){
								if(d.properties.small_biz_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.small_biz_pct>=21) && (d.properties.small_biz_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.small_biz_pct>=41) && (d.properties.small_biz_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.small_biz_pct>=61) && (d.properties.small_biz_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Small business investment data not available";
							}
							return percentileText;
					})
					.attr("data-percentile", function(d) {					
						var percentileTextLong;
						if(d.properties.small_biz_pct){
							if(d.properties.small_biz_pct<21){
								percentileTextLong = "0 to 20th percentile";
							}else if( (d.properties.small_biz_pct>=21) && (d.properties.small_biz_pct<41) ){
								percentileTextLong = "21st to 40th percentile";
							}else if( (d.properties.small_biz_pct>=41) && (d.properties.small_biz_pct<61) ){
								percentileTextLong = "41st to 60th percentile";
							}else if( (d.properties.small_biz_pct>=61) && (d.properties.small_biz_pct<81) ){
								percentileTextLong = "61st to 80th percentile";
							}else{
								percentileTextLong = "81st to 100th percentile";
							}
						}else{
							percentileTextLong = "Overall investment data not available";
						}
						return percentileTextLong;
					})
					.attr("data-percentile-ispresent", function(d) {					
						var percentileTextYes;
						if(d.properties.small_biz_pct){
							percentileTextYes = "Yes";
						}else{
							percentileTextYes = "No";
						}
						return percentileTextYes;
					})
					.style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.small_biz_pct;		   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					});
				selectTract();
				hoverTract();
				if (globalTract!=='1000000') {
					$("#urb-chicago-map path").each(function() {
						var percentile=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile");
						var percentileYes=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile-ispresent");
						var tractName=$("#urb-chicago-map").find(".urb-active6").attr("data-tract-name");
						var ethnicity=$("#urb-chicago-map").find(".urb-active6").attr("data-ethnicity");
						var povertyRate=$("#urb-chicago-map").find(".urb-active6").attr("data-poverty");						
						
						if(percentileYes=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">small-business investment per small-business employee</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(globalTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">small-business investment per small-business employee</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">small-business investment per small-business employee</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">Small business</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> are not available because the tract has an insufficient number of households.');
						}						
                	});
					
				}
			};

			function buttonNonRes(){
				$("#urb-container6 .urb-data-unit-currentcat").text("Nonresidential");
				$("#urb-container6 .urb-data-unit-category").text("nonresidential investment per employee");
				$("#urb-container6 .urb-button").removeClass("urb-active6");
				$("#urb-container6 .urb-button-05").addClass("urb-active6");
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-button-container p.urb-dropdown-title span").text("Nonresidential");
		//		d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");

				var nonrescolor = mapChicagoAll.selectAll("path");
				nonrescolor
					.attr("data-censustract", function(d) { return d.properties.GEOID; })
					.attr("data-tract-name", function(d) { return d.properties.tractName; })
					.attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					.attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					.attr("data-percent", function(d) {										
						return d.properties.nonres_pct;
					})
					.attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.nonres_pct){
								if(d.properties.nonres_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.nonres_pct>=21) && (d.properties.nonres_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.nonres_pct>=41) && (d.properties.nonres_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.nonres_pct>=61) && (d.properties.nonres_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Nonresidential investment data not available";
							}
							return percentileText;
					})
					.attr("data-percentile", function(d) {					
						var percentileTextLong;
						if(d.properties.nonres_pct){
							if(d.properties.nonres_pct<21){
								percentileTextLong = "0 to 20th percentile";
							}else if( (d.properties.nonres_pct>=21) && (d.properties.nonres_pct<41) ){
								percentileTextLong = "21st to 40th percentile";
							}else if( (d.properties.nonres_pct>=41) && (d.properties.nonres_pct<61) ){
								percentileTextLong = "41st to 60th percentile";
							}else if( (d.properties.nonres_pct>=61) && (d.properties.nonres_pct<81) ){
								percentileTextLong = "61st to 80th percentile";
							}else{
								percentileTextLong = "81st to 100th percentile";
							}
						}else{
							percentileTextLong = "Overall investment data not available";
						}
						return percentileTextLong;
					})
					.attr("data-percentile-ispresent", function(d) {					
						var percentileTextYes;
						if(d.properties.nonres_pct){
							percentileTextYes = "Yes";
						}else{
							percentileTextYes = "No";
						}
						return percentileTextYes;
					})
					.style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.nonres_pct;		   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					});
				selectTract();
				hoverTract();
				if (globalTract!=='1000000') {
					$("#urb-chicago-map path").each(function() {
						var percentile=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile");
						var percentileYes=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile-ispresent");
						var tractName=$("#urb-chicago-map").find(".urb-active6").attr("data-tract-name");
						var ethnicity=$("#urb-chicago-map").find(".urb-active6").attr("data-ethnicity");
						var povertyRate=$("#urb-chicago-map").find(".urb-active6").attr("data-poverty");						
						
						if(percentileYes=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">nonresidential investment per employee</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(globalTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">nonresidential investment per employee</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">nonresidential investment per employee</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">Nonresidential</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> are not available because the tract has an insufficient number of households.');
						}	
                	});
				}
			};

			function buttonMission(){
				$("#urb-container6 .urb-data-unit-currentcat").text("Mission");
				$("#urb-container6 .urb-data-unit-category").text("mission investment per househould");
				$("#urb-container6 .urb-button").removeClass("urb-active6");
				$("#urb-container6 .urb-button-06").addClass("urb-active6");
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-button-container p.urb-dropdown-title span").text("Mission");
		//		d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");

				var missioncolor = mapChicagoAll.selectAll("path");
				missioncolor
					.attr("data-censustract", function(d) { return d.properties.GEOID; })
					.attr("data-tract-name", function(d) { return d.properties.tractName; })
					.attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					.attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					.attr("data-percent", function(d) {										
						return d.properties.mission_pct;
					})
					.attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.mission_pct){
								if(d.properties.mission_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.mission_pct>=21) && (d.properties.mission_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.mission_pct>=41) && (d.properties.mission_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.mission_pct>=61) && (d.properties.mission_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Mission investment data not available";
							}
							return percentileText;
					})
					.attr("data-percentile", function(d) {					
						var percentileTextLong;
						if(d.properties.mission_pct){
							if(d.properties.mission_pct<21){
								percentileTextLong = "0 to 20th percentile";
							}else if( (d.properties.mission_pct>=21) && (d.properties.mission_pct<41) ){
								percentileTextLong = "21st to 40th percentile";
							}else if( (d.properties.mission_pct>=41) && (d.properties.mission_pct<61) ){
								percentileTextLong = "41st to 60th percentile";
							}else if( (d.properties.mission_pct>=61) && (d.properties.mission_pct<81) ){
								percentileTextLong = "61st to 80th percentile";
							}else{
								percentileTextLong = "81st to 100th percentile";
							}
						}else{
							percentileTextLong = "Overall investment data not available";
						}
						return percentileTextLong;
					})
					.attr("data-percentile-ispresent", function(d) {					
						var percentileTextYes;
						if(d.properties.mission_pct){
							percentileTextYes = "Yes";
						}else{
							percentileTextYes = "No";
						}
						return percentileTextYes;
					})
					.style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.mission_pct;		   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					});
				selectTract();
				hoverTract();
				if (globalTract!=='1000000') {
					$("#urb-chicago-map path").each(function() {
						var percentile=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile");
						var percentileYes=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile-ispresent");
						var tractName=$("#urb-chicago-map").find(".urb-active6").attr("data-tract-name");
						var ethnicity=$("#urb-chicago-map").find(".urb-active6").attr("data-ethnicity");
						var povertyRate=$("#urb-chicago-map").find(".urb-active6").attr("data-poverty");						
						
						if(percentileYes=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">mission investment per household</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(globalTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">mission investment per household</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">mission investment per household</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">Mission</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> are not available because the tract has an insufficient number of households.');
						}
                	});
				}
			};		
			
			function buttonPublic(){
				$("#urb-container6 .urb-data-unit-currentcat").text("Public");
				$("#urb-container6 .urb-data-unit-category").text("public investment per househould");
				$("#urb-container6 .urb-button").removeClass("urb-active6");
				$("#urb-container6 .urb-button-07").addClass("urb-active6");
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-button-container p.urb-dropdown-title span").text("Public");
		//		d3.selectAll("#urb-chicago-map path").attr("class","urb-noactive6");

				var publiccolor = mapChicagoAll.selectAll("path");
				publiccolor
					.attr("data-censustract", function(d) { return d.properties.GEOID; })
					.attr("data-tract-name", function(d) { return d.properties.tractName; })
					.attr("data-ethnicity", function(d) { return d.properties.majority_race; })
					.attr("data-poverty", function(d) { return d.properties.poverty_cat; })
					.attr("data-percent", function(d) {										
						return d.properties.public_pct;
					})
					.attr("data-percentile-hover", function(d) {					
							var percentileText;
							if(d.properties.public_pct){
								if(d.properties.public_pct<21){
									percentileText = "0–20th percentile";
								}else if( (d.properties.public_pct>=21) && (d.properties.public_pct<41) ){
									percentileText = "21st–40th percentile";
								}else if( (d.properties.public_pct>=41) && (d.properties.public_pct<61) ){
									percentileText = "41st–60th percentile";
								}else if( (d.properties.public_pct>=61) && (d.properties.public_pct<81) ){
									percentileText = "61st–80th percentile";
								}else{
									percentileText = "81st–100th percentile";
								}
							}else{
								percentileText = "Public investment data not available";
							}
							return percentileText;
					})
					.attr("data-percentile", function(d) {					
						var percentileTextLong;
						if(d.properties.public_pct){
							if(d.properties.public_pct<21){
								percentileTextLong = "0 to 20th percentile";
							}else if( (d.properties.public_pct>=21) && (d.properties.public_pct<41) ){
								percentileTextLong = "21st to 40th percentile";
							}else if( (d.properties.public_pct>=41) && (d.properties.public_pct<61) ){
								percentileTextLong = "41st to 60th percentile";
							}else if( (d.properties.public_pct>=61) && (d.properties.public_pct<81) ){
								percentileTextLong = "61st to 80th percentile";
							}else{
								percentileTextLong = "81st to 100th percentile";
							}
						}else{
							percentileTextLong = "Overall investment data not available";
						}
						return percentileTextLong;
					})
					.attr("data-percentile-ispresent", function(d) {					
						var percentileTextYes;
						if(d.properties.public_pct){
							percentileTextYes = "Yes";
						}else{
							percentileTextYes = "No";
						}
						return percentileTextYes;
					})
					.style("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.public_pct;		   		
					   		if (value) {
					   			//If value existsâ€¦
						   		return color(value);
					   		} else {
					   			//If value is undefinedâ€¦
						   		return "#ccc";
					   		}
					});
				selectTract();
				hoverTract();
				if (globalTract!=='1000000') {
					$("#urb-chicago-map path").each(function() {
						var percentile=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile");
						var percentileYes=$("#urb-chicago-map").find(".urb-active6").attr("data-percentile-ispresent");
						var tractName=$("#urb-chicago-map").find(".urb-active6").attr("data-tract-name");
						var ethnicity=$("#urb-chicago-map").find(".urb-active6").attr("data-ethnicity");
						var povertyRate=$("#urb-chicago-map").find(".urb-active6").attr("data-poverty");						
						
						if(percentileYes=="Yes"){
							if((ethnicity=="")&&(povertyRate=="")){
								$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">public investment per household</span>.');
							}else{
								$("#urb-container6 .urb-data-unit-current-cat").text(currentCat);
								$("#urb-container6 .urb-data-unit-tract").text(globalTract);
								$("#urb-container6 .urb-data-unit-area").text(tractName);
								$("#urb-container6 .urb-data-unit-poverty").text(povertyRate);
								if(ethnicity!="no racial majority"){
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and the majority of its residents report their race or ethnicity as <span class="urb-data-unit urb-data-unit-ethnicity">'+ethnicity+'</span>. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">public investment per household</span>.');
								} else {
									$("#urb-container6 .urb-data .urb-data-hover").html('Census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> is in the <span class="urb-data-unit urb-data-unit-area">'+tractName+'</span> neighborhood. Its poverty rate is <span class="urb-data-unit urb-data-unit-poverty">'+povertyRate+'</span>, and there is no racial majority. Between 2010 and 2020, this tract was in the <span class="urb-data-unit urb-data-unit-percentile">'+percentile+'</span> in average <span class="urb-data-unit urb-data-unit-category">public investment per household</span>.');
								}
								$("#urb-container6 .urb-data-unit-percentile").text(percentile);
							}
						}else{
							$("#urb-container6 .urb-data .urb-data-hover").html('<span class="urb-data-unit urb-data-unit-currentcat">Public</span> investment data for census tract <span class="urb-data-unit urb-data-unit-tract">'+globalTract+'</span> are not available because the tract has an insufficient number of households.');
						}
                	});
				}
			};
			
			function buttonEthnicityAsian(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-asian").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-asian path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-asian").parent().append($("#urb-container6 #urb-chicago-map .urb-map-asian"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("Asian majority");
			};		
			function buttonEthnicityBlack(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-black").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-black path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-black").parent().append($("#urb-container6 #urb-chicago-map .urb-map-black"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("Black majority");
			};
			function buttonEthnicityLatine(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-latine").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-latine path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-latine").parent().append($("#urb-container6 #urb-chicago-map .urb-map-latine"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("Latine majority");
			};
			function buttonEthnicityWhite(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-white").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-white path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-white").parent().append($("#urb-container6 #urb-chicago-map .urb-map-white"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("white majority");
			};
			function buttonEthnicityNoMajority(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-nomajority").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-nomajority path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-nomajority").parent().append($("#urb-container6 #urb-chicago-map .urb-map-nomajority"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("no racial majority");
			};			
			
			function buttonEthnicity0(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-0").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-011 path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-011").parent().append($("#urb-container6 #urb-chicago-map .urb-map-011"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("1-11% poverty rate");
			};	
			function buttonEthnicity12(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-12").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-1220 path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-1220").parent().append($("#urb-container6 #urb-chicago-map .urb-map-1220"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("12-20% poverty rate");
			};	
			function buttonEthnicity21(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-21").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-2131 path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-2131").parent().append($("#urb-container6 #urb-chicago-map .urb-map-2131"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("21-31% poverty rate");
			};
			function buttonEthnicity31(){
				$('#urb-container6 .urb-container6-column').removeClass("ub-menu-opened6");
				$("#urb-container6 .urb-check").removeClass("urb-active6");
				$("#urb-container6 .urb-check-31").addClass("urb-active6");
				$("#urb-container6 .urb-button-container2 .urb-clear6").css("visibility","visible");
				$("#urb-container6 #urb-chicago-map .urb-map-partial path").css("display","none");
				$("#urb-container6 #urb-chicago-map .urb-map-partial.urb-map-over31 path").css("display","block");
				$("#urb-container6 #urb-chicago-map .urb-map-over31").parent().append($("#urb-container6 #urb-chicago-map .urb-map-over31"));
				$("#urb-container6 .urb-map-scale .urb-check-text").addClass("urb-check-text-visible");
				$("#urb-container6 .urb-map-scale .urb-check-text span").text("over 31% poverty rate");
			};
			
			funMainChicagoMap();
		};
		/***************************** END CHICAGO GRAPHIC 6 *****************************/
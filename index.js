

var opening_hours = require('opening_hours');
var express = require('express')
var app = express()

app.get('/today/:ohString', function (req, res) {

	var openings = "";
	var weekdays = ['Søn', 'Man', 'Tir', 'Ons', 'Tors', 'Fre', 'Lør']

	var oh = new opening_hours(req.params.ohString);
	
	var today;

	// Check if it is open today
	var openToday = oh.getState();

	if(openToday) {

		var today = new Date();
		var from = today.setHours(0);
		var to = today.setHours(23);
		var intervals = oh.getOpenIntervals(new Date(from), new Date(to));

		for (var i in intervals) {
	    	var fraTid = intervals[i][0].getHours();
	    	var tilTid = intervals[i][1].getHours();

	    	today = fraTid + "-" + tilTid;
		}

	}
	else {
		today = "Stengt";
	}



	
	var output = {"today": today};

    res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(output));
})


app.get('/:ohString', function (req, res) {

	var openings = "";
	var weekdays = ['Søn', 'Man', 'Tir', 'Ons', 'Tors', 'Fre', 'Lør']

	//var oh = new opening_hours('Oct Sa[2]-easter Sa-Su 11:00-16:00');
	var oh = new opening_hours(req.params.ohString);
	
	// Get first and last day of this week
	var curr = new Date();
	var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
	var last = first + 6; // last day is the first day + 6
	var from = new Date(curr.setDate(first));
	var to = new Date(curr.setDate(last));

	// Change hour
	to = new Date(to.setHours(23))
	from = new Date(from.setHours(00))

	var openings = "";
	var intervals = oh.getOpenIntervals(from, to);


	var monday = "Stengt";
		tuesday = "Stengt";
		wednesday = "Stengt";
		thursday = "Stengt";
		friday = "Stengt";
		saturday = "Stengt";
		sunday = "Stengt";

	for (var i in intervals) {
	    var fraDag = intervals[i][0].getDay();
	    var fraTid = intervals[i][0].getHours();
	    var tilTid = intervals[i][1].getHours();
	    console.log(fraDag);
	    switch (fraDag) {
		    case 1:
		        monday = fraTid + "-" + tilTid;
		        break;
		    case 2:
		        tuesday = fraTid + "-" + tilTid;
		        break;
		    case 3:
		        wednesday = fraTid + "-" + tilTid;
		        break;
		    case 4:
		        thursday = fraTid + "-" + tilTid;
		        break;
		    case 5:
		        friday = fraTid + "-" + tilTid;
		        break;
		    case 6:
		        saturday = fraTid + "-" + tilTid;
		        break;
		    case 0:
		        sunday = fraTid + "-" + tilTid;
		        break;
		}
	    
	}

	var output = {"monday": monday, "tuesday": tuesday, "wednesday": wednesday, "thursday": thursday, "friday": friday, "saturday": saturday, "sunday": sunday};

    res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(output));
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

})



// To start server
// nohup node index.js > output.log &
// http://stackoverflow.com/questions/9831594/apache-and-node-js-on-the-same-server

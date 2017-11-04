// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Tables with people eating
// =============================================================
var currentTables = [
  {
   customerName: "Teera",
   customerPhone: "415-555-5555",
   customerEmail: "a@c.com",
   uniqueId: 123
  },
  {
   customerName: "Karina",
   customerPhone: "415-555-5555",
   customerEmail: "a@c.com",
   uniqueId: 124
  },
  {
   customerName: "Chauncey",
   customerPhone: "415-555-5555",
   customerEmail: "a@c.com",
   uniqueId: 125
  }
];

// Waitlist for tables 
//=============================================================

var waitlist = [
  {
   customerName: "Ashley",
   customerPhone: "415-555-5555",
   customerEmail: "a@c.com",
   uniqueId: 126
  },
  {
   customerName: "Ashley",
   customerPhone: "415-555-5555",
   customerEmail: "a@c.com",
   uniqueId: 127
  },
  {
   customerName: "Ashley",
   customerPhone: "415-555-5555",
   customerEmail: "a@c.com",
   uniqueId: 128
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res){
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Get all current tables
app.get("/all", function(req, res) {
  res.json(currentTables);
});

// Search for all tables - provides JSON
app.get("/api/currentTables/:currentTables?", function(req, res) {
  var chosen = req.params.currentTables;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < currentTables.length; i++) {
      if (chosen === currentTables[i].routeName) {
        return res.json(currentTables[i]);
      }
    }
    return res.json(false);
  }
  return res.json(currentTables);
});

// Search for waitlist tables - provides JSON
app.get("/api/waitlist/:waitlist?", function(req, res) {
  var chosen = req.params.waitlist;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < waitlist.length; i++) {
      if (chosen === currentTables[i].routeName) {
        return res.json(currentTables[i]);
      }
    }
    return res.json(false);
  }
  return res.json(waitlist);
});

// Create New Waitlist - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newWaitlist = req.body;
  newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();

  console.log(newWaitlist);

  waitlist.push(newWaitlist);

  res.json(newWaitlist);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  //console.log(currentTables);
  //console.log(waitlist);
});

//convert the html form data to json (we may not need to? not sure)
//===============================================================


//button functions
//================================================================

// function displayCurrentTables(){

// }

// function displayWaitlist(){

//  // Here we get the location of the root page.
// // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
//   var currentURL = window.location.origin;

//   // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
//   $.ajax({url: currentURL + "/api/waitlist", method: "GET"})
//       .done(function(waitlistData) {

//           // Here we are logging the URL so we have access to it for troubleshooting
//           console.log("------------------------------------");
//           console.log("URL: " + currentURL + "/api/waitlist");
//           console.log("------------------------------------");

//           // Here we then log the NYTData to console, where it will show up as an object.
//           console.log(waitlistData);
//           console.log("------------------------------------")

//           // Loop through and display each of the customers
//           for (var i=0; i<waitlistData.length; i++){

//               // Create the HTML Well (Section) and Add the table content for each reserved table
//               var waitlistSection = $("<div>");
//               waitlistSection.addClass('well');
//               waitlistSection.attr('id', 'waitlistWell-' + i+1)
//               $('#waitlistSection').append(waitlistSection);

//               var tableNumber = i + 1;

//               // Then display the remaining fields in the HTML (Section Name, Date, URL)
//               $("#waitlistWell-"+ i+1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + waitlistData[i].customerID + "</h2>");
//           }
//       });

// }

// function clearTables(){
//   var currentURL = window.location.origin;
//   $.ajax({url: currentURL + "/api/clear", method: "POST"})
// }

// $("#clear").on('click', function(){
//   alert("Clearing tables...");
//   clearTable();

//   // Refresh the page after data is cleared
//   location.reload();
// })


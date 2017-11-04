// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3001;

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

// // Create New Waitlist - takes in JSON input
// app.post("/api/new", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body-parser middleware
//   var newWaitlist = req.body;
//   newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newWaitlist);

//   waitlist.push(newWaitlist);

//   res.json(newWaitlist);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  //console.log(currentTables);
  //console.log(waitlist);
});

app.post('/api/currentTables', function(req, res){
  if(table.length < 5){
    table.push(req.body);
    res.json(true)
  }
  else{
    waitlist.push(req.body);
    res.json(false)
  }
})





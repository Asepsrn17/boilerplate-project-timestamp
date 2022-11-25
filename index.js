// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", (req, res) => {
  if(req.params.date) {
    if(/^\d+$/.test(req.params.date)) {
      date = new Date(+req.params.date)
    } else {
      date = new Date(req.params.date)
    } if (date.toUTCString() == "Invalid Date") {
      res.json({
        error: date.toUTCString()
      })
    } else {
      res.json({
        "unix": date.getTime(),
        "utc": date.toUTCString(),
      })
    }
  } else {
    res.json({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port http://localhost:' + listener.address().port);
});

function scrapeForPlayerNames(){

  console.log("started running scrapeForPlayerNames");

  /*var express = require('express');
  var fs = require('fs');
  var request = require('request');
  var cheerio = require('cheerio');
  var app = express();

  app.get('/scrape', function(req, res){


  var url = 'http://www.nbadraft.net/ranking/bigboard';
  console.log("right before the request");
    request(url, function(error, response, html){
      
      if(!error) {
        console.log("error free request");
        var $ = cheerio.load(html);
        var fullname, firstname, lastname, age, position, height, weight, coll;

        var playerList = [];
        var currLocation;

        $('.table').filter(function() {

          var data = $(this);
          currLocation = data;
          currLocation = currLocation.first();
          currLocation = currLocation.next();


          //for (var i = 0; i < 20; i++) {
            playerList.push({
              firstname : "", 
              lastname: "", 
              age: "", 
              position: "", 
              height: "", 
              weight: "", 
              coll: ""
            });
            var currColumn = currLocation.children().first().next().next();

            fullname = currColumn.text();

            var spaceIndex = fullname.indexOf(" ");
            var length = fullname.length;

            if (spaceIndex > 0) {
              firstname = substring(0, spaceIndex - 1);
              lastname = substring(spaceIndex + 1, length);
              console.log("successfully substring-ed the full name");

            } else {
              alert("Error while parsing string in scrapeForPlayerNames in server.js");
              return;
            }

            arr[0].firstname = firstname;  //Replace these with i
            arr[0].lastname = lastname;

            alert("The first scraped name is " + firstname + " " + lastname);


            //currLocation = currLocation.next();
          //}



        })
        






      }
      
    var file = fs.createWriteStream('test.txt');

    for(var i = 0; i < playerList.length; i++) {
      file.write(JSON.stringify(playerList[i], null, 4));
    }

    file.end();


    res.send('check your console!');

    }) //;


  })

  app.listen('8081')

  console.log('Magic happens on port 8081');

  exports = module.exports = app;*/


}
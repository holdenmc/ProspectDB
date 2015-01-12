var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var url = require('url');
var Scraper = require("image-scraper");


var playerList = [];
console.log("Entered server.js");

http.createServer(function(req, response){
  var path = url.parse(req.url).pathname;
  if(path == "/tableScrape"){
    console.log("request received for TableScrape");
    tableurl = 'http://www.nbadraft.net/ranking/bigboard';
    request(tableurl, function(err, resp, body) {
        //console.log("Made it into the Request");
        if (err) {
            throw err;
        }
        
        $ = cheerio.load(body);
        var fullname, firstname, lastname, age, position, height, weight, coll, year;
        var currLocation, spaceIndex, length;
        

        //console.log("Made it right before actual scraping");

        $('table tr').each(function(index, value) {
          if (index == 0) {

          } else {
            currLocation = $(this).children().first().next().next();
            fullname = currLocation.text();
            height = currLocation.next().text();
            weight = currLocation.next().next().text();
            position = currLocation.next().next().next().text();
            coll = currLocation.next().next().next().next().text();
            year = currLocation.next().next().next().next().next().text();

            

            spaceIndex = fullname.indexOf(" ");
            length = fullname.length;

            if (spaceIndex > 0) {
              firstname = fullname.substring(0, spaceIndex);
              lastname = fullname.substring(spaceIndex + 1, length);
              //console.log("successfully substring-ed the full name");

            } else {
              console.log("Error while parsing string in scrapeForPlayerNames in server.js");
              return;
            }

            playerList.push({
              first: firstname, 
              last: lastname, 
              yr: year, 
              pos: position, 
              h: height, 
              w: weight, 
              col: coll
            });

            /*console.log("Pushed in " + firstname + " " + lastname + " who is " + height + " " + 
              weight + " and plays " + position + " at " + coll + " in his " + year + " year");*/
            //console.log(playerList[index - 1].first);


          }

          


          });
        //File used for debugging
        var file = fs.createWriteStream('playersTable.txt');
        var output = "";

        //file.write("testing");
        for (var i = 0; i < 100; i++) {
          file.write(playerList[i].first + "," + playerList[i].last + "," + playerList[i].h + 
            "," + playerList[i].w + "," + playerList[i].pos + "," + playerList[i].col + "," + 
            playerList[i].yr + "\n");

          output += (playerList[i].first + "," + playerList[i].last + "," + playerList[i].h + 
            "," + playerList[i].w + "," + playerList[i].pos + "," + playerList[i].col + "," + 
            playerList[i].yr + "\n");
        }

        file.end();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end(output);


    });
    

  }
  if (path == "/twitterScrape") {
    console.log("request received for twitterScrape");

  }

  if (path == "/photoScrape") {
    console.log("request received for photoScrape");
    var baseURL = "https://www.google.com/search?hl=en&authuser=0&site=imghp&tbm=isch&source=hp&biw=1280&bih=679&q=";

    var scraper = new Scraper(baseURL);
    

    var spaceIndex = req.url.indexOf("%");
    var startIndex = req.url.indexOf("=");
    var firstname = req.url.substring(startIndex + 1, spaceIndex);
    var length = req.url.length;
    var lastname = req.url.substring(spaceIndex + 3, length);
    //console.log("Name is " + firstname + " " + lastname);

    baseURL += firstname + "+" + lastname + "+" + "draft";
    console.log(baseURL);

    scraper.address = baseURL;

    var i = 0;
    var imageURL;

    scraper.on("image", function(image) {
      if (i == 4) {
        //Executes this just for the first image on the page
        imageURL = image.address;
      }
      i++;
    });

    console.log(imageURL);

    /*request(baseURL, function(err, resp, body) {

      if (err) {
            throw err;
      }


        
      $ = cheerio.load(body);
      var photoURL = $('#rg_s, .rg_di, a').attr('href');
      console.log(photoURL);




      response.setHeader("Access-Control-Allow-Origin", "*");
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end("testing");


    });*/

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("testing");




    

  }



}).listen(8001);
console.log("server initialized");



//For some reason playerList isn't populated out here...







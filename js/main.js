var name; // Name holds current name, 
var tableString; // Holds the whole string of the table info
var currPlayerIndex; // Holds the index of the current player
var college; //Holds college

//Returns a boolean: true if the player is in the database
function checkForPlayerInDatabase() {
  var playerList = tableString.split("\n");
  for (var i = 0; i < 100; i++) {
    var attributes = playerList[i].split(",");
    if (attributes[0] + " " + attributes[1] == name) {

      currPlayerIndex = i;
      college = attributes[5];
      //console.log(college);
      return true;
    }
  }
  
  return false;
}

//Takes the form input and loads playerpage
function getPlayerPage() {
  
  name = document.getElementById('playername').value;
  document.getElementById('playername').value = "";
  //alert("You typed " + name);

  if (checkForPlayerInDatabase()) {
    alert(name + " is in database.");
    parent.location = "./playerpage.html";
  } else {
    alert(name + " wasn't in database, try again please!");
  }

  
}

//Populates the elements of the player profile
function populatePlayerProfile() {
  //alert("You called populatePlayerProfile");

  $('h1').text(name);
  var playerList = tableString.split("\n");
  var attributes = playerList[currPlayerIndex].split(",");
  college = attributes[5];
  var profilebox = $('.profile-box').children().first().next();
  profilebox.text("Height: " + attributes[2]);
  profilebox.next().text("Weight: " + attributes[3]);
  profilebox.next().next().text("Position: " + attributes[4]);
  profilebox.next().next().next().text("College/Country: " + attributes[5]);
  profilebox.next().next().next().next().text("Year: " + attributes[6]);
  $(".headline-box").height($(".profile-box").height());
  $(".video-box").height($(".profile-box").height());

}
//Adds the photo and resizes it
function addPlayerPhoto(photoURL, height, width) {
  $('.profile-box .profile-top img').attr("src", photoURL);
  var aspectRatio = 250/width;
  $('.profile-box .profile-top img').attr("height", aspectRatio*height);
  $('.profile-box .profile-top img').attr("width", aspectRatio*width);

}

//Loads the players page from the table click
function getPlayerPageFromTable(firstname, lastname) {
  name = firstname + " " + lastname;
  //alert("You clicked on " + name);
  if (checkForPlayerInDatabase()){
    console.log("getPlayerPageFromTable says player in directory");
    parent.location = "./playerpage.html";
  } else {
    console.log("getPlayerPageFromTable says player NOT in directory");
  }//Used to set the currPlayerIndex

  
}

//Takes the scraped input and fills the table on the main page
function populatePlayerIndex() {
  var firstname, lastname, year, position, height, weight, college;
  //console.log("Ran populatePlayerIndex");
  playerList = tableString.split("\n");
  var currRow, currElem;

  currRow = $('tbody tr');

  for (var i = 0; i < 100; i++) {
    var attributes = playerList[i].split(",");

    //currElem now holds the first element of the row
    currElem = currRow.children().first();

    currElem.text(attributes[0]);
    currElem = currElem.next();
    currElem.text(attributes[1]);
    currElem = currElem.next();
    currElem.text(attributes[6]);
    currElem = currElem.next();
    currElem.text(attributes[4]);
    currElem = currElem.next();
    currElem.text(attributes[2]);
    currElem = currElem.next();
    currElem.text(attributes[3]);
    currElem = currElem.next();
    currElem.text(attributes[5]);

    currRow = currRow.next();

  }

}
//Scrapes the table
function accessTableScraper() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","http://localhost:8001/tableScrape", true);
  xmlhttp.onreadystatechange = function(){
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
           tableString = xmlhttp.responseText;
           playerList = tableString.split("\n");
           populatePlayerIndex();
           
         }
   }
  xmlhttp.send();
  
}
//Scrapes the internet to fill the player database info
function profileScrape() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://localhost:8001/tableScrape", true);
  xmlhttp.onreadystatechange = function(){
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
           tableString = xmlhttp.responseText;
           playerList = tableString.split("\n");
           checkForPlayerInDatabase();
           populatePlayerProfile();
              
           
         }
   }
  xmlhttp.send();
}

/*function photoScrape() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:8001/photoScrape?name=" + name;
  xmlhttp.open("GET", url, true);
  xmlhttp.onreadystatechange = function(){
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
           var photoURL = xmlhttp.responseText;
           //alert(photoURL);
           addPlayerPhoto(photoURL);
           
         }
   }
  xmlhttp.send();

}*/

/*function accessPlayerPageScraper() {
  
  //Calls helper that populates the profile box
  profileScrape();
  //Calls helper that loads a photo
  //photoScrape();
  

  //console.log(college);


}*/

function getName() {
  return name;
}
function getCollege() {
  return college;
}




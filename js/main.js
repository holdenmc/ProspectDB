function getPlayerPage() {
  var name = document.getElementById('playername').value;
  document.getElementById('playername').value = "";
  alert("You typed " + name);
  parent.location = "./playerpage.html";
  //populatePlayerPage(name);
}

function populatePlayerPage(name) {
  alert("You called populatePlayerPage");
  //Needs to populate the elements of playerpage.html



}


function getPlayerPageFromTable(firstname, lastname) {
  var name = firstname + " " + lastname;
  alert("You clicked on " + name);

  parent.location = "./playerpage.html";
  populatePlayerPage(name);
}


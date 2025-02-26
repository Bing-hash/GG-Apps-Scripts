// Author:    Nathan Dallmann
// Purpose:   Cross referencing between two spreadsheets to see if a player signed their waiver is time consuming. This
//            script aims to make this process easier, by condensing all needed information into 1 spreadsheet. This is 
//            accomplished by highlighting the cell containing the "Team Name", to indicate to the reader that the 
//            entire team has signed the waiver.


function main2() {
  // Load the spreadsheet into a Class Sheet object.
  teamSheet = loadSheet("19lNfVPuSyLDvQigUjcoaVwd1KRjiibCKZNqMh8ijTlU");
  Logger.log("Teamsheet loaded: ");

  // Creates a range of the columns containing all "Player # Name"s.
  var range = teamSheet.getRange(2, 12, teamSheet.getLastRow(), 5);
  // Creates a 2D array; each array consisting of hex color values 
  // of the cells specified by the range.
  var backgroundColor = range.getBackgrounds();

  Logger.log(backgroundColor);

  // Iterates through the rows of the sheet.
  for(var i = 0; i < backgroundColor.length; i++){
    var count = 0;
    //Iterates through the columns specified by the range.
    for(var j = 0; j < 5; j++){
      // If the given cell background color is #008000 (or green),
      // add to the temporary count variable.
      if(backgroundColor[i][j] == '#008000'){
        count ++;
      }
    }

    // If all 5 cells in the array are green, the cell containing
    // the "Team Name" is colored in, indicating that all players
    // signed the waiver.
    if(count == 5){
      teamSheet.getRange(i+2, 11).setBackground("green");
    }
  }
}

function loadSheet(id) {
  var ss = SpreadsheetApp.openById(id);
  return ss.getSheetByName("Form Responses 1");
}

// Author:   Nathan Dallmann
// Purpose:  Cross referencing between two spreadsheets to see if a player signed their waiver is time consuming. This
//           script aims to make this process easier, by condensing all needed information into 1 spreadsheet. This is
//           done by highlighting player names that have signed the waiver, and team names with players that have all
//           signed the waiver. 


function main1() {
  // Loads the spreadsheets containing team and player registration.
  teamSheet = loadSheet("19lNfVPuSyLDvQigUjcoaVwd1KRjiibCKZNqMh8ijTlU");
  Logger.log("Teamsheet loaded: ");
  teamSheetLastRow = teamSheet.getLastRow();
  // The information that we will be checking has been put into array variables. This is done for efficiency, and
  // is required for this script to run successfully. Google Apps Script has a time limit, and Class Sheet functions
  // are time consuming. So much so - that if they are used exclusively for a script like this - the script will
  // fail to complete in the time limit allotted to scripts. Array operations are less time consuming, and thus are
  // required in this use case.

  // 2D array is created from the player's registration spreadsheet. Each array in the array contains the player's 
  // "Team Name" and "Player Name". "Team name" is added to make the registration search process more efficient:
  // instead of having to check a "Player Name" against every "Player # Name" listed in a team, the "Team Name" 
  // can be checked first. If the "Team Name" matches, we can check the "Player Name" against each "Player # Name".
  var players = loadPlayers();
  Logger.log("Players loaded: ");
  // A 2D array is created from the coaches registration. Each array in the array contains the "Team Name", and 5
  // "Player # Names", containing each player's name. Whitespace is trimmed from each cell, to eliminate issues in
  // string comparison later in the script.
  var info = teamSheet.getRange(2, 11, teamSheetLastRow, 6).trimWhitespace().getValues();

  for(var i = 0; i < players.length; i++) {
    checkPlayerRegistered(players[i], info, teamSheet, teamSheetLastRow);
  }

}

function loadPlayers() {
  var ss = SpreadsheetApp.openById("1mJkctVXZhPKXbLt0C9NiiLBVgNvD3BDfxtwytKt2Vp0");
  var sheet = ss.getSheetByName("Form Responses 1");
  return sheet.getRange(2, 3, sheet.getLastRow(), 2).trimWhitespace().getValues();  
}

function loadSheet(id) {
  var ss = SpreadsheetApp.openById(id);
  return ss.getSheetByName("Form Responses 1");
}

// Check each player's name in the player registration to the names listed in the coaches registration. If true,
// this means the player has signed the waiver, and we will mark the cell.
function checkPlayerRegistered(player, info, teamSheet, lastRow){
  Logger.log("Checking: "+player[1]);
  // Iterate through the list of teams. Despite lastRow representing the last column in the spreadsheet, "lastRow-1"
  // is used instead. This is because .getRange().getValues() seems to add an extra array full of empty strings. Not 
  // sure why. This doesn't break anything, but the lastRow is altered to prevent an empty row at the end from being 
  // colored green.
  for(var i = 0; i < lastRow-1; i++) {
    // Check the player's "Team Name" against each team's "Team Name".
    if(player[0] == info[i][0]){
      // Iterate through all of the "Player # Name" strings. 
      for(var j = 0; j < 5; j++){
        // Check the player's "Player Name" against the current "Player # Name".
        if(player[1] == info[i][1+j]){
          // Color the cell in the coach registration spreadsheet corresponding to the player's name.
          Logger.log("Verified: "+player[1]);
          teamSheet.getRange(i+2, 12+j).setBackground("green");
        }
      }
    }
  }
}

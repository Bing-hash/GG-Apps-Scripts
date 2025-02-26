// This function queries each element in a form for their title and ID.
// We need the Team Name and Player Name IDs to add the names to their 
// respective dropdowns in the form.
function myFunction() {
  var form = FormApp.openById("1eIVA0pLzpW32-uNrjt4qaePwZnJrS9C6eBpsJwHtTRE");
  var items = form.getItems();
  for (var i in items) { 
    Logger.log(items[i].getTitle() + ': ' + items[i].getId());
  }
}

var guestCount = 2;
var tableIteration = 1;

/**
 * Creates a new row using the template within #bridalForm
 */
function addBridalRow(){
    var template = document.getElementsByClassName("bridalRowTemplate")[0];
    var copy = template.content.cloneNode(true);
    var formSection = document.getElementById("bridalForm");
    formSection.appendChild(copy);
    increaseGuestCount();
}

/**
 * Creates a new table within #genericTableContainer
 */
function addTable(){
    //Create new table from HTML template
    var table = document.getElementsByClassName("tableTemplate")[0];
    var newTable = table.content.cloneNode(true);

    //Set table title dynamically 
    var newTableTitle = newTable.querySelector(".genericTableTitle");
    newTableTitle.innerText = `Table ${tableIteration}`;
    tableIteration++;

    //Add new table to table container
    var tableContainer = document.getElementById("genericTableContainer");
    tableContainer.appendChild(newTable);
    increaseGuestCount();
}

/**
 * Creates new input field within generic table
 * @param {HTMLElement} tableForm 
 */
function addRow(tableForm){
    var row = tableForm.getElementsByClassName("tableRowTemplate")[0];
    var newRow = row.content.cloneNode(true);
    var rowContainer = tableForm.getElementsByClassName("genericTableRowContainer")[0];
    rowContainer.appendChild(newRow);
    increaseGuestCount();
}

/**
 * Removes row and decrements guestCount
 * @param {HTMLElement} element 
 */
function removeRow(element){
    element.parentElement.parentElement.remove();
    decreaseGuestCount();
}

/**
 * Removes table and decrements guestCount by the number of rows contained within
 * @param {HTMLElement} element 
 */
function removeTable(element){
    var tableForm = element.parentElement; //.tableForm

    //Count guests on table to be deleted
    var guestCount = tableForm.getElementsByClassName("guestRow").length;
    decreaseGuestCount(guestCount);

    tableForm.remove();
    tableIteration--;
}

/**
 * Increase guestCount by 1
 */
function increaseGuestCount(){
    guestCount++;
    var gusetCountDisplay = document.getElementById("guestCount");
    gusetCountDisplay.innerText = guestCount.toString();
}

/**
 * Decrease guestCount when removing a row or table of rows
 * @param {number} rowCount Default is 1; specify count for tables
 */
function decreaseGuestCount(rowCount = 1){
    if (rowCount === 1){
        guestCount--;
    } else guestCount -= rowCount;

    var gusetCountDisplay = document.getElementById("guestCount");
    gusetCountDisplay.innerText = guestCount.toString();
}
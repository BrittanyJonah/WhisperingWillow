var tableIteration = 1;

/**
 * Creates a new table within #bridalForm
 */
function addBridalRow(){
    var temp = document.getElementsByClassName("bridalTemplate")[0];
    var clon = temp.content.cloneNode(true);
    var formSection = document.getElementById("bridalForm");
    formSection.appendChild(clon);
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
}

/**
 * Creates new input field within a table
 * @param {Container of the current table} tableForm 
 */
function addRow(tableForm){
    var row = tableForm.getElementsByClassName("tableRowTemplate")[0];
    var newRow = row.content.cloneNode(true);
    var rowContainer = tableForm.getElementsByClassName("genericTableRowContainer")[0];
    rowContainer.appendChild(newRow);
}

function removeRow(element){
    element.parentElement.parentElement.remove();
}

function removeTable(element){
    element.parentElement.remove();
    tableIteration--;
}
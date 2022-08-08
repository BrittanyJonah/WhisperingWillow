let guestCount = 2;
let tableIteration = 1;

/**
 * Creates a new row using the template within #bridalForm
 */
function addBridalRow(){
    let template = document.getElementsByClassName("bridalRowTemplate")[0];
    let copy = template.content.cloneNode(true);
    let formSection = document.getElementById("bridalForm");
    formSection.appendChild(copy);
    increaseGuestCount();
}

/**
 * Creates a new table within #genericTableContainer
 */
function addTable(){
    //Create new table from HTML template
    let table = document.getElementsByClassName("tableTemplate")[0];
    let newTable = table.content.cloneNode(true);

    //Set table title dynamically 
    let newTableTitle = newTable.querySelector(".genericTableTitle");
    newTableTitle.innerText = `Table ${tableIteration}`;
    tableIteration++;

    //Add new table to table container
    let tableContainer = document.getElementById("genericTableContainer");
    tableContainer.appendChild(newTable);
    increaseGuestCount();
}

/**
 * Creates new input field within generic table
 * @param {HTMLElement} tableForm 
 */
function addRow(tableForm){
    let row = tableForm.getElementsByClassName("tableRowTemplate")[0];
    let newRow = row.content.cloneNode(true);
    let rowContainer = tableForm.getElementsByClassName("genericTableRowContainer")[0];
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
    let tableForm = element.parentElement; //.tableForm

    //Count guests on table to be deleted
    let guestCount = tableForm.getElementsByClassName("guestRow").length;
    decreaseGuestCount(guestCount);

    tableForm.remove();
    tableIteration--;
}

/**
 * Increase guestCount by 1
 */
function increaseGuestCount(){
    guestCount++;
    let gusetCountDisplay = document.getElementById("guestCount");
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

    let gusetCountDisplay = document.getElementById("guestCount");
    gusetCountDisplay.innerText = guestCount.toString();
}

/**
 * Creates a new PDF file using the given input
 */
function submitPDF(){
    const doc = new jsPDF();

    // Image not working
    // let pdfImage = "../img/logo-lg.jpg";
    // doc.addImage("../img/logo-lg.jpg", "JPEG", 0, 0, 200, 50);

    let entries = document.getElementsByTagName("input");

    for (let index = 0; index < entries.length; index++) {
        doc.text(entries[index].id.toString(), 10, index*10);
        doc.text(entries[index].value.toString(), 100, index*10);
    }

    doc.save("WW-SeatingPlan.pdf");
}
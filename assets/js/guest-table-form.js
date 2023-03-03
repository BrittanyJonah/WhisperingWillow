let tableIteration = 1;
let genericRowIteration = 0;
let guestCount = 0;

callLocalStorage();
console.log({ ...localStorage });

/**
 * Queries the DOM for current input fields, assigns event listeners to set changes after losing focus
 * and then retrives all values currently held in localStorage
 */
function callLocalStorage(){
    let inputList = getInputs(document);

    inputList.forEach(element => {
        element.addEventListener("blur", function(event) {
            localStorage.setItem(element.id, element.value);
        });

        document.getElementById(element.id).value = localStorage.getItem(element.id);
    });
}

/**
 * scans the given element for all fields beginning with ID "input-"
 * @param {HTMLElement} element The element to scan
 * @returns The resulting NodeList
 */
function getInputs(element, searchString = '[id^="input-"]'){
    return element.querySelectorAll(searchString);
}

/**
 * 
 * @param {HTMLElement} element The parent element for which to count rows within
 * @param {string} classNames The named class(es) of the rows within the parent element ('.classOne, .classTwo')
 */
function getTotalRows(element, classNames){
    rowCount = element.querySelectorAll(classNames);
    return rowCount.length;
}

/**
 * Creates a new row for the given row template and element selection 
 * @param {string} rowTemplateClassName The name of the template 
 * @param {HTMLElement} containerElement The parent element to append the new row to
 */
function createRowFromTemplate(rowTemplateClassName, containerElement){
    let template = document.getElementsByClassName(rowTemplateClassName)[0];
    let copy = template.content.cloneNode(true);
    containerElement.appendChild(copy);
    increaseGuestCount();
}

/**
 * Creates a new row using the template within #spouseForm
 */
function addBrideRow(){
    let formSection = document.getElementById("spouseForm");
    if (getTotalRows(formSection, '.templatedRow') < 2)
    {
        createRowFromTemplate("brideRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Guest limit exceeded.");
}

/**
 * Creates a new row using the template within #spouseForm
 */
function addGroomRow(){
    let formSection = document.getElementById("spouseForm");
    if (getTotalRows(formSection, '.templatedRow') < 2)
    {
        createRowFromTemplate("groomRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Guest limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addMaidOfHonorRow(){
    let formSection = document.getElementById("bridalForm");
    if (getTotalRows(formSection, '.templatedMaidOfHonorRow') < 1)
    {
        createRowFromTemplate("maidOfHonorRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Guest limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addBridesmaidRow(){
    let formSection = document.getElementById("bridalForm");
    if (getTotalRows(formSection, '.templatedBridesmaidRow') < 6)
    {
        createRowFromTemplate("bridesmaidRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Guest limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addBestManRow(){
    let formSection = document.getElementById("bridalForm");
    if (getTotalRows(formSection, '.templatedBestManRow') < 1)
    {
        createRowFromTemplate("bestManRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Guest limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addGroomsmanRow(){
    let formSection = document.getElementById("bridalForm");
    if (getTotalRows(formSection, '.templatedGroomsmanRow') < 6)
    {
        createRowFromTemplate("groomsmanRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Guest limit exceeded.");
}

function addTable(){
    //Create new table from HTML template
    let table = document.getElementsByClassName("tableTemplate")[0];
    let newTable = table.content.cloneNode(true);

    //Adjust table ID to match current iteration of tables
    table = getInputs(newTable, '[id^="generic-table-"]')
    table.forEach(table => {
        table.id = table.id.slice(0, -1) + tableIteration.toString();
    });

    //Adjust input IDs based on current table iteration
    newTableInputs = getInputs(newTable);
    newTableInputs.forEach(input => {
        input.id = input.id.slice(0, -1) + tableIteration.toString();
    });

    //Set table title dynamically 
    let newTableTitle = newTable.querySelector(".genericTableTitle");
    newTableTitle.innerText = `Table ${tableIteration}`;
    tableIteration++;

    //Add new table to table container
    let tableContainer = document.getElementById("genericTableContainer");
    tableContainer.appendChild(newTable);
    increaseGuestCount();
    callLocalStorage();
}

/**
 * Creates new input field within generic table
 * @param {HTMLElement} tableForm The container element 
 */
function addRow(tableForm){
    //Create new row from HTML template
    let row = tableForm.getElementsByClassName("tableRowTemplate")[0];
    let newRow = row.content.cloneNode(true);
    let rowContainer = tableForm.getElementsByClassName("genericTableRowContainer")[0];
    rowContainer.appendChild(newRow);

    //substring(20, 21)
    //Adjust table number for generic rows
    let tableNumber = tableForm.id.slice(-1)
    let genericTableRows = getInputs(rowContainer, '[id^="input-generic-"]');
    genericTableRows.forEach(row => {
        row.id = row.id.replace("table-1", `table-${tableNumber}`);
    })

    let genericTableRowContainers = getInputs(rowContainer, '[id^="generic-table"]');
    genericTableRowContainers.forEach(row => {
        row.id = row.id.replace("table-1", `table-${tableNumber}`);
    })

    //Sets local storage item to track the row number of the current table
    let tableRows = getInputs(rowContainer);
    console.log(tableRows);
    let tableRowCount = getInputs(rowContainer, '[id^="generic-table-"]').length;
    localStorage.setItem(`Table${tableNumber}RowCount`, tableRowCount.toString());
    console.log(localStorage.getItem(`Table${tableNumber}RowCount`));

    //Adjust input IDs based on current row iteration
    let iteration = 0;
    let rowId = 1;
    tableRows.forEach(row => {
        row.id = row.id.slice(0, -1) + rowId.toString();
        iteration++;
        //Increase ID count every 3 iterations
        if (iteration % 2 === 0){
            rowId++;
        }
    });
    tableNumber++;

    genericRowIteration++
    increaseGuestCount();
    callLocalStorage();
}

/**
 * Removes row and decrements guestCount
 * @param {HTMLElement} element 
 */
function removeRow(element){
    //Shift input IDs to account for lost row
    let rowCount = 1;
    let genericRows = getInputs(document, '[id^="input-generic-guest-"]');
    genericRows.forEach(row => {
        row.id = row.id.slice(0, -1) + rowCount.toString();
    });

    element.parentElement.parentElement.remove();
    decreaseGuestCount();
    callLocalStorage();
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

    //Rename remaining tables to retain consistency
    let tableCount = 1;
    let tablesTitles = document.querySelectorAll('.genericTableTitle');
    tablesTitles.forEach(title => {
        title.innerHTML = `Table ${tableCount}`;
        tableCount++;
    });

    //Adjust input IDs based on current table iteration
    tableCount = 1;
    let tables = document.querySelectorAll('[id^="generic-table-"]');
    tables.forEach(table => {
        tableInputs = getInputs(table);
        tableInputs.forEach(input => {
            input.id = input.id.slice(0, -1) + tableCount.toString();
        });
        tableCount++;
    });

    callLocalStorage();
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

    let inputList = getInputs(document);

    verticleSpace = 10;
    for (let index = 0; index < inputList.length; index++) {
        verticleSpace += 10;

        //Remove hyphens, "input", and capitalize first letter for displayer of inputs
        let formattedDescription = inputList[index].id.replaceAll('-', ' ').toString();
        formattedDescription = formattedDescription.replace('input ', '');
        formattedDescription = formattedDescription.replace('generic ', '');
        formattedDescription = formattedDescription.charAt(0).toUpperCase() + formattedDescription.slice(1);

        console.log(inputList[index]);
        doc.text(formattedDescription, 10, verticleSpace);
        doc.text(inputList[index].value.toString(), 100, verticleSpace);

        if (index % 26 === 0 && index !== 0){
            doc.addPage();
            verticleSpace = 10;
        }
    }

    doc.save("WW-SeatingPlan.pdf");
}
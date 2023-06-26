let packageNames = ["Sunset Ceremony", "Balmroom Barn Soirée", "Elite Wedding Experience"];

let tableIteration = 1;
let genericRowIteration = 0;
let guestCount = 0;

callLocalStorage();

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
 * Propts the user to clear all input fields and remove local storage items
 */
function clearLocalStorage(){
    let confirmText = "Clear saved data?\n\nWARNING! This action cannot be undone.";
    if (confirm(confirmText) == true) {
        localStorage.clear();

        let inputElements = document.getElementsByTagName("input");
        for(i = 0; i < inputElements.length; i++){
            inputElements[i].value = "";
        }
    }
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
    let rowCount = element.querySelectorAll(classNames);
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
 * Iterates over the given input list updating the row number
 * @param {*} inputList List of inputs to update
 * @param {*} slicePosition When split using '-', index in the array to update ("input-example-1" would be value 2)
 * @param {*} newRowInputCount How many inputs before generating new row (default 2) 
 */
function generateRowNumbers(inputList, slicePosition, newRowInputCount = 2){
    let iteration = 0;
    let rowId = 1;
    inputList.forEach(row => {
        let trailingNumber = row.id.split('-')[slicePosition]
        let sliceIndex = trailingNumber.toString().length;
        row.id = row.id.slice(0, -sliceIndex) + rowId.toString();
        iteration++;
        //Increase ID count every 3 iterations
        if (iteration % newRowInputCount === 0){
            rowId++;
        }
    });
}

/**
 * Creates a new row using the template within #spouseForm
 */
function addBrideRow(){
    let formSection = document.getElementById("spouseForm");
    if (formSection && getTotalRows(formSection, '.templatedRow') < 2)
    {
        createRowFromTemplate("brideRowTemplate", formSection);

        //Adjust input IDs based on current row iteration
        let bridalRows = getInputs(formSection, '[id^="input-bride-"]');
        generateRowNumbers(bridalRows, 3); //"input-bride-meal-1"

        callLocalStorage();
    }
    else window.alert("Spouse limit exceeded.");
}

/**
 * Creates a new row using the template within #spouseForm
 */
function addGroomRow(){
    let formSection = document.getElementById("spouseForm");
    if (formSection && getTotalRows(formSection, '.templatedRow') < 2)
    {
        createRowFromTemplate("groomRowTemplate", formSection);
        
        //Adjust input IDs based on current row iteration
        let bridalRows = getInputs(formSection, '[id^="input-groom-"]');
        generateRowNumbers(bridalRows, 3); //"input-groom-meal-1"
        
        callLocalStorage();
    }
    else window.alert("Spouse limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addMaidOfHonorRow(){
    let formSection = document.getElementById("bridalForm");
    if (formSection && getTotalRows(formSection, '.templatedMaidOfHonorRow') < 1)
    {
        createRowFromTemplate("maidOfHonorRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Maid of Honour limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addBestManRow(){
    let formSection = document.getElementById("bridalForm");
    if (formSection && getTotalRows(formSection, '.templatedBestManRow') < 1)
    {
        createRowFromTemplate("bestManRowTemplate", formSection);
        callLocalStorage();
    }
    else window.alert("Best Man limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addBridesmaidRow(){
    let formSection = document.getElementById("bridalForm");
    if (formSection && getTotalRows(formSection, '.templatedBridesmaidRow') < 10)
    {
        createRowFromTemplate("bridesmaidRowTemplate", formSection);

        //Adjust input IDs based on current row iteration
        let bridesmaidRows = getInputs(formSection, '[id^="input-bridesmaid-"]');
        generateRowNumbers(bridesmaidRows, 3); //"input-bridesmaid-meal-1"

        callLocalStorage();
    }
    else window.alert("Bridesmaid limit exceeded.");
}

/**
 * Creates a new row using the template within #bridalForm
 */
function addGroomsmanRow(){
    let formSection = document.getElementById("bridalForm");
    if (formSection && getTotalRows(formSection, '.templatedGroomsmanRow') < 10)
    {
        createRowFromTemplate("groomsmanRowTemplate", formSection);

        //Adjust input IDs based on current row iteration
        let groomsmanRows = getInputs(formSection, '[id^="input-groomsman-"]');
        generateRowNumbers(groomsmanRows, 3); //"input-groomsman-meal-1"

        callLocalStorage();
    }
    else window.alert("Groomsman limit exceeded.");
}

function addTable(){
    //Create new table from HTML template
    let table = document.getElementsByClassName("tableTemplate")[0];
    let newTable = table.content.cloneNode(true);

    //Adjust table ID to match current iteration of tables
    table = getInputs(newTable, '[id^="generic-table-"]');
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

    //Adjust table number for generic rows
    let tableNumber = +tableForm.id.match(/[0-9]+/)[0];
    let genericTableRows = getInputs(rowContainer, '[id^="input-generic-"]');
    genericTableRows.forEach(row => {
        row.id = row.id.replace(/[0-9]+/, tableNumber);
    })

    let genericTableRowContainers = getInputs(rowContainer, '[id^="generic-table"]');
    genericTableRowContainers.forEach(row => {
        row.id = row.id.replace(/[0-9]+/, tableNumber);
    })

    //Sets local storage item to track the row number of the current table
    let tableRows = getInputs(rowContainer);
    let tableRowCount = getInputs(rowContainer, '[id^="generic-table-"]').length;
    localStorage.setItem(`Table${tableNumber}RowCount`, tableRowCount.toString());

    //Adjust input IDs based on current row iteration
    let iteration = 0;
    let rowId = 1;
    tableRows.forEach(row => {
        let trailingNumber = row.id.split('-')[6];
        let sliceIndex = trailingNumber.toString().length;
        row.id = row.id.slice(0, -sliceIndex) + rowId.toString();
        iteration++;
        //Increase ID count every 3 iterations
        if (iteration % 2 === 0){
            rowId++;
        }
    });
    //Adjust row container IDs based on current row iteration
    rowId = 1;
    genericTableRowContainers.forEach(row => {
        let trailingNumber = row.id.split('-')[4];
        let sliceIndex = trailingNumber.toString().length;
        row.id = row.id.slice(0, -sliceIndex) + rowId.toString();
        rowId++;
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

    let confirmText = "Create PDF document now?\n\nPlease ensure you have filled all appropriate fields before proceeding.";
    if (confirm(confirmText) == true) {
        const doc = new jsPDF();
    
        //Gather inputs for different forms
        let spouseInputList = getInputs(document.getElementsByClassName('spouseInputContainer')[0]);
        let detialsInputList = getInputs(document.getElementsByClassName('detailsInputContainer')[0]);
        let musicInputList = getInputs(document.getElementsByClassName('musicInputContainer')[0]);
        let vendorInputList = getInputs(document.getElementsByClassName('vendorsInputContainer')[0]);
        let bridalInputList = getInputs(document.getElementsByClassName('bridalInputContainer')[0]);
        let genericInputList = []; 

        //Gathers inputs for all generic tables and append to genericInputList
        let genericInputContainers = document.getElementsByClassName('genericInputContainer');
        for (let i = 0; i < genericInputContainers.length; i++) {
            let inputsToAppend = getInputs(genericInputContainers[i]);
            inputsToAppend.forEach(input => {
                genericInputList.push(input);
            });
        }

        //Set initial y coordinate
        verticleSpace = 20;

        //Formulate the PDF document using the inputs gathered
        if (spouseInputList.length > 0 ){
            addPdfSection(spouseInputList, doc, "Spouse Information");
        }

        if (detialsInputList.length > 0 ){
            verticleSpace += 35;
            addPdfSection(detialsInputList, doc, "Wedding Details");
        }

        if (musicInputList.length > 0 ){
            verticleSpace += 35;
            addPdfSection(musicInputList, doc, "Music Selection");
            doc.addPage();
            verticleSpace = 20;
        }

        if (vendorInputList.length > 0 ){
            addPdfSection(vendorInputList, doc, "Vendor's List");
            doc.addPage();
            verticleSpace = 20;
        }

        if (bridalInputList.length > 0 ){
            addPdfSection(bridalInputList, doc, "Bridal Information");
            doc.addPage();
            verticleSpace = 20;
        }

        if (genericInputList.length > 0 ){
            addPdfSection(genericInputList, doc, "Guest Table Information");
        }

        //Save the finished document
        doc.save("WW-SeatingPlan.pdf");
    } 
}

/**
 * Parses the given input list of elements to be displayed within the PDF doc
 * @param {NodeListOf<Element>} inputList 
 * @param {jsPDF} pdfDoc 
 * @param {string} title 
 */
function addPdfSection(inputList, pdfDoc, title=""){

    //Set title
    pdfDoc.setFontSize(24);
    pdfDoc.text(title, pdfDoc.internal.pageSize.width/2, verticleSpace, 'center');
    pdfDoc.line(10, verticleSpace+3, pdfDoc.internal.pageSize.width - 10, verticleSpace+3)
    verticleSpace += 10;
    pdfDoc.setFontSize(11);


    //Loop through given inputList to display its fields
    for (let index = 0; index < inputList.length; index++) {
        //Remove hyphens, "input", and capitalize first letter for displaying of inputs
        let formattedDescription = inputList[index].id.replaceAll('-', ' ').toString();
        formattedDescription = formattedDescription.replace('input ', '');
        formattedDescription = formattedDescription.replace('generic ', '');
        formattedDescription = formattedDescription.replace('vendor ', '');
        formattedDescription = formattedDescription.replace('vendor ', '');
        formattedDescription = formattedDescription.charAt(0).toUpperCase() + formattedDescription.slice(1);
        //Remove number at end if present
        let lastChar = formattedDescription.slice(-1)
        if (!isNaN(lastChar)){
            formattedDescription = formattedDescription.slice(0, -1);
        }

        //Sets the font to bold and adds line to mark each new generic table
        if (formattedDescription.includes("Table details")){
            pdfDoc.setFontType("bold");
            pdfDoc.line(10, verticleSpace+3, pdfDoc.internal.pageSize.width - 40, verticleSpace+3)
        }
        //Display guest meals on the same line as guest names
        if (formattedDescription.includes("meal") || formattedDescription.includes("vendor")){
            pdfDoc.text(formattedDescription, 110, verticleSpace - 10);
            pdfDoc.text(inputList[index].value.toString(), 150, verticleSpace - 10);
        }
        //Display guest meals on the same line as guest names
        else if (formattedDescription.includes("email") || formattedDescription.includes("vendor")){
            pdfDoc.text(formattedDescription, 110, verticleSpace - 10);
            pdfDoc.text(inputList[index].value.toString(), 150, verticleSpace - 10);
        }
        else {
            pdfDoc.text(formattedDescription, 10, verticleSpace);
            pdfDoc.text(inputList[index].value.toString(), 55, verticleSpace);
            verticleSpace += 10;
        }
        pdfDoc.setFontType("normal");

        //New page when too many inputs to fit (disabled when next item is a meal)
        if (verticleSpace > 280 && !inputList[index+1].id.includes("meal")){
            pdfDoc.addPage();
            verticleSpace = 20;
        }
    }    
    
}
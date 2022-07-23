function addBridalRow(){
    var temp = document.getElementsByClassName("bridalTemplate")[0];
    var clon = temp.content.cloneNode(true);
    var formSection = document.getElementById("bridalForm");
    formSection.appendChild(clon);
}

function addTable(){
    var table = document.getElementsByClassName("tableTemplate")[0];
    var newTable = table.content.cloneNode(true);
    var tableContainer = document.getElementById("genericTableContainer");
    tableContainer.appendChild(newTable);
}

function addRow(tableForm){
    var row = tableForm.getElementsByClassName("tableRowTemplate")[0];
    var newRow = row.content.cloneNode(true);
    var rowContainer = tableForm.getElementsByClassName("genericTableRowContainer")[0];
    rowContainer.appendChild(newRow);
}

function removeRow(element){
    element.parentElement.parentElement.remove();
}
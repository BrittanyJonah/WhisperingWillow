function addBridalRow(){
    var temp = document.getElementsByClassName("bridalTemplate")[0];
    var clon = temp.content.cloneNode(true);
    var formSection = document.getElementById("bridalForm");
    formSection.appendChild(clon);
}

function removeRow(element){
    element.parentElement.parentElement.remove();
}
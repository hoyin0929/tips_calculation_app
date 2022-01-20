document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

const calculateBtn = document.querySelector('#calculate-btn');

calculateBtn.onclick = function(){ 
    var amCredit = document.querySelector('#amCredit').value;
    var amCash= document.querySelector('#amCash').value;
    var amTotal = Number(amCredit) + Number(amCash);
    var totalCredit = document.querySelector('#totalCredit').value;
    var totalCash= document.querySelector('#totalCash').value;
    var pmTotal = Number(totalCash) + Number(totalCredit) - Number(amTotal); 
    document.querySelector('#amTotal').innerHTML = amTotal;
    document.querySelector('#pmTotal').innerHTML = pmTotal;


}

// insertCheckboxInto

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    
    //console.log(data.length);
    if (data.length === 0){
            table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
            return;
        }

    let tableHtml = "";

    data.forEach(function({id, name, tip_per}){
        tableHtml += "<tr>";
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td><input type="checkbox" name="choice" value=${tip_per}"></td>`;
        tableHtml += `<td></td>`;
        tableHtml += `<td><input type="checkbox" name="choice" value=${tip_per}"></td>`;
        tableHtml += `<td></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    //console.log(data.length);

}
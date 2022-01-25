document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getTips')
    .then(response => response.json())
    .then(data => loadTipTable(data['data']))
});

function loadTipTable(data){
    const table = document.querySelector('table tbody');

    let tableHtml = "";

    data.forEach(function({name, date, amTip, pmTip}){
        tableHtml += "<tr>";
        tableHtml += `<td class="name">${name}</td>`;
        tableHtml += `<td>${new Date(date).toDateString()}</td>`;
        tableHtml += `<td>$${amTip}</td>`;
        tableHtml += `<td>$${pmTip}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    //console.log(data.length);

}
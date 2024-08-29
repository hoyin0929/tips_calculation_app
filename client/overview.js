document.addEventListener('DOMContentLoaded', function(){
    fetch('https://mumuhotpot.onrender.com/getTips')
    .then(response => response.json())
    .then(data => loadTipTable(data['data']))
});

const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#today').value;
    console.log(searchValue)
    fetch('https://mumuhotpot.onrender.com/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadTipTable(data['data']));
}

function loadTipTable(data){
    const table = document.querySelector('table tbody');
    const searchValue = document.querySelector('#today').value;
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4'>No Data</td></tr>";
        return;
    }

    if(searchValue === ""){
        table.innerHTML = "<tr><td class='no-data' colspan='4'>Please Select Closing Date</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function({name, date, amTip, pmTip}){
        // Create a Date object from the date string
    let dateObj = new Date(date);
    
    // Extract the month, day, and year from the Date object
    let month = dateObj.getUTCMonth() + 1; // Months are zero-based
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    
    // Format month and day to always have two digits
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    // Format the date as MM/DD/YYYY
    let formattedDate = `${month}/${day}/${year}`;
    
    // Build the table rows
    tableHtml += "<tr>";
    tableHtml += `<td class="name">${name}</td>`;
    tableHtml += `<td>${formattedDate}</td>`;
    tableHtml += `<td>$${amTip}</td>`;
    tableHtml += `<td>$${pmTip}</td>`;
    tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    //console.log(data.length);

}

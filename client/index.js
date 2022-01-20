document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event){
    if(event.target.className === "delete-row-btn"){
        deleteRowbyId(event.target.dataset.id);
    }
    if(event.target.className === "edit-row-btn"){
        handleEditRow(event.target.dataset.id);
    }
});


function deleteRowbyId(id){
    fetch('http://localhost:5000/delete/' + id,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        
            location.reload();

        
    });
}

function handleEditRow(id){
    const updateSectioin = document.querySelector('#update-row');
    updateSectioin.hidden = false;
    document.querySelector('#update-percentage').dataset.id = id;
}


const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    /*const options = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name})
    }*/

    fetch('http://localhost:5000/insert', {
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name : name})
})
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
    //.catch();
    location.reload();

}

function insertRowIntoTable(data){
    //console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if(data.hasOwnProperty(key)){
            tableHtml += `<td>${data[key]}</td>`;
        }
    }


    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
    

    tableHtml += "</tr>";

    if (isTableData){
        table.innerHTML = tableHtml;
    }else{
        const newRow = table.insertRow();
        newRow.innerHtml = tableHtml;
    }


}

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
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${tip_per}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    //console.log(data.length);

}

const updateBtn = document.querySelector('#update-row-btn');

updateBtn.onclick = function(){
    const updateTip = document.querySelector('#update-percentage');

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateTip.dataset.id,
            tip_per: updateTip.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        }
    })

} 
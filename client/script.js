document.addEventListener('DOMContentLoaded', function(){
    fetch('https://restaurant-calculate-system.herokuapp.com/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
});

document.addEventListener('DOMContentLoaded', function(){
    fetch('https://restaurant-calculate-system.herokuapp.com/getTips')
    .then(response => response.json())
    .then(data => loadTipTable(data['data']))
});

const btn = document.querySelector('#btn');
btn.addEventListener('click', (event) => {
    let amcheckboxes = document.querySelectorAll('input[name="am"]:checked');
    let pmcheckboxes = document.querySelectorAll('input[name="pm"]:checked');
    if (amcheckboxes.length > 0 && pmcheckboxes.length > 0) {
        let amKit = 0;
        let pmKit = 0;

        let am = [];
        amcheckboxes.forEach((checkbox) => {
            am.push(checkbox.value);
            // console.log(checkbox.value);
            // console.log(checkbox.dataset.id);
            if (checkbox.value === "0") {
                amKit++;
            }
            // console.log(amKit);
        });
        let amPer = am.reduce(add, 0);
        //alert(amPer);

        let pm = [];
        pmcheckboxes.forEach((checkbox) => {
            pm.push(checkbox.value);
            if (checkbox.value === "0") {
                pmKit++;
            }
        });
        let pmPer = pm.reduce(add, 0);

        // alert(amKit);
        // alert(pmKit);

        var amTotal = document.getElementById("amTotal").value;
        var pmTotal = document.getElementById("pmTotal").value;

        var am_kitchen_total = (Number(amTotal) * 0.1);
        var am_kit_tips = float2int(Number(am_kitchen_total) / Number(amKit));
        am_kitchen_total = am_kit_tips * Number(amKit);
        var am_server_total = amTotal - am_kitchen_total;
        // console.log(am_server_total);

        var pm_kitchen_total = (Number(pmTotal) * 0.1);
        var pm_kit_tips = float2int(Number(pm_kitchen_total) / Number(pmKit));
        pm_kitchen_total = pm_kit_tips * Number(pmKit);
        var pm_server_total = pmTotal - pm_kitchen_total;

        console.log(am_kit_tips);
        console.log(pm_kit_tips);
        //console.log(typeof 'amcheckboxes.dataset.id')

        //updateTips(event.target.dataset.id);
        var amTip = 0;
        var pmTip = 0;

        var x = document.getElementById("today");
        var date = x.value;
        console.log(date);

        // const update = document.querySelectorALL('input[name="am"]:checked');
        amcheckboxes.forEach((checkbox) => {
            if (checkbox.value == "0") {
                console.log(checkbox.id);
                //const employee = checkbox.id;
                let employee = checkbox.id;

                fetch('https://restaurant-calculate-system.herokuapp.com/tip', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        employee,
                        date: date,
                        amTip: am_kit_tips,
                        pmTip: pmTip
                    })
                })
                    .then(response => response.json())
            }

            if (checkbox.value != "0") {


                console.log(amTip);
                //console.log(typeof 'checkbox.id');
                console.log(checkbox.id);

                if (amPer > 0.9) {
                    amTip = Math.round((am_server_total * (checkbox.value)) / amPer);
                    am_server_total = (am_server_total - amTip).toFixed(2);
                    amPer = (amPer - checkbox.value).toFixed(2);
                    //  console.log(amTip);
                    //  console.log(amPer);
                    //  console.log(am_server_total);
                } else {
                    amTip = am_server_total;
                }

                let employee = checkbox.id;
                fetch('https://restaurant-calculate-system.herokuapp.com/tip', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        employee,
                        date: date,
                        amTip: amTip,
                        pmTip: pmTip
                    })
                })
                    .then(response => response.json())
            }
            amTip = 0;
        });

        pmcheckboxes.forEach((checkbox) => {

            if (checkbox.value == "0") {
                am_kit_tips = 0;
                console.log(checkbox.id);
                let employee = checkbox.id;
                fetch('https://restaurant-calculate-system.herokuapp.com/tip', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        employee,
                        date: date,
                        amTip: am_kit_tips,
                        pmTip: pm_kit_tips
                    })
                })
                    .then(response => response.json())
            }

            if (checkbox.value != "0") {

                // pmTip = Math.round((pm_server_total * (checkbox.value)) / pmPer);
                // console.log(checkbox.id);

                if (pmPer > 0.9) {
                    pmTip = Math.round((pm_server_total * (checkbox.value)) / pmPer);
                    pm_server_total = (pm_server_total - pmTip).toFixed(2);
                    pmPer = (pmPer - checkbox.value).toFixed(2);
                } else {
                    pmTip = pm_server_total
                }

                let employee = checkbox.id;

                fetch('https://restaurant-calculate-system.herokuapp.com/tip', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        employee,
                        date: date,
                        amTip: amTip,
                        pmTip: pmTip
                    })
                })
                    .then(response => response.json())
            }
            pmTip = 0;

        const searchValue = document.querySelector('#today').value;
        console.log(searchValue)
        fetch('https://restaurant-calculate-system.herokuapp.com/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadTipTable(data['data']));

        });
    } else {
        alert("Please select employees for each shift");
    }

});  

function add(accumulator, a) {
    return (Number(accumulator) + Number(a)).toFixed(2);
  }


const calculateBtn = document.querySelector('#calculate-btn');

calculateBtn.onclick = function(){ 
    var amCredit = document.querySelector('#amCredit').value;
    var amCash= document.querySelector('#amCash').value;
    var amTotal = (Number(amCredit) + Number(amCash)).toFixed(2);
    var totalCredit = document.querySelector('#totalCredit').value;
    var totalCash= document.querySelector('#totalCash').value;
    var pmTotal = (Number(totalCash) + Number(totalCredit) - Number(amTotal)).toFixed(2); 
    document.querySelector('#amTotal').innerHTML = amTotal;
    document.querySelector('#pmTotal').innerHTML = pmTotal;
    //var x = document.getElementById("today");
    //var currentVal = x.value;
    //console.log(currentVal);

}


function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    
    //console.log(data.length);
    if (data.length === 0){
            table.innerHTML = "<tr><td class='no-data' colspan='3'>No Data</td></tr>";
            return;
        }

    let tableHtml = "";

    data.forEach(function({id, name, tip_per}){
        tableHtml += "<tr>";
        tableHtml += `<td class="name">${name}</td>`;
        tableHtml += `<td><input type="checkbox" name="am" id=${id} value=${tip_per}></td>`;
        tableHtml += `<td><input type="checkbox" name="pm" id=${id} value=${tip_per}></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    //console.log(data.length);

}

function loadTipTable(data){
    const table = document.querySelectorAll('table tbody')[1];

    const searchValue = document.querySelector('#today').value;
    
    if(searchValue === ""){
        table.innerHTML = "<tr><td class='no-data' colspan='4'>Please Select Closing Date</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function({name, date, amTip, pmTip}){

        var date = new Date(date);
        date.setDate(date.getDate()+1);
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

function float2int (value) {
    return value | 0;
}
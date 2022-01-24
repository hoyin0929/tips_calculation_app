document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

const btn = document.querySelector('#btn');
btn.addEventListener('click', (event) => {
    let amcheckboxes = document.querySelectorAll('input[name="am"]:checked');
    let pmcheckboxes = document.querySelectorAll('input[name="pm"]:checked');
    
    let amKit = 0;
    let pmKit = 0;

    let am = [];
    amcheckboxes.forEach((checkbox) => {
        am.push(checkbox.value);
        // console.log(checkbox.value);
        // console.log(checkbox.dataset.id);
        if(checkbox.value === "0"){
            amKit++;
        }
        // console.log(amKit);
    });
    let amPer = am.reduce(add, 0);
    //alert(amPer);

    let pm = [];
    pmcheckboxes.forEach((checkbox) => {
        pm.push(checkbox.value);
        if(checkbox.value === "0"){
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
    pm_kitchen_total = am_kit_tips * amKit;
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
    // const update = document.querySelectorALL('input[name="am"]:checked');
    amcheckboxes.forEach((checkbox) => {
        if (checkbox.value == "0" ) {
            console.log(checkbox.id);
            //const employee = checkbox.id;
            let employee = checkbox.id;

            fetch('http://localhost:5000/tip', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    employee,
                    // date: new Date(),
                    amTip: am_kit_tips,
                    pmTip: pmTip
                })
            })
                .then(response => response.json()) 
        }

        if (checkbox.value != "0" ) {
            
            amTip = Math.round((am_server_total * (checkbox.value)) / amPer);
            //console.log(amTip);
            //console.log(typeof 'checkbox.id');
            console.log(checkbox.id);

            if (amPer > 1) {
                am_server_total = (am_server_total - amTip).toFixed(2);
                amPer = (amPer - checkbox.value).toFixed(2);
                // console.log(amTip);
                // console.log(amPer);
                // console.log(am_server_total);
            }else{
                amTip = am_server_total
            }
             
            let employee = checkbox.id;
            fetch('http://localhost:5000/tip', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    employee,
                    // date: new Date(),
                    amTip: amTip,
                    pmTip: pmTip
                })
            })
                .then(response => response.json())                
        }
        amTip = 0;        
    });

    pmcheckboxes.forEach((checkbox) => {
        
        if (checkbox.value == "0" ) {
            am_kit_tips = 0;
            console.log(checkbox.id);
            let employee = checkbox.id;
            fetch('http://localhost:5000/tip', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    employee,
                    amTip: am_kit_tips,
                    pmTip: pm_kit_tips
                })
            })
                .then(response => response.json()) 
        }

        if (checkbox.value != "0" ) {

            pmTip = Math.round((pm_server_total * (checkbox.value)) / pmPer);
            //console.log(pmTip);
            //console.log(typeof 'checkbox.id');
            console.log(checkbox.id);

            if (pmPer > 1) {
                pm_server_total = (pm_server_total - pmTip).toFixed(2);
                pmPer = (pmPer - checkbox.value).toFixed(2);
                // console.log(pmTip);
                // console.log(pmPer);
                // console.log(pm_server_total);
            }else{
                pmTip = pm_server_total
            }
             
            let employee = checkbox.id;

            fetch('http://localhost:5000/tip', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    employee,
                    amTip: amTip,
                    pmTip: pmTip
                })
            })
                .then(response => response.json())                
        }
        pmTip = 0;
        
    });

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
        tableHtml += `<td class="name">${name}</td>`;
        tableHtml += `<td><input type="checkbox" name="am" id=${id} value=${tip_per}></td>`;
        // tableHtml += `<td>$${tips}</td>`;
        tableHtml += `<td><input type="checkbox" name="pm" id=${id} value=${tip_per}></td>`;
        // tableHtml += `<td>$${tips}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    //console.log(data.length);

}

function float2int (value) {
    return value | 0;
}
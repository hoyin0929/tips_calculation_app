document.addEventListener('DOMContentLoaded', function(){
    fetch('https://mumuhotpot.onrender.com/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
});

document.addEventListener('DOMContentLoaded', function(){
    fetch('https://mumuhotpot.onrender.com/getTips')
    .then(response => response.json())
    .then(data => loadTipTable(data['data']))
});

const btn = document.querySelector('#btn');
btn.addEventListener('click', (event) => {

    var x = document.getElementById("today");
    var date = x.value;
    if (date === "") {
        alert("Please select a closing date before calculate!")
    } else {
        let amcheckboxes = document.querySelectorAll('input[name="am"]:checked');
        let pmcheckboxes = document.querySelectorAll('input[name="pm"]:checked');
        if (amcheckboxes.length > 0 && pmcheckboxes.length > 0) {
            let amKit = 0;
            let pmKit = 0;
            let amMilkTea = 0;
            let pmMilkTea = 0;

            let am = [];
            amcheckboxes.forEach((checkbox) => {
                if (checkbox.value != "0.99"){ //bybass milktea staffs
                    am.push(checkbox.value);
                }else{
                    amMilkTea++;
                }
                // console.log(checkbox.value);
                // console.log(checkbox.dataset.id);
                if (checkbox.value === "0") {
                    amKit++;
                }
                // console.log(amKit);
            });
            var amPer = am.reduce(add, 0);
            //alert(amPer);
            var am_smallest = Number(smallest_percentage(am)).toFixed(2);

            let pm = [];
            pmcheckboxes.forEach((checkbox) => {
                if (checkbox.value != "0.99"){ //bybass milktea staffs
                    pm.push(checkbox.value);
                }else{
                    pmMilkTea++;
                }
                if (checkbox.value === "0") {
                    pmKit++;
                }
            });

            var pmPer = pm.reduce(add, 0);
            var pm_smallest = Number(smallest_percentage(pm)).toFixed(2);

            var amTotal = document.getElementById("amTotal").value;
            var pmTotal = document.getElementById("pmTotal").value;

            var am_kitchen_total = (Number(amTotal) * 0.1);
            var am_kit_tips = float2int(Number(am_kitchen_total) / Number(amKit));
            am_kitchen_total = am_kit_tips * Number(amKit); 
            var am_server_total = amTotal - am_kitchen_total;

            let amMax= 0;
            var am_mt_tips = (Math.floor(am_server_total / 500) * 10);
            if (amMilkTea==1) {amMax =30;}
            else if (amMilkTea==2) {amMax =20;}
            if (am_mt_tips > amMax){am_mt_tips=amMax;}
            am_mt_total = am_mt_tips * amMilkTea;
            am_server_total = am_server_total - am_mt_total;

            // console.log(am_server_total);

            var pm_kitchen_total = (Number(pmTotal) * 0.1);
            var pm_kit_tips = float2int(Number(pm_kitchen_total) / Number(pmKit));
            pm_kitchen_total = pm_kit_tips * Number(pmKit);
            var pm_server_total = pmTotal - pm_kitchen_total;
            
            let pmMax= 0;
            var pm_mt_tips = (Math.floor(pm_server_total / 500) * 10);
            if (pmMilkTea==1) {pmMax =30;}
            else if (pmMilkTea==2) {pmMax =20;}
            if (pm_mt_tips > pmMax){pm_mt_tips=pmMax;}
            pm_mt_total = pm_mt_tips * pmMilkTea;
            pm_server_total = pm_server_total - pm_mt_total;

            //console.log(am_kit_tips);
            //console.log(pm_kit_tips);
            //console.log(typeof 'amcheckboxes.dataset.id')

            var amTip = 0;
            var pmTip = 0;


            // const update = document.querySelectorALL('input[name="am"]:checked');
            amcheckboxes.forEach((checkbox) => {
                if (checkbox.value == "0") {
                    // console.log(checkbox.id);
                    //const employee = checkbox.id;
                    let employee = checkbox.id;

                    fetch('https://mumuhotpot.onrender.com/tip', {
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

                if (checkbox.value == "0.99"){
                    let employee = checkbox.id;

                    fetch('https://mumuhotpot.onrender.com/tip', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            employee,
                            date: date,
                            amTip: am_mt_tips,
                            pmTip: pmTip
                        })
                    })
                        .then(response => response.json())

                }

                if (checkbox.value != "0" && checkbox.value != "0.99") {


                    // console.log(amTip);
                    //console.log(typeof 'checkbox.id');
                    // console.log(checkbox.id);

                    if (amPer != am_smallest) {
                        amTip = Math.round((am_server_total * (checkbox.value)) / amPer);
                        am_server_total = (am_server_total - amTip).toFixed(2);
                        amPer = (amPer - checkbox.value).toFixed(2);
                    } else {
                        amTip = am_server_total;
                    }

                    let employee = checkbox.id;
                    fetch('https://mumuhotpot.onrender.com/tip', {
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
                    // console.log(checkbox.id);
                    let employee = checkbox.id;
                    fetch('https://mumuhotpot.onrender.com/tip', {
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

                if (checkbox.value == "0.99"){
                    let employee = checkbox.id;

                    fetch('https://mumuhotpot.onrender.com/tip', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            employee,
                            date: date,
                            amTip: am_mt_tips,
                            pmTip: pm_mt_tips
                        })
                    })
                        .then(response => response.json())

                }

                if (checkbox.value != "0" && checkbox.value != "0.99") {

                    if (pmPer.toFixed(2) != pm_smallest) {
                        pmTip = Math.round((pm_server_total * (checkbox.value)) / pmPer);
                        pm_server_total = (pm_server_total - pmTip).toFixed(2);
                        pmPer = (pmPer - checkbox.value).toFixed(2);
                    } else {
                        pmTip = pm_server_total;
                    }

                    let employee = checkbox.id;

                    fetch('https://mumuhotpot.onrender.com/tip', {
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
                // console.log(searchValue)
                fetch('https://mumuhotpot.onrender.com/search/' + searchValue)
                    .then(response => response.json())
                    .then(data => loadTipTable(data['data']));

            });
        } else {
            alert("Please select employees for each shift");
        }
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
    var pmCredit = document.querySelector('#totalCredit').value;
    var pmCash= document.querySelector('#totalCash').value;
    var pmTotal = (Number(pmCash) + Number(pmCredit)).toFixed(2); 
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

function smallest_percentage(arr){
    let smallestNum = arr[0];
    //console.log(smallestNum);
    
    for(let i = 1; i < arr.length; i++) {
          if(arr[i] < smallestNum && arr[i] != "0") {
            smallestNum = arr[i];
            //console.log(smallestNum);   
          }
        }
      return smallestNum;
}
function test(){
    var connection = '../db_connection.js';
    connection.query('select * from employee', (err,res) =>{
        return res;
      });
    return employee;
}

function calculate(){

    var amCredit = document.getElementById("amCredit").value;
    var amCash= document.getElementById("amCash").value;
    var amTotal = (Number(amCredit) + Number(amCash)).toFixed(2);
    document.getElementById("amTotal").innerHTML = amTotal;
    
    var am_kitchen_tips = float2int(Number(amTotal) * 0.1);
    document.getElementById("am_kitchen_tips").innerHTML = am_kitchen_tips;
    document.getElementById("am_remaining").innerHTML = (amTotal - am_kitchen_tips).toFixed(2);

    
    var am = document.forms[0];
    var totalPer = Number(0);
    var i;
    var kit = Number(0);

    var bao= 0;
    var jacky= 0;
    var wang= 0;
    var kang = 0;
    var chen = 0;
    var elias = 0;
    var dago = 0;

    var count = 0;
    
    for(i=0;i<am.length; i++){
        if ((am[i].checked) && (am[i].value != 0) && (am[i].value != 2)){
                totalPer = Number(totalPer) + Number(am[i].value);
        }
        if ((am[i].value == 0) && (am[i].checked) ){
            kit = kit + Number(1);
            am[i].value = Number(2); 
        }
    }

    for(i=0;i<am.length; i++){
        if ((am[i].checked) && (am[i].value != 0) && (am[i].value != 2)){
            count ++}
    }


    var am_kit_tips = (Number(am_kitchen_tips) / Number(kit));

    if (am[12].checked)
        bao = float2int(am_kit_tips);
    
    if (am[14].checked)
        jacky =float2int(am_kit_tips);
    
    if (am[16].checked)
        wang = float2int(am_kit_tips);

    if (am[18].checked)
        kang = float2int(am_kit_tips);
    
    if (am[20].checked)
        chen = float2int(am_kit_tips);

    if (am[22].checked)
        elias = float2int(am_kit_tips);

    if (am[24].checked)
        dago = float2int(am_kit_tips);

        document.getElementById("am_kitchen_tips").innerHTML = bao+jacky+chen+kang+wang+elias+dago;
        var am_remaining = Number(amTotal) - (bao+jacky+chen+kang+wang+elias+dago);
    document.getElementById("am_remaining").innerHTML = am_remaining.toFixed(2);
    

    document.getElementById("am_bao").innerHTML = bao;
    document.getElementById("am_jacky").innerHTML = jacky;
    document.getElementById("am_wang").innerHTML = wang;
    document.getElementById("am_kang").innerHTML = kang;
    document.getElementById("am_elias").innerHTML = elias;
    document.getElementById("am_chen").innerHTML = chen;
    document.getElementById("am_dago").innerHTML = dago;

    var tevis= 0;
    var dt= 0;
    var mason= 0;
    var jay = 0;
    var andrew = 0;
    var max = 0;

    if (am[0].checked){
        if (count >> 1){
        tevis = Math.round(Number(am_remaining) / Number(totalPer));
        }else tevis = am_remaining.toFixed(2);
    }
    
    if (am[2].checked){
        if (count >> 1){
        dt = Math.round(Number(am_remaining) / Number(totalPer));
        }else dt = am_remaining.toFixed(2);
    }

    if (am[4].checked){
        if (count >> 1){
        mason = Math.round(Number(am_remaining) / Number(totalPer));
        }else mason = am_remaining.toFixed(2);
    }

    if (am[6].checked){
        if (count >> 1){
        andrew = Math.round(Number(am_remaining) / Number(totalPer) * Number(0.85));
        }else andrew = am_remaining.toFixed(2);
    }
    

    if (am[8].checked){
        if (count >> 1){
            jay = Math.round(Number(am_remaining) / Number(totalPer) * Number(0.75));
        }else jay= am_remaining.toFixed(2);
    }

    if (am[10].checked){
        if (count >> 1){
        max = Math.round(Number(am_remaining) / Number(totalPer)) * Number(0.55);
        }else max = am_remaining.toFixed(2);
    }

    var array = [tevis,dt,mason,andrew,jay,max];
    var smallest = Math.min.apply(null, array.filter(Boolean));
    smallest = (am_remaining - Math.round(tevis) - Math.round(dt) - Math.round(mason) - Math.round(andrew) - Math.round(jay)- Math.round(max)) + Math.round(smallest);

    if (max == Math.min.apply(null, array.filter(Boolean))){
        if (am[10].checked)
            max = smallest.toFixed(2);
    }
    else if (jay == Math.min.apply(null, array.filter(Boolean))){
        if (am[8].checked)
           jay = smallest.toFixed(2);
    }
    else if (dt == Math.min.apply(null, array.filter(Boolean))){
        if (am[2].checked)
           dt = smallest.toFixed(2);
    }
    else if (andrew = Math.min.apply(null, array.filter(Boolean))){
        if (am[6].checked)
        andrew = smallest.toFixed(2);
        else
        andrew = 0; 
    }
    


    if ((am[2].checked) && (totalPer == 2) &&(am[0].checked)){
        dt = (am_remaining /2).toFixed(2);
        tevis = (am_remaining - dt).toFixed(2);
    }

    if ((am[4].checked) && (totalPer == 2))
        mason = smallest.toFixed(2);

    if (totalPer == 3){
        dt = (am_remaining / 3).toFixed(2);
        tevis = (am_remaining / 3).toFixed(2);
        mason= (am_remaining - tevis - dt).toFixed(2);

    }
    

    document.getElementById("tevis_am").value = tevis;
    document.getElementById("dt_am").value = dt;
    document.getElementById("mason_am").value = mason;
    document.getElementById("andrew_am").value = andrew;
    document.getElementById("jay_am").value = jay;
    document.getElementById("max_am").value = max;

    document.getElementById("total_per").value = totalPer;

}



function myFunction() {

    var pmCredit = document.getElementById("pmCredit").value;
    var pmCash= document.getElementById("pmCash").value;
    var pmTotal = Number(pmCredit) + Number(pmCash);
    document.getElementById("pmTotal").innerHTML = pmTotal;
    
    var pm_kitchen_tips = float2int(Number(pmTotal) * 0.1);
    //document.getElementById("pm_kitchen_tips").innerHTML = pm_kitchen_tips;
    var pm_remaining = Number(pmTotal) - pm_kitchen_tips;
    //document.getElementById("pm_remaining").innerHTML = pm_remaining.toFixed(2);

    
    var choice= document.getElementsByName('choice');
    //document.body.append(choice[1]);
    var pm_totalPer = Number(0);
    var i;
    var pm_kit = Number(0);

    var pm_bao= 0;
    var pm_jacky= 0;
    var pm_wang= 0;
    var pm_kang = 0;
    var pm_chen = 0;
    var pm_elias = 0;
    var pm_dago = 0;
    
    for(i=0;i<choice.length; i++){
        if ((choice[i].checked) && (choice[i].value != 0) && (choice[i].value != 2)){
                pm_totalPer = Number(pm_totalPer) + Number(choice[i].value);
        }
        if ((choice[i].value == 0) && (choice[i].checked) ){
            pm_kit = pm_kit + Number(1);
            choice[i].value = Number(2); 
        }
    }

    var pm_kit_tips = (Number(pm_kitchen_tips) / Number(pm_kit));

    if (choice[6].checked)
        pm_bao = float2int(pm_kit_tips);
    
    if (choice[7].checked)
        pm_jacky =float2int(pm_kit_tips);
    
    if (choice[8].checked)
        pm_wang = float2int(pm_kit_tips);

    if (choice[9].checked)
        pm_kang = float2int(pm_kit_tips);
    
    if (choice[10].checked)
        pm_chen = float2int(pm_kit_tips);

    if (choice[11].checked)
        pm_elias = float2int(pm_kit_tips);

    if (choice[12].checked)
        pm_dago = float2int(pm_kit_tips);
    
    document.getElementById("pm_kitchen_tips").innerHTML = pm_bao + pm_jacky + pm_chen + pm_kang + pm_wang + pm_elias + pm_dago;
    var pm_remaining = Number(pmTotal) - (pm_bao + pm_jacky + pm_chen + pm_kang + pm_wang + pm_elias + pm_dago);
    document.getElementById("pm_remaining").innerHTML = pm_remaining.toFixed(2);
    

    //var dish = pm_kitchen_tips - float2int(pm_kit_tips);
    document.getElementById("pm_bao").innerHTML = pm_bao;
    document.getElementById("pm_jacky").innerHTML = pm_jacky;
    document.getElementById("pm_wang").innerHTML = pm_wang;
    document.getElementById("pm_kang").innerHTML = pm_kang;
    document.getElementById("pm_elias").innerHTML = pm_elias;
    document.getElementById("pm_chen").innerHTML = pm_chen;
    document.getElementById("pm_dago").innerHTML = pm_dago;

    var pm_tevis= 0;
    var pm_dt= 0;
    var pm_mason= 0;
    var pm_jay = 0;
    var pm_andrew = 0;
    var pm_max = 0;
    
    if (choice[0].checked)
        pm_tevis = Math.round(Number(pm_remaining) / Number(pm_totalPer));
    
    if (choice[1].checked)
        pm_dt = Math.round(Number(pm_remaining) / Number(pm_totalPer));

    if (choice[2].checked)
        pm_mason = Math.round(Number(pm_remaining) / Number(pm_totalPer));

    if (choice[3].checked)
        pm_andrew = Math.round(Number(pm_remaining) / Number(pm_totalPer) * Number(0.85));

    if (choice[4].checked)
        pm_jay = Math.round(Number(pm_remaining) / Number(pm_totalPer) * Number(0.75));

    if (choice[5].checked)
        pm_max = Math.round(Number(pm_remaining) / Number(pm_totalPer)) * Number(0.55);

    var arr = [pm_tevis,pm_dt,pm_mason,pm_andrew,pm_jay,pm_max];
    var pm_smallest = Math.min.apply(null, arr.filter(Boolean));
    pm_smallest = (pm_remaining - Math.round(pm_tevis) - Math.round(pm_dt) - Math.round(pm_mason) - Math.round(pm_andrew) - Math.round(pm_jay)- Math.round(pm_max)) + Math.round(pm_smallest);
  
    if (pm_max == Math.min.apply(null, arr.filter(Boolean))){
        if (choice[5].checked)
        pm_max = pm_smallest.toFixed(2);
    }
    else if (pm_jay == Math.min.apply(null, arr.filter(Boolean))){
        if (choice[4].checked)
        pm_jay = pm_smallest.toFixed(2);
    }
    else if (pm_andrew = Math.min.apply(null, arr.filter(Boolean))){
        if (choice[3].checked)
        pm_andrew = pm_smallest.toFixed(2);
        else
        pm_andrew = 0; 
    }
    

    if ((choice[1].checked) && (pm_totalPer == 2) &&(choice[0].checked)){
        pm_dt = (pm_remaining / 2).toFixed(2);
        pm_tevis = (pm_remaining - pm_dt).toFixed(2);
    }

    if ((choice[2].checked) && (pm_totalPer == 2))
        pm_mason = pm_smallest.toFixed(2);

    if (pm_totalPer == 3){
        pm_dt = (pm_remaining / 3).toFixed(2);
        pm_tevis = pm_dt;
        pm_mason= (pm_remaining - pm_tevis - pm_dt).toFixed(2);

    }
    

    document.getElementById("tevis_tips").value = pm_tevis;
    document.getElementById("dt_tips").value = pm_dt;
    document.getElementById("mason_tips").value = pm_mason;
    document.getElementById("andrew_tips").value = pm_andrew;
    document.getElementById("jay_tips").value = pm_jay;
    document.getElementById("max_tips").value = pm_max;

    document.getElementById("pm_total_per").value = pm_totalPer;
    

    
}

function float2int (value) {
    return value | 0;
}
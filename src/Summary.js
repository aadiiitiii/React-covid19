import React, {useState} from "react";

function Summary({selected,changeChart}) {

    const [color,setColor]=useState("#00ff08");
    var date =new Date(selected.updated);
    var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    function clickCard(x){
        changeChart(x)

        setColor("#0008ff");
        if (x==="deaths") {
            setColor("#ff1100");
        }
        else if(x==="recovered") {
            setColor("#00ff08");
        }
    }

    return<div>
        <div className="d-flex">
            <h4 className="text-center mt-4 ml-5">{selected.country||"Worldwide"}</h4>
        </div>

        <div className="row justify-content-between  ">
            <div className="mcard card shadow  m-3 p-3 col-md-3" onClick={()=>clickCard("recovered")}>
                <b>Total Recovered {selected.recovered}</b>
                {days[date.getDay()]+" "+date.getDate()+" "+(date.getMonth()+1)+" "+date.getFullYear()}
                <p>Number of patients recovered from COVID-19</p>
                {color==="#00ff08"&&<div className="bar mx-auto" style={{backgroundColor:color}}></div>}
            </div>

            <div className="mcard card shadow  m-3 p-3 col-md-3" onClick={()=>clickCard("deaths")}>
                <b>Total Deaths {selected.deaths}</b>
                {days[date.getDay()]+" "+date.getDate()+" "+(date.getMonth()+1)+" "+date.getFullYear()}
                <p>Number of deaths caused by COVID-19</p>
                {color==="#ff1100"&&<div className="bar mx-auto" style={{backgroundColor:color}}></div>}
            </div>

            <div className="mcard card shadow  m-3 p-3 col-md-3" onClick={()=>clickCard("cases")}>
                <b>Total Active {selected.active}</b>
                {days[date.getDay()]+" "+date.getDate()+" "+(date.getMonth()+1)+" "+date.getFullYear()}
                <p>Number of active cases caused by COVID-19</p>
                {color==="#0008ff"&&<div className="bar mx-auto" style={{backgroundColor:color}}></div>}
            </div>
        </div>
    </div>
}

export default Summary;
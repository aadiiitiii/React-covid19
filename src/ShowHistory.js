import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import axios from "axios";

function ShowHistory({currentCountry,show}) {

    const [ChartData,setChartData]=useState([]);
    const [allData,setAllData]=useState([]);
    const [countryData,setCountryData]=useState([]);
    useEffect(()=>{

       getHistory();

    },[]);


    useEffect(()=>{
        if(currentCountry==="Worldwide" || currentCountry.length===0){
            distrctureData(allData[show]);
        }
        else {
            var filterData=countryData.filter(data=>data.country===currentCountry);
            if (filterData.length===1) {
                distrctureData(filterData[0].timeline[show]);
            }

        }
    },[currentCountry,show])


function distrctureData(data) {

    var labels = [], deaths = [];

    for (var row in data) {
        labels = [...labels, row];
        deaths = [...deaths, data[row]]
    }

    var topic="Active";
    var color="#0008ff";
    if (show==="deaths") {
        topic="Deaths";
        color="#ff1100";
    }
    else if(show==="recovered") {
        topic="Recovered";
        color="#00ff08";
    }
    setChartData([labels,deaths,topic,color]);

}
    async function getHistory() {
        await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
            .then(res=>{
                var data=res.data;
                setAllData(data)
                distrctureData(data[show]);
            }).catch(err=>console.log(err))

        await axios.get("https://disease.sh/v3/covid-19/historical?lastdays=30")
            .then(res=>{
                var data=res.data;
                setCountryData(data)
            }).catch(err=>console.log(err));
    }

    const mydata = {
        labels: ChartData[0],
        datasets: [
            {
                label: ChartData[2],
                fill: false,
                lineTension: 0.1,
                backgroundColor: ChartData[3],
                borderColor: ChartData[3],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 3,
                pointRadius: 2,
                pointHitRadius: 10,
                data:ChartData[1]
            }
        ]
    };
    return <>
        <Line data={mydata}/>
    </>;
}

export default ShowHistory;
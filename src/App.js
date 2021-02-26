import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Summary from "./Summary";
import TableData from "./TableData";
import ShowHistory from "./ShowHistory";

function App() {
  const [countries,setCountries]=useState([]);
  const [currentCountry,setCurrentCountry]=useState("");
  const [allData,setAllData]=useState([]);
  const [selected,setSelected]=useState([]);
  const [worldwide,setWorldwide]=useState([]);
  const [changeChart,setChangeChart]=useState("recovered");

  useEffect(()=>{
    getData();
      getInitialData();
  },[]);

  async function getData() {
    await axios.get("https://disease.sh/v3/covid-19/countries")
        .then(res=>{
          var data=res.data;
          setAllData(data);

          let countries= data.map(row=>(
              {
                country:row.country,
                patitions:row.cases
              }
          ))
          setCountries(countries)
        }).catch(err=>console.log(err))
  }

    function clickTab(x){
        setChangeChart(x)
    }


  async function getInitialData() {
    await axios.get("https://disease.sh/v3/covid-19/all")
        .then(res=>{
          var data=res.data;
            setSelected(data);
            setWorldwide(data);
        }).catch(err=>console.log(err))
  }


  const changehandler= async (e)=>{
      var selected=e.target.value;
    setCurrentCountry(selected)

      if (selected==="Worldwide"){
          setSelected(worldwide);
      }
      else {
          var row=await allData.filter(row=>(row.country===selected));
          setSelected(row[0]);
      }
  }

  return (
    <div className="App">
      <div className="container">
          <div className="d-flex">
              <div className="col-md-2">
                  {selected.countryInfo?.flag?  <img className="logo mx-auto mt-3" src={selected.countryInfo.flag} alt="flag"/>:<></>}
              </div>
              <div className="col-md-5">
                  <h1 className="text-center mt-2 text-uppercase text-danger ">Covid 19 tracker</h1>
              </div>
          </div>
        <div className="header d-flex justify-content-between ml-auto">
          <p className="mt-2"><b>Select Country</b></p>
          <select name="" id="" className="form-control ml-3" onChange={changehandler}  multiple={false} value={currentCountry}>
            <option value="Worldwide">World count</option>
            {countries.map(country=>(
                <option key={country.country} value={country.country}>{country.country}</option>
            ))}
          </select>
        </div>
        <div className="row">
            <div className="col-md-8 border mb-3">
                <Summary selected={selected} changeChart={clickTab} />

                <ShowHistory show={changeChart} currentCountry={currentCountry} />
            </div>
            <TableData  data={countries} />
        </div>
      </div>
    </div>
  );
}

export default App;

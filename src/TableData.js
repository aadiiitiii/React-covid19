import React from "react";

function TableData({data}){
    let myData=[...data];
    myData.sort((a,b)=>a.patitions>b.patitions?-1:1);

    return <div className="col-md-4 ">
        <div className="card p-3 shadow tableData">
            <h5>{myData.country||"Worldwide"}  Details</h5>
            <table>
                <tbody>
                { myData.map(row=>(
                    <tr key={row.country}><td>{row.country}</td><td><b>{row.patitions}</b></td></tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default TableData;
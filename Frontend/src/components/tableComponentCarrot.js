import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown, faEquals} from '@fortawesome/free-solid-svg-icons';
import commonConfig from '../config/commonConfig.json';

const TableComponentCarrot = () => {

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    const [tableRecord, setTableRecord] = useState({});

    let cropType = {
        "Crop_Type": "Carrot"
    }

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
        fetchTabeleData(); // Run fetchTabeleData only once when the component mounts
    }, [fetchTabeleData]);


    async function fetchTabeleData() {
        try {
            let url = 'https://govisewana-3yc5uvvuza-uc.a.run.app/yieldPrediction/excess/';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cropType)
            });

            // 'GET' response from Back-end
            if (response.ok) {
                let result = await response.json();
                setTableRecord(result);
                //console.log(tableRecord);
            } else {
                console.error('Error sending data:', response.status);
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    }

    // Initialize an empty array to store the data
    const data = [];

    // Iterate over each table row and push the data to the array
    for (const row of Object.values(tableRecord)) {
        data.push(row);
    }


    const getColorClass = (totyield, demand) => {
        const totyieldValue = parseInt(totyield);
        const cropDemand = parseInt(demand)
        if (totyieldValue < cropDemand) {
            sessionStorage.setItem('excess_car', null);
            return 'excess-green';
        } else if (totyieldValue > cropDemand) {
            sessionStorage.setItem('excess_car', 'RED');
            return 'excess-red';
        } else if (totyieldValue === cropDemand) {
            sessionStorage.setItem('excess_car', null);
            return 'excess-blue';
        }
    };


    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="table-cell">{commonConfig[selectedLanguage].TB_WEEKNO}</th>
                    <th className="table-cell">{commonConfig[selectedLanguage].TB_TOTAL_YIELD}</th>
                    <th className="table-cell">{commonConfig[selectedLanguage].TB_TOTAL_DEMAND}</th>
                    <th className="table-cell">{commonConfig[selectedLanguage].TB_INEXCESS}</th>
                </tr>
                </thead>
                <tbody className="table-body">
                {data.map((item, index) => (
                    <tr key={index}>
                        <td className="table-cell">{item.Week_No}</td>
                        <td className="table-cell">{item.Total_Yield}</td>
                        <td className="table-cell">{item.Crop_Demand}</td>
                        <td className="table-cell">
                            <span className={`excess-badge ${getColorClass(item.Total_Yield, item.Crop_Demand)}`}>
                                {parseInt(item.Total_Yield) > parseInt(item.Crop_Demand) ? (
                                    <FontAwesomeIcon icon={faArrowDown} className="arrow-icon"/>
                                ) : parseInt(item.Total_Yield) < parseInt(item.Crop_Demand) ? (
                                    <FontAwesomeIcon icon={faArrowUp} className="arrow-icon"/>
                                ) : (
                                    <FontAwesomeIcon icon={faEquals} className="arrow-icon"/>
                                )}
                                {item.In_Excess}
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponentCarrot;

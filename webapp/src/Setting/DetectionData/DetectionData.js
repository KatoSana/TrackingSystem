import React, { useState, useEffect } from 'react';
import './DetectionData.scss'
import DetectionDataTermSelector from './TermSelector';

export default function DetectionData() {
    const [detectionDatas, setDetectionDatas] = useState([]);

    const fetchDetectionData = term => {
        const url = new URL(`${process.env.REACT_APP_API_URL}/api/detectionData`);
        Object.keys(term).forEach(key => url.searchParams.append(key, term[key]));
        fetch(url)
            .then(res => res.json())
            .then(json =>{
                setDetectionDatas(json);
            });
    };

    useEffect(() => {
        console.log(detectionDatas);
      }, [detectionDatas]);

    return (
    <div className="DetectionData">
        <div className="DetectionDataTermSelector">
            <DetectionDataTermSelector onSend={fetchDetectionData} />
        </div>
    </div>
  );
}
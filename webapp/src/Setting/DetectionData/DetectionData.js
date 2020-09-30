import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './DetectionData.scss'
import TermSelector from './TermSelector';

export default function DetectionData() {
    const [term, setTerm] = useState({});
    const [detectionDatas, setDetectionDatas] = useState([]);
    const [detectionList, setDetectoinList] = useState([]);
    const [detectionListRender, setDetectionListRender] = useState();

    const unixTime2ymd = intTime => {
        const d = new Date(intTime);
        const hour = ('0' + d.getHours()).slice(-2);
        const min = ('0' + d.getMinutes()).slice(-2);
        const sec = ('0' + d.getSeconds()).slice(-2);
        const ms = ('0' + d.getMilliseconds()).slice(-2);
    
        return hour + ':' + min + ':' + sec + ':' + ms;
      };

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
        let list = [];
        detectionDatas.forEach(DetectionData => {
            const time = DetectionData.detectedTime;
            const num = DetectionData.detectorNumber;
            const RSSI = DetectionData.RSSI;
            list.push({
                time: `${unixTime2ymd(time)}`,
                number: num,
                RSSI: RSSI
            });
        });
        setDetectoinList(list);

        console.log(detectionDatas);
    }, [detectionDatas]);

    useEffect(() => {
        if (Object.keys(term).length) {
          fetchDetectionData(term); 
        }
      }, [term]);

    useEffect(() => {
        if (detectionList.length) {
            setDetectionListRender(
                <Paper className="Root">
                    <Table className="Table" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">時間</TableCell>
                            <TableCell align="center">受信機番号</TableCell>
                            <TableCell align="center">RSSI</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {detectionList.map(row => (
                                <TableRow key={row.time}>
                                <TableCell component="th" scope="row" align="center">{row.time}</TableCell>
                                <TableCell align="center">{(row.number)}</TableCell>
                                <TableCell align="center">{(row.RSSI)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
    }, [detectionList]);
    
    return (
        <div className="DetectionData">
            <div className="SideSelector">
                <TermSelector className="TermSelector" onSend={setTerm} />
            </div>
            <div className="List">{detectionListRender}</div>
        </div>
    );
}
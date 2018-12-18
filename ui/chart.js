'use strict';

const chartURL = 'http://127.0.0.1:3000';
const trackerID = 'abc123';

let tracker;

setInterval(()=> {
    const request = new XMLHttpRequest();
    request.open("get", chartURL + '/api/get/tracker/' + trackerID, false);
    request.send(null);
    tracker = JSON.parse(request.responseText);
    let datasetLabel = tracker[0].trackerName;
    let xLabels = [];
    let datasetDatas = [];
    let yLabels = [];
    for(let data of tracker[0].Location){
        datasetDatas.push(data.place);
        yLabels.push(data.place);
        xLabels.push(unixTime2ymd(data.time));
    }

    yLabels = yLabels.filter((x, i, self) => {
                return self.indexOf(x) === i;
            });
    chart.data.labels = xLabels;
    chart.data.datasets[0].label = datasetLabel;
    chart.data.datasets[0].data = datasetDatas;
    chart.options.scales.yAxes[0].labels = yLabels;
    chart.update();
}, 1000);


function unixTime2ymd(intTime){
    const d = new Date(intTime);
    const hour = ( '0' + d.getHours() ).slice(-2);
    const min  = ( '0' + d.getMinutes() ).slice(-2);
    const sec   = ( '0' + d.getSeconds() ).slice(-2);

    return( hour + ':' + min + ':' + sec );
}

const ctx = document.getElementById("chart").getContext('2d');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: "",
                borderColor: 'rgb(255, 0, 0)',
                lineTension: 0,
                fill: false,
                data: [],
            },
        ]
    },
    options: {
        responsive: false,
        scales: {
            yAxes: [{
                type: 'category',
                labels:[]
            }],
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10 //値の最大表示数
                }
            }]
        }
    }
});

const request = new XMLHttpRequest();
request.open("get", chartURL + '/api/get/tracker/' + trackerID, false);
request.send(null);
tracker = JSON.parse(request.responseText);
let datasetLabel = tracker[0].trackerName;
let xLabels = [];
let datasetDatas = [];
let yLabels = [];
for(let data of tracker[0].Location){
        datasetDatas.push(data.place);
        yLabels.push(data.place);
        xLabels.push(unixTime2ymd(data.time));
}

yLabels = yLabels.filter((x, i, self) => {
    return self.indexOf(x) === i;
});

chart.data.labels = xLabels;
chart.data.datasets[0].label = datasetLabel;
chart.data.datasets[0].data = datasetDatas;
chart.options.scales.yAxes[0].labels = yLabels;
chart.update();
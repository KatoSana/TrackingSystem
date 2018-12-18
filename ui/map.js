'use strict';

const URL = 'http://127.0.0.1:3000';
let trackers = [];
let backImage;
let alartTrackedPeople;
let TrackedPeople;
let flop = false;
const button = document.getElementById("chengeFunc");
button.onclick = changeFlop;


setInterval(()=> {
    const request = new XMLHttpRequest();
    if(flop) {
        request.open("get", URL + '/api/get/tracker/raw', false);
    } else {
        request.open("get", URL + '/api/get/tracker/', false);
    }
    console.log(flop);
    request.send(null);
    trackers = JSON.parse(request.responseText);
}, 1000);

function changeFlop() {
    if(flop) {
        flop = false;
    } else {
        flop = true;
    }
}

function unixTime2ymd(intTime){
    const d = new Date(intTime);
    const year  = d.getFullYear();
    const month = d.getMonth() + 1;
    const day  = d.getDate();
    const hour = ( '0' + d.getHours() ).slice(-2);
    const min  = ( '0' + d.getMinutes() ).slice(-2);
    const sec   = ( '0' + d.getSeconds() ).slice(-2);

    return( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec );

}

function setup() {
    const canvas = createCanvas(1020, 645);//katchimi=(1320, 768)
    canvas.parent("map");
    backImage = loadImage("./assets/lab3f.png");
    alartTrackedPeople = loadImage("./assets/ruser.png");
    TrackedPeople = loadImage("./assets/user.png");

}

function draw() {
    background(255);
    image(backImage, 0, 0, 0);
    for(let tracker of trackers) {
        if(tracker.Alart){
            textSize(20);
            textAlign(LEFT, TOP);
            fill(color('red'));
            text(tracker.trackerName + "さんが立入禁止区域に侵入しています！",
                tracker.Location.grid.x + 30, tracker.Location.grid.y + 30);
            image(alartTrackedPeople, tracker.Location.grid.x, tracker.Location.grid.y);
        }else if(tracker.timeOut) {
            textSize(20);
            textAlign(LEFT, TOP);
            fill(color('red'));
            text(tracker.trackerName + "さんを見失いました！",
                tracker.Location.grid.x + 30, tracker.Location.grid.y + 30);
            image(alartTrackedPeople, tracker.Location.grid.x, tracker.Location.grid.y);
        }else{
            image(TrackedPeople, tracker.Location.grid.x, tracker.Location.grid.y);
        }
        if (mouseX - 12 < tracker.Location.grid.x + 10 && tracker.Location.grid.x  - 10 < mouseX - 12) {
            if (mouseY - 12 < tracker.Location.grid.y + 10 && tracker.Location.grid.y - 10 < mouseY - 12) {
                textSize(20);
                fill(color('black'));
                textAlign(LEFT, TOP);
                text(tracker.trackerName + "\n" + unixTime2ymd(tracker.Location.time),
                    tracker.Location.grid.x + 30, tracker.Location.grid.y + 30);
            }
        }
    }
}
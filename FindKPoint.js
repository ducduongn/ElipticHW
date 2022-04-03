const ObjectsToCsv = require('objects-to-csv')


const p1 = 127,
  p2 = 827,
  A = 9,
  B = 14;

const P1 = {
    x: 6,
    y: 41
},
    P2 = {
        x: 12,
        y: 14
    };
const P3 = {
    x: 5,
    y: 1
}

function addPoint(pointP1, pointP2, p) {
    // console.log(pointP1, pointP2)
    let lamda;
    let pointResult = {};
    if (pointP1.x === pointP2.x && pointP1.y === pointP2.y) {
        let lamdaX = Math.abs(Math.round(1 / 2 * pointP1.y * p));
        let lamdaY = (3 * Math.pow(pointP1.x, 2) + A) % p;
        // console.log(lamdaY);
        // console.log(lamdaX);
        lamda = (lamdaX * lamdaY) % p;
    } else {
        let lamdaY = Math.abs(pointP2.y - pointP1.y);
        let lamdaX;
        if (pointP1.x - pointP2.x === 1) {
            lamdaX = 1;
        }  else {
            lamdaX = Math.abs(Math.round((1 / (pointP2.x - pointP1.x) * p)));
        }
        // console.log(lamdaY);
        // console.log(lamdaX);
        lamda = (lamdaX * lamdaY) % p;
    }
    // console.log(lamda);
    let resultX = (lamda * lamda - pointP1.x - pointP2.x);
    if (resultX > 0) {
        pointResult.x = resultX % p;
    } else {
        pointResult.x = resultX % p + p;
    }
    let resultY = (lamda * (pointP1.x - pointResult.x) - pointP1.y);
    if (resultY > 0) {
        pointResult.y = resultY % p;
    } else {
        pointResult.y = resultY % p + p;
    }
    // console.log(pointResult);
    return pointResult;
}

const arrayKPoint1 = [],
    arrayKPoint2 = [];


function getKPoint(point, p, arrayKPoint) {
    let i = 1
    let oldPoint = JSON.parse(JSON.stringify(point));
    let newPoint = JSON.parse(JSON.stringify(point));

    while (i < p) {
        let savePoint = JSON.parse(JSON.stringify(newPoint));
        newPoint = addPoint( 
            JSON.parse(JSON.stringify(newPoint)),  
            JSON.parse(JSON.stringify(oldPoint)),
            p);
        i++;
        oldPoint = savePoint;
        arrayKPoint.push({
            k: i,
            x: newPoint.x,
            y: newPoint.y
        })
    }
}
getKPoint(P1, p1, arrayKPoint1);
getKPoint(P2, p2, arrayKPoint2);

const kPointArrayCsv1 = new ObjectsToCsv(arrayKPoint1);
const kPointArrayCsv2 = new ObjectsToCsv(arrayKPoint2);

async function createCsv(csv, path) {
  await csv.toDisk(path)
}

createCsv(kPointArrayCsv1, './BangKP(127).csv').then(function () {
  console.log("Promise Resolved");
}).catch(function () {
  console.log("Promise Rejected");
});

createCsv(kPointArrayCsv2, './BangKP(827).csv').then(function () {
  console.log("Promise Resolved");
}).catch(function () {
  console.log("Promise Rejected");
});
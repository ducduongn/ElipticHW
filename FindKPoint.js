const ObjectsToCsv = require('objects-to-csv')


const p1 = 127,
    p2 = 827,
    A1 = 31,
    B1 = 31,
    A2 = 19,
    B2 = 17,
    numPoint1 = 131,
    numPoint2 = 829;

const P1 = {
    x: 19,
    y: 42
},
    P2 = {
        x: 16,
        y: 44
    };
const P3 = {
    x: 5,
    y: 1
}

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
};

function modInverse(a, m) {
    let m0 = m;
    let y = 0;
    let x = 1;

    if (m == 1)
        return 0;

    while (a > 1) {

        // q is quotient
        let q = parseInt(a / m);
        let t = m;

        // m is remainder now,
        // process same as
        // Euclid's algo
        m = a % m;
        a = t;
        t = y;

        // Update y and x
        y = x - q * y;
        x = t;
    }

    // Make x positive
    if (x < 0)
        x += m0;

    return x;
}

function mod(n, p) {
    if (n < 0)
        n = p - Math.abs(n) % p;

    return n % p;
}


function addPoint(pointP1, pointP2, p, A, B) {
    console.log(pointP1, pointP2)
    let lamda, lamdaDenominator, lamdaNumerator;
    let pointResult = {};
    if (pointP1.x === pointP2.x && pointP1.y === pointP2.y) {
        lamdaNumerator = 3 * pointP1.x * pointP1.x + A;
        lamdaDenominator = 2 * pointP1.y;
        console.log("yess");
    } else {
        lamdaNumerator = pointP2.y - pointP1.y;
        lamdaDenominator = pointP2.x - pointP1.x;
    }
    let gcdPoint = gcd(lamdaNumerator, lamdaDenominator);
    console.log("lamdaNumerator: " + lamdaNumerator);
    console.log("lamdaDenominator: " + lamdaDenominator);
    lamdaNumerator = lamdaNumerator / gcdPoint;
    lamdaDenominator = lamdaDenominator / gcdPoint;
    if ((lamdaNumerator < 0 && lamdaDenominator < 0) 
    || (lamdaNumerator > 0 && lamdaDenominator < 0)) {
        lamdaNumerator = lamdaNumerator * -1;
        lamdaDenominator = lamdaDenominator * -1;
    }
    lamda = mod((mod(lamdaNumerator, p) * modInverse(lamdaDenominator, p)), p);
    console.log("lamdaNumerator: " + lamdaNumerator);
    console.log("lamdaDenominator: " + lamdaDenominator);
    console.log("lamda: " + lamda);
    pointResult.x = mod(lamda * lamda - pointP1.x - pointP2.x, p);
    pointResult.y = mod(lamda * (pointP1.x - pointResult.x) - pointP1.y, p);
    // console.log(pointResult);
    return pointResult;
}

const arrayKPoint1 = [],
    arrayKPoint2 = [];

function getKPoint(point, p, arrayKPoint, A, B, numPoint) {
    let i = 2
    let oldPoint = JSON.parse(JSON.stringify(point));
    let newPoint = JSON.parse(JSON.stringify(point));
    arrayKPoint.push({
        k: 1,
        x: oldPoint.x,
        y: oldPoint.y
    });

    while (i <= numPoint) {
        console.log("I: "+ i)
        newPoint = addPoint(
            JSON.parse(JSON.stringify(newPoint)),
            JSON.parse(JSON.stringify(oldPoint)),
            p,
            A,
            B);
        if (i < numPoint) {
            arrayKPoint.push({
                k: i,
                x: newPoint.x,
                y: newPoint.y
            })
        } else {
            arrayKPoint.push({
                k: i,
                x: "infinite",
                y: "infinite"
            })
        }
        i++;
    }
}
getKPoint(P1, p1, arrayKPoint1, A1, B1, numPoint1);
getKPoint(P2, p2, arrayKPoint2, A2, B2, numPoint2);

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
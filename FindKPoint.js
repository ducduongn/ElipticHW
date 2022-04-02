const p1 = 127,
  p2 = 827,
  A = 23,
  B = 124;


const P1 = {
    x: 7,
    y: 45
},
P2 = {
    x: 6,
    p: 89
};

function addPoint(pointP1, pointP2) {
    let lamda = (3 *  Math.pow(pointP1.x, 2) + A) / 2*pointP1.y; 
    console.log(lamda);
    let pointResult = {};
    pointResult.x = lamda * lamda - pointP1.x - pointP2.x;
    pointResult.y = lamda * (pointP1.x - pointResult.x) - pointP1.y;
console.log(pointResult);
    return pointResult;
} 
addPoint({
    x: 5,
    y: 1
},
{
    x: 5,
    y: 1
});  
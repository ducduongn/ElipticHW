const ObjectsToCsv = require('objects-to-csv')

const p1 = 127,
  p2 = 827,
  A1 = 31,
  B1 = 31,
  A2 = 19,
  B2 = 17;

let pointArray1 = [],
  pointArray2 = [];

function getPointListmap(p, pointArray, A, B) {
  let mapQp = new Map();

  for (let i = 0; i <= (p - 1) / 2; i++) {
    let result = (i * i) % p;
    let data = {
      qSet: result,
      ySet: [i, p - i]
    }
    mapQp.set(result, data);
  }

  // console.log(mapQp)
  let count = 0;

  for (let i = 0; i < p; i++) {
    let elipticFunc = (i * i * i + A * i + B) % p;
    // console.log(i + ": " + elipticFunc + "-" + p)
    if (elipticFunc === 0) {
      // console.log(i + " :YES")
      count++;
      pointArray.push({
        x: i,
        y: 0
      })
    } else {
      if (mapQp.has(elipticFunc)) {
        count++;
        pointArray.push({
          x: i,
          y: mapQp.get(elipticFunc).ySet[0]
        });
        count++;
        pointArray.push({
          x: i,
          y: mapQp.get(elipticFunc).ySet[1]
        })
      }
    }
  }
  return count;
}

function printResult(pointArray, p, A, B) {
  let count = getPointListmap(p, pointArray, A, B);
  console.log(`Danh sách các điểm thuộc đường cong Eliptic với p = ${p}, có ${count + 1} điểm: `)
  // pointArray.forEach(point => {
  //   console.log(point)
  // })
}
printResult(pointArray1, p1, A1, B1);
printResult(pointArray2, p2, A2, B2);

const pointArrayCsv1 = new ObjectsToCsv(pointArray1);
const pointArrayCsv2 = new ObjectsToCsv(pointArray2);

async function createCsv(csv, path) {
  await csv.toDisk(path)
}

createCsv(pointArrayCsv1, './pointList1.csv').then(function () {
  console.log("Promise Resolved");
}).catch(function () {
  console.log("Promise Rejected");
});

createCsv(pointArrayCsv2, './pointList2.csv').then(function () {
  console.log("Promise Resolved");
}).catch(function () {
  console.log("Promise Rejected");
});
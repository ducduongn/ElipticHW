const p1 = 127,
  p2 = 827,
  A = 2,
  B = 11;

let pointArray1 = [],
  pointArray2 = [];

function getPointListmap(p, pointArray) {
  let mapQp = new Map();

  for (let i = 1; i <= (p - 1) / 2; i++) {
    let result = (i * i) % p;
    let data = {
      qSet: result,
      ySet: [i, p - i]
    }
    mapQp.set(result, data);
  }

  // console.log(mapQp)
  let count = 0;

  for (let i = 0; i < p - 1; i++) {
    let elipticFunc = (i * i * i + A * i + B) % p;
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
        pointArray.push({
          x: i,
          y: mapQp.get(elipticFunc).ySet[1]
        })
      }
    }
  }
}

function printResult(pointArray, p) {
  getPointListmap(p, pointArray);
  console.log(`Danh sách các điểm thuộc đường cong Eliptic với p = ${p}`)
  pointArray1.forEach(point => {
    console.log(point)
  })
}
printResult(pointArray1, p1);
printResult(pointArray2, p2);
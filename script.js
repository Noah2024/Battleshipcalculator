
const row = 10;
const col = 10;
const shipsLen = {"carrier": [1,1,1,1,1], "battleship": [1,1,1,1], "crusier": [1,1,1], "submarine": [1,1,1], "destroyer": [1,1]};
const shipsLeft = ["carrier", "battleship", "crusier", "submarine", "destroyer"]

function create2dArray(row, col){
    array = Array.from({"length": row}, () => 
        Array.from({"length": col}, () => 0)
    );
    return array;
}

function addArrays(arr1, arr2) {//Github Copilot generated
    if (arr1.length !== arr2.length) {
        throw new Error("Arrays must have the same length");
    }
    return arr1.map((val, index) => val + arr2[index]);
}

function sumArray(arr){
    return arr.reduce((sum, val) => sum + val, 0);
}

let statusArray = create2dArray(row, col);
let probArray = create2dArray(row, col);

//statusArray[0][5] = 1;
console.log(statusArray, probArray);

function updateHorizontalProb() {
    for (const ship of shipsLeft){
        const curtShipArr = shipsLen[ship];
        const curtShipLen = shipsLen[ship].length;
        console.log(curtShipArr);
        for (let i = 0; i < row; i +=1){
            for (let j = 0; j <= col; j += 1){
                if (sumArray(statusArray.slice(j, j+curtShipLen)) != 0){
                    console.log(col);
                    console.log(j+curtShipLen);
                    startOnes = Array();
                    endOnes = Array();//col-(j+curtShipLen)
                }
            }
        }
    }
}

updateHorizontalProb();

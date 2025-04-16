
const row = 10;
const col = 10;
const shipsLen = {"carrier": "11111", "battleship": "1111", "crusier": "111", "submarine": "111", "destroyer": "11"};
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
            for (let j = 0; j+curtShipLen <= col; j += 1){
                if (sumArray(statusArray.slice(j, j+curtShipLen)) != 0){//Checks if there are any ones in the status array
                    const endOffset = col-(j+curtShipLen) //The offset from the front added to allow the addition of the arrays
                    const startOffset  = j //The offset from the back added to allow the addition of the arrays
                    let addlArray = "0".repeat(startOffset) + curtShipArr + "0".repeat(endOffset);
                    addlArray = addlArray.split("").map(Number);//Convert string to array
                    probArray[i] = addArrays(probArray[i], addlArray);
                }
                console.log(probArray[i]);
            }
        }
    }
    console.log(probArray);
}

updateHorizontalProb();

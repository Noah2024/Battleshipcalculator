
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

function sumStr(str){
    let sum = 0;
    str.split("").map((num) => sum += parseInt(num, 10));
    return sum;
    //arr.reduce((sum, val) => sum + val, 0); used for summingArrays
}

statusArray = Array.from({length: row}, () => "0".repeat(col));
let probArray = create2dArray(row, col);

statusArray[1] = "1111111000";
console.log(statusArray, probArray);

function updateHorizontalProb() {
    for (const ship of shipsLeft){
        const curtShipArr = shipsLen[ship];
        const curtShipLen = shipsLen[ship].length;
        console.log(curtShipArr);
        for (let i = 0; i < row; i +=1){
            for (let j = 0; j+curtShipLen <= col; j += 1){//sumArray(statusArray.slice(j, j+curtShipLen)
                if (sumStr(statusArray[i].slice(j, j+curtShipLen)) == 0){//Checks if there are any ones in the status array
                    const endOffset = col-(j+curtShipLen) //The offset from the front added to allow the addition of the arrays
                    const startOffset  = j //The offset from the back added to allow the addition of the arrays
                    let addlArray = "0".repeat(startOffset) + curtShipArr + "0".repeat(endOffset);
                    addlArray = addlArray.split("").map(Number);//Convert string to array
                    probArray[i] = addArrays(probArray[i], addlArray);
                }
            }
        }
    }
    console.log(probArray);
}

function updateVerticalProb() {
    for (const ship of shipsLeft){
        const curtShipArr = shipsLen[ship];
        const curtShipLen = shipsLen[ship].length;
        console.log(curtShipArr);
        for (let i = 0; i < col; i +=1){
            const verticalSlice = statusArray.slice(i, i+curtShipLen)
        }
    console.log(probArray);
    }
}

updateHorizontalProb()
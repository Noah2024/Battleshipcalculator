
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

function createArrays(){
    let allChanceArray = create2dArray(row, col);
    let probArray = create2dArray(row, col);
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

function updateHorizontalProb() {
    for (const ship of shipsLeft){
        const curtShipArr = shipsLen[ship];
        const curtShipLen = shipsLen[ship].length;

        for (let i = 0; i < row; i +=1){

            for (let j = 0; j+curtShipLen <= col; j += 1){//sumArray(statusArray.slice(j, j+curtShipLen)
                if (sumStr(statusArray[i].slice(j, j+curtShipLen)) == 0){//Checks if there are any ones in the status array
                    const endOffset = col-(j+curtShipLen) //The offset from the front added to allow the addition of the arrays
                    const startOffset  = j //The offset from the back added to allow the addition of the arrays
                    let addlArray = "0".repeat(startOffset) + curtShipArr + "0".repeat(endOffset);
                    addlArray = addlArray.split("").map(Number);//Convert string to array
                    allChanceArray[i] = addArrays(allChanceArray[i], addlArray);
                }
            }
        }
    }
}

function updateVerticalProb() {
    for (const ship of shipsLeft){
        const curtShipArr = shipsLen[ship];
        const curtShipLen = shipsLen[ship].length;

        for (let i = 0; i < col; i +=1){
            let verticalSlice = "";
            statusArray.map((val) => verticalSlice += val[i]);

            for (let j = 0; j+curtShipLen <= row; j += 1){
                if (sumStr(verticalSlice.slice(j, j+curtShipLen)) == 0){//Checks if there are any ones in the status array
                    const endOffset = row-(j+curtShipLen) //The offset from the front added to allow the addition of the arrays
                    const startOffset  = j //The offset from the back added to allow the addition of the arrays
                    let addlArray = "0".repeat(startOffset) + curtShipArr + "0".repeat(endOffset);
                    addlArray = addlArray.split("").map(Number);//Convert string to array
                    allChanceArray[i] = addArrays(allChanceArray[i], addlArray);
                    
                    for (let k = 0; k < row; k++) {//updatig prob array colum wise
                        allChanceArray[k][i] += addlArray[k];
                    }
                    
                }
            }
        }
    }
}

function updateProbArray(){
    sum = 0;
    for (let i = 0; i < row; i += 1){
        allChanceArray[i].map((val) => sum += val);
    }
    for (let i = 0; i < row; i += 1){
        allChanceArray[i].map((val, index) => probArray[i][index] = val/sum);
    }
}

function setStatusArray(row, col, value){
    statusArray[row] = statusArray[row].substring(0, col) + value + statusArray[row].substring(col + 1);
    updateHorizontalProb();
    updateVerticalProb();
    updateProbArray();
}

function getStatusArray(){
    return statusArray;
}

//exmpleUsage
//setStatusArray(1, 0, "1");
//setStatusArray(9, 1, "1");
//spdateHorizontalProb();
//spdateVerticalProb();
//spdateProbArray();
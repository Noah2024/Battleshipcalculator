
const row = 10;
const col = 10;
const shipsLeft = {5: [1], 4: [1], 3: [2], 2: [1]};

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

let statusArray = create2dArray(row, col);
let probArray = create2dArray(row, col);


statusArray[0][5] = 1;
console.log(statusArray, probArray);

let continousSpaces = 0; 
let startCount = 0;
let endCount = 0;
let curtShipLen = 2;//Need to create default state for the
for (let i = 0; i < row; i+=1){
    for (let j = 0; j < col; j+=1){
        
        continousSpaces += 1;
    }
}
console.log(addArrays([0,2,0], [1,1,1]));
/*if (statusArray[i][j] != 0){
    if (j - continousSpaces <! 0){
        let start = j - continousSpaces;
        let end = j;
        console.log(continousSpaces)
    }else{
        continue;
    }
}*/
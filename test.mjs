// Correct ES Module syntax
function addArrays(arr1, arr2) {//Github Copilot generated
    if (arr1.length !== arr2.length) {
        throw new Error("Arrays must have the same length");
    }
    return arr1.map((val, index) => val + arr2[index]);
}

console.log(addArrays([1, 2], [3, 4]));
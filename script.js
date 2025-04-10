const row = 10;
const col = 10;

let array = Array.from({"length": row}, () => 
    Array.from({"length": col}, () => 0)
);
console.log(array);
console.log(array[0]);
console.log(array[0][0]);
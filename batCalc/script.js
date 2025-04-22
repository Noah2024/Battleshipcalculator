export class gameSpace {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.shipsLen = {
            "carrier": "11111",
            "battleship": "1111",
            "crusier": "111",
            "submarine": "111",
            "destroyer": "11"
        };
        this.shipsLeft = ["carrier", "battleship", "crusier", "submarine", "destroyer"];
        this.statusArray = Array.from({ length: row }, () => "0".repeat(col));
        this.numChanceArray = this.create2dArray(row, col);
        this.probArray = this.create2dArray(row, col);
        this.updateHorizontalProb();
        this.updateVerticalProb();
        this.updateProbArray();
    }

    create2dArray(row, col) {
        return Array.from({ length: row }, () => Array.from({ length: col }, () => 0));
    }

    addArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            throw new Error("Arrays must have the same length");
        }
        return arr1.map((val, index) => val + arr2[index]);
    }

    sumStr(str) {
        let sum = 0;
        str.split("").map((num) => sum += parseInt(num, 10));
        return sum;
    }

    zeroProbArrays(){
        this.numChanceArray = this.create2dArray(this.row, this.col);
        this.probArray = this.create2dArray(this.row, this.col);
    }

    updateHorizontalProb() {
        for (const ship of this.shipsLeft) {
            const curtShipArr = this.shipsLen[ship];
            const curtShipLen = this.shipsLen[ship].length;
            for (let i = 0; i < this.row; i += 1) {
                for (let j = 0; j + curtShipLen <= this.col; j += 1) {
                    if (this.sumStr(this.statusArray[i].slice(j, j + curtShipLen)) == 0) {
                        const endOffset = this.col - (j + curtShipLen);
                        const startOffset = j;
                        let addlArray = "0".repeat(startOffset) + curtShipArr + "0".repeat(endOffset);
                        addlArray = addlArray.split("").map(Number);
                        this.numChanceArray[i] = this.addArrays(this.numChanceArray[i], addlArray);
                    }
                }
            }
        }
    }

    updateVerticalProb() {
        for (const ship of this.shipsLeft) {
            const curtShipArr = this.shipsLen[ship];
            const curtShipLen = this.shipsLen[ship].length;

            for (let i = 0; i < this.col; i += 1) {
                let verticalSlice = "";
                this.statusArray.map((val) => verticalSlice += val[i]);

                for (let j = 0; j + curtShipLen <= this.row; j += 1) {
                    if (this.sumStr(verticalSlice.slice(j, j + curtShipLen)) == 0) {
                        const endOffset = this.row - (j + curtShipLen);
                        const startOffset = j;
                        let addlArray = "0".repeat(startOffset) + curtShipArr + "0".repeat(endOffset);
                        addlArray = addlArray.split("").map(Number);

                        for (let k = 0; k < this.row; k++) {
                            this.numChanceArray[k][i] += addlArray[k];
                        }
                    }
                }
            }
        }
    }

    updateProbArray() {
        let sum = 0;
        for (let i = 0; i < this.row; i += 1) {
            this.numChanceArray[i].map((val) => sum += val);
        }
        for (let i = 0; i < this.row; i += 1) {
            this.numChanceArray[i].map((val, index) => this.probArray[i][index] = val / sum);
        }
    }

    setStatusArray(row, col, value) {
        this.zeroProbArrays();
        this.statusArray[row] = this.statusArray[row].substring(0, col) + value + this.statusArray[row].substring(col + 1);
        this.updateHorizontalProb();
        this.updateVerticalProb();
        this.updateProbArray();
    }

    getStatusArray() {
        return this.statusArray;
    }

    getNumChanceArray() {
        return this.numChanceArray;
    }

    getProbArray() {
        return this.probArray;
    }
}

// Example Usage
// const game = new gameSpace(10, 10);
// console.log(game.getProbArray());
// game.setStatusArray(0, 0, "1");
// console.log(game.getProbArray());

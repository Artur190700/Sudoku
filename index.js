let id = 1;
let bigCellID = 1;
let selectedNum;
let firstCell;
let duplicate_elements = [];
const arr = [];
const gameLevel = ["easy", "medium", "hard"];
let gameEndOr = false;
let stringID = 0;
let srt = '';
let defaultLevel = 'easy';
let isError = false;

const libIdMap = {
    1: "1-1",
    2: "1-2",
    3: "1-3",
    4: "2-1",
    5: "2-2",
    6: "2-3",
    7: "3-1",
    8: "3-2",
    9: "3-3",
    10: "1-4",
    11: "1-5",
    12: "1-6",
    13: "2-4",
    14: "2-5",
    15: "2-6",
    16: "3-4",
    17: "3-5",
    18: "3-6",
    19: "1-7",
    20: "1-8",
    21: "1-9",
    22: "2-7",
    23: "2-8",
    24: "2-9",
    25: "3-7",
    26: "3-8",
    27: "3-9",
    28: "4-1",
    29: "4-2",
    30: "4-3",
    31: "5-1",
    32: "5-2",
    33: "5-3",
    34: "6-1",
    35: "6-2",
    36: "6-3",
    37: "4-4",
    38: "4-5",
    39: "4-6",
    40: "5-4",
    41: "5-5",
    42: "5-6",
    43: "6-4",
    44: "6-5",
    45: "6-6",
    46: "4-7",
    47: "4-8",
    48: "4-9",
    49: "5-7",
    50: "5-8",
    51: "5-9",
    52: "6-7",
    53: "6-8",
    54: "6-9",
    55: "7-1",
    56: "7-2",
    57: "7-3",
    58: "8-1",
    59: "8-2",
    60: "8-3",
    61: "9-1",
    62: "9-2",
    63: "9-3",
    64: "7-4",
    65: "7-5",
    66: "7-6",
    67: "8-4",
    68: "8-5",
    69: "8-6",
    70: "9-4",
    71: "9-5",
    72: "9-6",
    73: "7-7",
    74: "7-8",
    75: "7-9",
    76: "8-7",
    77: "8-8",
    78: "8-9",
    79: "9-7",
    80: "9-8",
    81: "9-9",
}
function start() {
    let square = document.querySelector('.square');
    for (let i = 0; i < 9; i++) {
        let bigCell = document.createElement('div');
        bigCell.classList.add('bigCell');
        bigCell.id = "big - " + bigCellID;
        id = 1;
        square.appendChild(bigCell);
        bigCell.classList.add('board');
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = bigCellID + "-" + id++;
            bigCell.appendChild(cell);
            cells.push({ id: cell.id });
            cell.setAttribute('columID', getColumnID(i, j));
            cell.setAttribute('rowID', getRowID(i, j, cell));
            cell.classList.add('board');
            cell.addEventListener('click', (e) => {
                let cells = document.querySelectorAll(".cell");
                for (let i = 0; i < cells.length; i++) {
                    const element = cells[i];
                    element.style.backgroundColor = '';
                }
                if (e.target) {
                    if (selectedNum != undefined) {
                        if (e.target.classList.contains('notBeTouched') && selectedNum == 10) {
                            console.error('Not Possible to Clean this number ' + e.target.innerHTML)
                        }
                        if (selectedNum == 10 && !e.target.classList.contains('notBeTouched')) {
                            e.target.innerHTML = '';
                            checkAllCell();
                            pushElements();
                            e.target.setAttribute('Error', 'False')
                        }
                        else if (!e.target.classList.contains('notBeTouched')) {

                            e.target.innerHTML = selectedNum;
                            firstCell = e.target;

                            pushElements();
                            checkAllCell();
                            checkGameStatus(str);
                        }
                    }
                }
            })
        }
        bigCellID++;
    }
    generateSudoku(defaultLevel);
}
function numDrop(num) {
    if (document.getElementById(selectedNum)) {
        if (document.getElementById(selectedNum).id != document.getElementById(num).id) {
            document.getElementById(selectedNum).classList.add('numbersButton');
            document.getElementById(selectedNum).classList.remove('active');
        }
    }
    let oldButton = document.getElementById(num);
    oldButton.classList.add('active');
    selectedNum = num;


}
function getRandomNum() {
    return Math.floor(Math.random() * numbers.length);
}
function getRandomId() {
    return Math.floor(Math.random() * id)
}
start();
function getColumnID(i, j) {
    // if(( i ==0 && j ==0) ||(i ==0 && j == 3 )|| (i == 0 && j == 6) || ( i == 3 && j == 0) ||(i ==3 && j == 3 )|| (i == 3 && j == 6)|| ( i == 6 && j == 0) ||(i ==6 && j == 3 )|| (i == 6 && j == 6)){
    if ([0, 3, 6].includes(i) && [0, 3, 6].includes(j)) {
        return 1;
    } else if ((i == 0 && j == 1) || (i == 0 && j == 4) || (i == 0 && j == 7) || (i == 3 && j == 1) || (i == 3 && j == 4) || (i == 3 && j == 7) || (i == 6 && j == 1) || (i == 6 && j == 4) || (i == 6 && j == 7)) {
        return 2
    } else if ((i == 0 && j == 2) || (i == 0 && j == 5) || (i == 0 && j == 8) || (i == 3 && j == 2) || (i == 3 && j == 5) || (i == 3 && j == 8) || (i == 6 && j == 2) || (i == 6 && j == 5) || (i == 6 && j == 8)) {
        return 3
    } else if ((i == 1 && j == 0) || (i == 1 && j == 3) || (i == 1 && j == 6) || (i == 4 && j == 0) || (i == 4 && j == 3) || (i == 4 && j == 6) || (i == 7 && j == 0) || (i == 7 && j == 3) || (i == 7 && j == 6)) {
        return 4
    } else if ((i == 1 && j == 1) || (i == 1 && j == 4) || (i == 1 && j == 7) || (i == 4 && j == 1) || (i == 4 && j == 4) || (i == 4 && j == 7) || (i == 7 && j == 1) || (i == 7 && j == 4) || (i == 7 && j == 7)) {
        return 5
    } else if ((i == 1 && j == 2) || (i == 1 && j == 5) || (i == 1 && j == 8) || (i == 4 && j == 2) || (i == 4 && j == 5) || (i == 4 && j == 8) || (i == 7 && j == 2) || (i == 7 && j == 5) || (i == 7 && j == 8)) {
        return 6
    } else if ((i == 2 && j == 0) || (i == 2 && j == 3) || (i == 2 && j == 6) || (i == 5 && j == 0) || (i == 5 && j == 3) || (i == 5 && j == 6) || (i == 8 && j == 0) || (i == 8 && j == 3) || (i == 8 && j == 6)) {
        return 7
    } else if ((i == 2 && j == 1) || (i == 2 && j == 4) || (i == 2 && j == 7) || (i == 5 && j == 1) || (i == 5 && j == 4) || (i == 5 && j == 7) || (i == 8 && j == 1) || (i == 8 && j == 4) || (i == 8 && j == 7)) {
        return 8
    } else if ((i == 2 && j == 2) || (i == 2 && j == 5) || (i == 2 && j == 8) || (i == 5 && j == 2) || (i == 5 && j == 5) || (i == 5 && j == 8) || (i == 8 && j == 2) || (i == 8 && j == 5) || (i == 8 && j == 8)) {
        return 9
    }
}
function getRowID(i, j) {
    if ((i == 0 && j == 0) || (i == 0 && j == 1) || (i == 0 && j == 2) || (i == 1 && j == 0) || (i == 1 && j == 1) || (i == 1 && j == 2) || (i == 2 && j == 0) || (i == 2 && j == 1) || (i == 2 && j == 2)) {
        return 1;
    } else if ((i == 0 && j == 3) || (i == 0 && j == 4) || (i == 0 && j == 5) || (i == 1 && j == 3) || (i == 1 && j == 4) || (i == 1 && j == 5) || (i == 2 && j == 3) || (i == 2 && j == 4) || (i == 2 && j == 5)) {
        return 2
    } else if ((i == 0 && j == 6) || (i == 0 && j == 7) || (i == 0 && j == 8) || (i == 1 && j == 6) || (i == 1 && j == 7) || (i == 1 && j == 8) || (i == 2 && j == 6) || (i == 2 && j == 7) || (i == 2 && j == 8)) {
        return 3
    } else if ((i == 3 && j == 0) || (i == 3 && j == 1) || (i == 3 && j == 2) || (i == 4 && j == 0) || (i == 4 && j == 1) || (i == 4 && j == 2) || (i == 5 && j == 0) || (i == 5 && j == 1) || (i == 5 && j == 2)) {
        return 4
    } else if ((i == 3 && j == 3) || (i == 3 && j == 4) || (i == 3 && j == 5) || (i == 4 && j == 3) || (i == 4 && j == 4) || (i == 4 && j == 5) || (i == 5 && j == 3) || (i == 5 && j == 4) || (i == 5 && j == 5)) {
        return 5
    } else if ((i == 3 && j == 6) || (i == 3 && j == 7) || (i == 3 && j == 8) || (i == 4 && j == 6) || (i == 4 && j == 7) || (i == 4 && j == 8) || (i == 5 && j == 6) || (i == 5 && j == 7) || (i == 5 && j == 8)) {
        return 6
    } else if ((i == 6 && j == 0) || (i == 6 && j == 1) || (i == 6 && j == 2) || (i == 7 && j == 0) || (i == 7 && j == 1) || (i == 7 && j == 2) || (i == 8 && j == 0) || (i == 8 && j == 1) || (i == 8 && j == 2)) {
        return 7
    } else if ((i == 6 && j == 3) || (i == 6 && j == 4) || (i == 6 && j == 5) || (i == 7 && j == 3) || (i == 7 && j == 4) || (i == 7 && j == 5) || (i == 8 && j == 3) || (i == 8 && j == 4) || (i == 8 && j == 5)) {
        return 8
    } else if ((i == 6 && j == 6) || (i == 6 && j == 7) || (i == 6 && j == 8) || (i == 7 && j == 6) || (i == 7 && j == 7) || (i == 7 && j == 8) || (i == 8 && j == 6) || (i == 8 && j == 7) || (i == 8 && j == 8)) {
        return 9
    }
}
function pushElements() {
    let arr = [];
    let allCell = document.querySelectorAll('.cell');
    for (let i = 0; i < allCell.length; i++) {
        const element = allCell[i];
        let rowId = element.getAttribute('rowID');
        if (rowId == '1') {
            arr.push(element);
            // let repeatingNumbers = arr1.filter((value,index,self) => self.indexOf(value) ==index);
            // if(repeatingNumbers.length >2){
            //     if(repeatingNumbers[0].innerHTML == repeatingNumbers[i].innerHTML){
            //         element.classList.add('error');
            //         console.log(arr1);
            //     }
            // }
        } else if (rowId == '2') {
            arr.push(element);

        } else if (rowId == '3') {
            arr.push(element);

        } else if (rowId == '4') {
            arr.push(element);

        } else if (rowId == '5') {
            arr.push(element);

        } else if (rowId == '6') {
            arr.push(element);

        } else if (rowId == '7') {
            arr.push(element);

        } else if (rowId == '8') {
            arr.push(element);

        } else if (rowId == '9') {
            arr.push(element);

        }
    }
    // console.log(arr);
    checkElementAttribute(arr);
}
function checkElementAttribute(array) {
    const arr = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const columID = element.getAttribute("columID")
        if (columID == '1') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '2') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '3') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '4') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '5') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '6') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '7') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '8') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        } else if (columID == '9') {
            if (element.innerHTML != '') {
                arr.push(element);

            }
        }
    }
    // console.log(arr);
    if (arr.length >= 2) {
        // const found = arr.includes((element)=> element.innerHTML == arr[0].innerHTML);
        // const filtered = arr.includes((a, b) => a.innerHTML == b.innerHTML);
        // console.log(found);
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            for (let j = 0; j < arr.length; j++) {
                const element2 = arr[j];
                if (i === j) {
                    continue;
                }
                else {
                    if (arr[i].innerHTML === arr[j].innerHTML) {
                        duplicate_elements.push(arr[i]);
                        const firstAttributeRow = arr[i].getAttribute('rowID');
                        const secondAttributeRow = arr[j].getAttribute('rowID');
                        const firstAttributeColumn = arr[i].getAttribute('columID');
                        const secondAttributeColumn = arr[j].getAttribute('columID');
                        if (firstAttributeRow === secondAttributeRow) {
                            element.style.backgroundColor = 'red';
                            element2.style.backgroundColor = 'red';
                            element.setAttribute("error", "True");
                            element2.setAttribute("error", "True");

                        } else if (firstAttributeColumn === secondAttributeColumn) {
                            element.style.backgroundColor = 'red';
                            element2.style.backgroundColor = 'red';
                            element.setAttribute("error", "True");
                            element2.setAttribute("error", "True");

                        } else if (element.id[0] == element2.id[0]) {
                            element.style.backgroundColor = 'red';
                            element2.style.backgroundColor = 'red';
                            element.setAttribute("error", "True");
                            element2.setAttribute("error", "True");
                        }
                    }
                }
            }
        }
    }
    // console.log(duplicate_elements);
}
function bigCellCheck(array) {
    for (let k = 0; k < array.length; k++) {
        const element = array[k];
        for (let x = array.length - 1; x >= 0; x--) {
            const element2 = array[x];
            if (k == x) continue
            if (element.innerHTML != '' && element2.innerHTML != "" && element.innerHTML == element2.innerHTML) {
                element.style.backgroundColor = 'red';
                element2.style.backgroundColor = 'red';
                element.setAttribute("error", "True");
                element2.setAttribute("error", "True");

            }
        }
    }

}
function checkAllCell() {
    let arr = [];
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        if (element.getAttribute('Error') == 'True') {
            arr.push(element);
        }
    }
    // console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        for (let j = 0; j < arr.length; j++) {
            const element2 = arr[j];
            if (i === j) {
                continue;
            }
            else {
                if (arr[i].innerHTML === arr[j].innerHTML) {
                    duplicate_elements.push(arr[i]);
                    const firstAttributeRow = arr[i].getAttribute('rowID');
                    const secondAttributeRow = arr[j].getAttribute('rowID');
                    const firstAttributeColumn = arr[i].getAttribute('columID');
                    const secondAttributeColumn = arr[j].getAttribute('columID');
                    if (firstAttributeRow === secondAttributeRow) {
                        element.style.backgroundColor = 'red';
                        element2.style.backgroundColor = 'red';
                        element.setAttribute("error", "True");
                        element2.setAttribute("error", "True");

                    } else if (firstAttributeColumn === secondAttributeColumn) {
                        element.style.backgroundColor = 'red';
                        element2.style.backgroundColor = 'red';
                        element.setAttribute("error", "True");
                        element2.setAttribute("error", "True");

                    } else if (element.id[0] == element2.id[0]) {
                        element.style.backgroundColor = 'red';
                        element2.style.backgroundColor = 'red';
                        element.setAttribute("error", "True");
                        element2.setAttribute("error", "True");
                    }
                }
                // else{
                //     element.style.backgroundColor = '';
                //     element2.style.backgroundColor = '';
                //     element.setAttribute("error","False");
                //     element2.setAttribute("error","False");
                // }
            }
        }
    }
}
function clearCells() {
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.innerHTML = '';
        element.style.backgroundColor = ''
        if (element.classList.contains('notBeTouched')) {
            element.classList.remove('notBeTouched');
        }

    }
    document.getElementById('winWindow').style.visibility = 'hidden';
}
function generateSudoku(level) {
    clearCells();
    let generatedStr = sudoku.generate(level);
    // sudoku.print_board(generatedStr);
    //   console.log(sudoku.board_string_to_grid(generatedStr));
    for (let i = 0; i < generatedStr.length; i++) {
        if (generatedStr[i] != ".") {
            document.getElementById(libIdMap[i + 1]).innerHTML = generatedStr[i];
            document.getElementById(libIdMap[i + 1]).classList.add('notBeTouched');

        } else {
            continue;
        }
    }
    //    console.log(generatedStr);
    checkGameStatus(generatedStr);


    if (document.getElementById(level).id != defaultLevel) {
        document.getElementById(level).classList.add('active');
        document.getElementById(defaultLevel).classList.remove('active')
    } else {
        oldButton = document.getElementById(level);
        oldButton.classList.add('active');
    }
    defaultLevel = level

}

function checkGameStatus(level) {
    let solved = sudoku.solve(level);
    // console.log(solved);
    isError = false;
    // const cells = document.querySelectorAll(".cell");
    // const bigCells = document.querySelectorAll('.bigCell');
    // for (let i = 0; i < solved.length; i++) {
    //     const element = solved[i];
    //     let cell = document.getElementById(libIdMap[i + 1]).innerHTML;
    //     // console.log(element,cell);
    //     if(element != cell){
    //        isError = true
    //        break;
    //     }
    // }
    let array = []
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        if (element.innerHTML != "") {
            array.push(element)
        } else {
            isError = true;
        }
        if (!isError && array.length == 81) {
            // alert('YOU WON!')
            document.getElementById('winWindow').style.visibility = "visible";
        }
    }
    // if(!isError){
    //     alert('YOU WON!')

    // }

    str = solved;
}
function eraser(num) {
    if (document.getElementById(selectedNum)) {
        if (document.getElementById(selectedNum).id != document.getElementById(num).id) {
            document.getElementById(selectedNum).classList.add('numbersButton');
            document.getElementById(selectedNum).classList.remove('active');
        }
    }
    let oldButton = document.getElementById(num);
    oldButton.classList.add('active');
    selectedNum = num;

    //   let cells = document.querySelectorAll('.cell');
    //   for (const cell of cells) {
    //       cell.addEventListener('',function(e){
    //           if(e.target.classList.contains('notBeTouched')){
    //               console.error('Not Possible to Clean this number ' + e.target.innerHTML)
    //             }else{
    //               if(e.target.innerHTML){

    //                   e.target.innerHTML = ''
    //                 }

    //             }
    //         })
    //     }
}

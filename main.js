var option = "aa/";
let buttonA = document.getElementById('buttonA');
let buttonB = document.getElementById('buttonB');

var rows = 4;
var columns = 4;

var currTile;
var otherTile;

var turns = 0;

// Hàm để xáo trộn mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
  
// Tạo một mảng chứa các số từ 1 đến 9
const imgOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  
// Sắp xếp ngẫu nhiên mảng numbers
shuffleArray(imgOrder);

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "aa/" + imgOrder.shift() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);

        }
    }
    document.addEventListener("keydown", handleKeyPress);
}

// buttonA.addEventListener('click', function() {
//     option = 'aa/';
//     console.log("You chose option a!");
    
// });
// buttonB.addEventListener('click', function() {
//     option = 'bb/';
//     console.log("You chose option b!");
// });

//Chơi bằng bàn phím --> error

// function handleKeyPress(event) {
//     // Lấy mã phím từ sự kiện
//     const keyCode = event.keyCode || event.which;
  
//     // Kiểm tra các mã phím tương ứng với các phím mũi tên
//     switch (keyCode) {
//         case 37:
//             console.log("Bấm phím trái");
//             leftKey();
//             break;
//         case 38:
//             console.log("Bấm phím lên");
//             break;
//         case 39:
//             console.log("Bấm phím phải");
//             break;
//         case 40:
//             console.log("Bấm phím xuống");
//             break;
//         default:
//             // Bất kỳ phím nào khác bạn muốn xử lý
//             break;
//     }
// }



function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("aa/16.png")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}
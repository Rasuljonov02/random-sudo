const SIZE = 9;
const BOX_SIZE = 3;

function generateSudoku(n) {
	let board = Array(SIZE)
		.fill()
		.map(() => Array(SIZE).fill(0));
	fillDiagonalBoxes(board);
	fillRemaining(board, 0, BOX_SIZE);
	removeKDigits(board, SIZE * SIZE - n);
	return board;
}

function fillDiagonalBoxes(board) {
	for (let i = 0; i < SIZE; i += BOX_SIZE) {
		fillBox(board, i, i);
	}
}

function fillBox(board, row, col) {
	let num;
	for (let i = 0; i < BOX_SIZE; i++) {
		for (let j = 0; j < BOX_SIZE; j++) {
			do {
				num = randomNum();
			} while (!isSafeInBox(board, row, col, num));
			board[row + i][col + j] = num;
		}
	}
}

function fillRemaining(board, row, col) {
	if (row >= SIZE && col >= SIZE) return true;
	if (col >= SIZE) {
		row++;
		col = 0;
	}
	if (row < BOX_SIZE) {
		if (col < BOX_SIZE) col = BOX_SIZE;
	} else if (row < SIZE - BOX_SIZE) {
		if (col === Math.floor(row / BOX_SIZE) * BOX_SIZE) col += BOX_SIZE;
	} else {
		if (col === SIZE - BOX_SIZE) {
			row++;
			col = 0;
			if (row >= SIZE) return true;
		}
	}
	for (let num = 1; num <= SIZE; num++) {
		if (isSafe(board, row, col, num)) {
			board[row][col] = num;
			if (fillRemaining(board, row, col + 1)) return true;
			board[row][col] = 0;
		}
	}
	return false;
}

function removeKDigits(board, k) {
	while (k--) {
		let cellId = Math.floor(Math.random() * SIZE * SIZE);
		let row = Math.floor(cellId / SIZE);
		let col = cellId % SIZE;
		while (board[row][col] === 0) {
			cellId = Math.floor(Math.random() * SIZE * SIZE);
			row = Math.floor(cellId / SIZE);
			col = cellId % SIZE;
		}
		board[row][col] = 0;
	}
}

function isSafeInBox(board, rowStart, colStart, num) {
	for (let i = 0; i < BOX_SIZE; i++) {
		for (let j = 0; j < BOX_SIZE; j++) {
			if (board[rowStart + i][colStart + j] === num) return false;
		}
	}
	return true;
}

function isSafeInRow(board, row, num) {
	for (let i = 0; i < SIZE; i++) {
		if (board[row][i] === num) return false;
	}
	return true;
}

function isSafeInCol(board, col, num) {
	for (let i = 0; i < SIZE; i++) {
		if (board[i][col] === num) return false;
	}
	return true;
}

function isSafe(board, row, col, num) {
	return (
		isSafeInBox(board, row - (row % BOX_SIZE), col - (col % BOX_SIZE), num) &&
		isSafeInRow(board, row, num) &&
		isSafeInCol(board, col, num)
	);
}

function randomNum() {
	return Math.floor(Math.random() * SIZE + 1);
}

document.addEventListener("DOMContentLoaded", () => {
	const appDiv = document.getElementById("app");
	const inputField = appDiv.querySelector("input");
	const generateButton = appDiv.querySelector("button");
	const tableElement = appDiv.querySelector("table");

	for (let i = 0; i < SIZE; i++) {
		const rowElement = document.createElement("tr");
		for (let j = 0; j < SIZE; j++) {
			const cellElement = document.createElement("td");
			rowElement.appendChild(cellElement);
		}
		tableElement.appendChild(rowElement);
	}
	generateButton.addEventListener("click", () => {
		const n = parseInt(inputField.value, 10);
		const board = generateSudoku(n);
		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				tableElement.rows[i].cells[j].textContent = board[i][j] || "";
			}
		}
	});
});

// ... oldingi kodlar ...

function divideIntoBoxes() {
	const tableElement = document.querySelector("table");
	const cells = tableElement.getElementsByTagName("td");

	for (let i = 0; i < cells.length; i++) {
		cells[i].classList.remove("box-1", "box-2", "box-3");
		const row = Math.floor(i / SIZE);
		const col = i % SIZE;
		const boxNumber = Math.floor(row / BOX_SIZE) * BOX_SIZE + Math.floor(col / BOX_SIZE) + 1;
		cells[i].classList.add("box-" + boxNumber);
	}
}

// ... oldingi kodlar ...

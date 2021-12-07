export {}
const boardData = [];

function getBoardData() {
  return boardData;
}

function addBoard(board) {
  boardData.push(board)
}

function deleteBoardFromData(boardIndex) {
  boardData.splice(boardIndex, 1);
}

function updateBoardInData(boardIndex, req) {
  boardData[boardIndex] = { ...boardData[boardIndex], ...req.body };
}


function findBoardById(boardId) {
  return boardData.find(item => item.id === boardId);
}

function findBoardByIndex(boardId) {
  return boardData.findIndex(item => item.id === boardId);
}

module.exports = {
  getBoardData, addBoard, deleteBoardFromData, updateBoardInData, findBoardById, findBoardByIndex
}

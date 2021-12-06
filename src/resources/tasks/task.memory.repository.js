let taskData = [];

function getTaskData(){
  return taskData;
}

function getTaskByBoardId(boardId){
  return taskData.filter(item => item.boardId === boardId);
}

function getTaskByTaskId(taskId){
  return taskData.find((task => task.id === taskId));
}

function getTaskIndexByTaskId(taskId){
  return taskData.findIndex(task => task.id === taskId);
}

function addTask(task){
  taskData.push(task)
}

function deleteTaskFromTasks(taskIndex){
  taskData.splice(taskIndex, 1);
}

function changeUserIdInTasks(userId){
  taskData.forEach((item, index) => {
  if(item.userId === userId){
    taskData[index].userId = null;
  }
});
}

function deleteTasksWithBoard(boardId){
  taskData = taskData.filter(item => item.boardId !== boardId);
}

function updateTaskDataByIndex(index, body, taskId, boardId){
  taskData[index] = {...body, id: taskId, boardId}
}

module.exports = {
  getTaskByBoardId,
  getTaskByTaskId,
  getTaskData,
  addTask,
  getTaskIndexByTaskId,
  deleteTaskFromTasks,
  changeUserIdInTasks,
  deleteTasksWithBoard,
  updateTaskDataByIndex
}



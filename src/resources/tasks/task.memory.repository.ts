export {}

interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: null |  string;
  boardId: null | string;
  columnId: null | string;
}

let taskData: ITask[] = [];

function getTaskData(){
  return taskData;
}

function getTaskByBoardId(boardId: string){
  return taskData.filter(item => item.boardId === boardId);
}

function getTaskByTaskId(taskId: string){
  return taskData.find((task => task.id === taskId));
}

function getTaskIndexByTaskId(taskId: string){
  return taskData.findIndex(task => task.id === taskId);
}

function addTask(task: ITask){
  taskData.push(task)
}

function deleteTaskFromTasks(taskIndex: number){
  taskData.splice(taskIndex, 1);
}

function changeUserIdInTasks(userId: string): void {
  taskData.forEach((item, index) => {
  if(item.userId === userId){
    taskData[index].userId = null;
  }
});
}

function deleteTasksWithBoard(boardId: string): void{
  taskData = taskData.filter(item => item.boardId !== boardId);
}

function updateTaskDataByIndex(index: number, body: ITask, taskId: string, boardId: string): void{
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



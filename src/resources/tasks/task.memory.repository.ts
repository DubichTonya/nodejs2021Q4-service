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

/**
 * Returns all tasks
 * @returns array with tasks or empty array
 */

function getTaskData(): ITask[] {
  return taskData;
}

/**
 * Get tasks by boardId
 * @param boardId - task properties (string)
 * @returns filtering task array by boardId and return result
 */

function getTaskByBoardId(boardId: string): ITask[] {
  return taskData.filter(item => item.boardId === boardId);
}

/**
 * Searching task by id in array of tasks
 * @param taskId - id of task (string)
 * @returns Searching task by id in array and return task or undefined if not found
 */

function getTaskByTaskId(taskId: string): ITask | undefined {
  return taskData.find((task => task.id === taskId));
}

/**
 * Searching task index by id in array of tasks
 * @param taskId - id of task (string)
 * @returns Searching task in array and return task index or -1 if not found
 */

function getTaskIndexByTaskId(taskId: string): number {
  return taskData.findIndex(task => task.id === taskId);
}

/**
 * Adds task in array of tasks
 * @param task - user object
 * @returns Returns noting. Adds task in tasks array
 */

function addTask(task: ITask): void {
  taskData.push(task)
}


/**
 * Deletes task from array of tasks
 * @param taskIndex - index of task (number)
 * @returns Returns noting. Finds task by index in tasks and delete it
 */

function deleteTaskFromTasks(taskIndex: number): void {
  taskData.splice(taskIndex, 1);
}

/**
 * Updates userId in task
 * @param userId - id of user (string)
 * @returns Returns noting. Finds task userId and changing userId at null
 */

function changeUserIdInTasks(userId: string): void {
  taskData.forEach((item, index) => {
  if(item.userId === userId){
    taskData[index].userId = null;
  }
});
}

/**
 * Updates userId in task
 * @param boardId - id of board (string)
 * @returns Returns noting. Change array of tasks when filters array by boardId
 */

function deleteTasksWithBoard(boardId: string): void{
  taskData = taskData.filter(item => item.boardId !== boardId);
}

/**
 * Updates task in array of tasks
 * @param index - index of task (number)
 * @param body - request body from server (ITask)
 * @returns Returns noting. Changing data in task from body data
 */

function updateTaskDataByIndex(index: number, body: ITask): void{
  taskData[index] = {...taskData[index], ...body}
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



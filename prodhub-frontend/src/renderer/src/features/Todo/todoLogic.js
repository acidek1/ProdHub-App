let tasks = [];

export function addTask(taskName) {
    if (taskName.trim() === "") return tasks;

    const newTask = {
        id: Date.now(),
        name: taskName,
        isDone: false
    };

    tasks.push(newTask)
    return[...tasks];
}

export function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId); //usun zadani
    return[...tasks];
}

export function getTasks() { //obecny stan zadan
    return[...tasks];
}

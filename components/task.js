// Archivo components/task.js

export function createTaskItem(task, sectionId) {
    return `
        <div class="task">
            <input type="checkbox" data-section-id="${sectionId}" data-task-id="${task.id}" onchange="updateTaskStatus(event)" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.text}" data-section-id="${sectionId}" data-task-id="${task.id}" oninput="updateEditableTask(event)">
        </div>
    `;
}

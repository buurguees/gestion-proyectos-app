// Archivo components/taskComponent.js

function createTaskItem(task, sectionId) {
    return `
        <li class="task-item">
            <input type="checkbox" class="task-checkbox" data-section-id="${sectionId}" data-task-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="updateTaskStatus(event)" />
            <input type="text" class="editable-task-input" value="${task.text}" data-section-id="${sectionId}" data-task-id="${task.id}" onchange="updateEditableTask(event)" />
            <div class="task-options">
                <span class="task-options-button" onclick="toggleTaskOptions(${sectionId}, ${task.id})">⋮</span>
                <div class="task-options-menu" id="task-options-${sectionId}-${task.id}" style="display: none;">
                    <button class="delete-task" onclick="deleteTask(${sectionId}, ${task.id})">Eliminar</button>
                    <button class="duplicate-task" onclick="duplicateTask(${sectionId}, ${task.id})">Duplicar</button>
                </div>
            </div>
        </li>
    `;
}

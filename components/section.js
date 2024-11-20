// Archivo components/sectionComponent.js - Maneja las secciones del checklist

// Dependencia: Se requiere importar la función createTaskItem desde taskComponent.js

function createSection(section) {
    const completedTasks = section.tasks.filter(task => task.completed).length;
    const totalTasks = section.tasks.length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return `
        <div class="checklist-section" id="editable-section-${section.id}">
            <details ${section.open ? 'open' : ''}>
                <summary class="section-summary">
                    <div class="progress-background">
                        <div class="progress-fill" style="width: ${progressPercentage}%;"></div>
                    </div>
                    <span>${section.title}</span>
                    <div class="section-options">
                        <span class="section-options-button" onclick="toggleSectionOptions(${section.id})">⋮</span>
                        <div class="section-options-menu" id="section-options-${section.id}" style="display: none;">
                            <button class="delete-section" onclick="deleteSection(${section.id})">Eliminar</button>
                            <button class="duplicate-section" onclick="duplicateSection(${section.id})">Duplicar</button>
                        </div>
                    </div>
                </summary>
                <ul>
                    ${section.tasks.map(task => createTaskItem(task, section.id)).join('')}
                </ul>
                <button onclick="addNewTask(${section.id})" class="add-task">Añadir Nueva Tarea</button>
            </details>
        </div>
    `;
}

// Exportamos la función para que pueda ser utilizada en app.js
if (typeof module !== 'undefined') {
    module.exports = { createSection };
}

// Asegurarse de que los siguientes scripts sean cargados en el orden adecuado en index.html
// utils.js, taskComponent.js, sectionComponent.js, y finalmente app.js

// Archivo section.js - Creación de secciones individuales
import { saveChecklistData } from './utils.js';

export function createSection(section) {
    const tasksHtml = section.tasks.map(task => createTaskItem(task, section.id)).join('');
    const progressWidth = section.progress ? `${section.progress}%` : '0%';

    return `
        <div class="section" data-section-id="${section.id}">
            <div class="section-header" contenteditable="true" onblur="updateSectionTitle(event, ${section.id})">
                ${section.title}
            </div>
            <div class="progress-bar" style="width: ${progressWidth};"></div>
            <div class="section-options">
                <button onclick="toggleSection(${section.id})">✖</button>
                <div id="section-options-${section.id}" class="options-menu" style="display:none;">
                    <button onclick="duplicateSection(${section.id})">Duplicar</button>
                    <button onclick="deleteSection(${section.id})">Eliminar</button>
                </div>
            </div>
            <div class="tasks" style="display: ${section.open ? 'block' : 'none'};">
                ${tasksHtml}
                <button onclick="addNewTask(${section.id})">Añadir Tarea</button>
            </div>
        </div>
    `;
}

// Función para actualizar el título de una sección
export function updateSectionTitle(event, sectionId) {
    const newTitle = event.target.innerText.trim();
    const section = checklistData.find(s => s.id === sectionId);
    if (section && newTitle) {
        section.title = newTitle;
        saveChecklistData(checklistData); // Guarda automáticamente los cambios realizados
    }
}

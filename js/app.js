// Archivo js/app.js - Lógica principal de la aplicación

// Importar funciones desde componentes
import { createTaskItem } from '../components/task.js';
import { createSection } from '../components/section.js';
import { saveChecklistData } from '../components/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Recuperar los datos del checklist desde el almacenamiento local
    let checklistData = JSON.parse(localStorage.getItem('checklistData')) || [];

    // Renderizar la plantilla inicial del checklist
    renderChecklistTemplate();

    function renderChecklistTemplate() {
        app.innerHTML = `
            <div id="checklist-container" class="checklist-wrapper">
                <div class="header">
                    <h2>CHECKLIST PROGRESO OBRA</h2>
                    <button onclick="addNewSection()" class="add-section">Añadir Pantalla</button>
                </div>
                ${checklistData.map(section => createSection(section)).join('')}
            </div>
        `;
        saveChecklistData(checklistData);
    }

    // Funciones principales
    window.addNewSection = function() {
        const newSection = {
            id: checklistData.length + 1,
            title: `Nueva Sección ${checklistData.length + 1}`,
            tasks: [],
            open: true
        };
        checklistData.push(newSection);
        renderChecklistTemplate();
    };

    window.updateTaskStatus = function(event) {
        const sectionId = parseInt(event.target.dataset.sectionId);
        const taskId = parseInt(event.target.dataset.taskId);
        const section = checklistData.find(s => s.id === sectionId);
        const task = section.tasks.find(t => t.id === taskId);
        task.completed = event.target.checked;
        renderChecklistTemplate();
    };

    window.addNewTask = function(sectionId) {
        const section = checklistData.find(s => s.id === sectionId);
        const newTask = {
            id: section.tasks.length + 1,
            text: `Tarea ${section.tasks.length + 1}`,
            completed: false
        };
        section.tasks.push(newTask);
        renderChecklistTemplate();
    };

    window.deleteSection = function(sectionId) {
        checklistData = checklistData.filter(s => s.id !== sectionId);
        renderChecklistTemplate();
    };

    window.duplicateSection = function(sectionId) {
        const section = checklistData.find(s => s.id === sectionId);
        const duplicatedSection = {
            ...section,
            id: checklistData.length + 1,
            title: `${section.title} (Duplicado)`
        };
        checklistData.push(duplicatedSection);
        renderChecklistTemplate();
    };

    window.updateEditableTask = function(event) {
        const sectionId = parseInt(event.target.dataset.sectionId);
        const taskId = parseInt(event.target.dataset.taskId);
        const section = checklistData.find(s => s.id === sectionId);
        const task = section.tasks.find(t => t.id === taskId);
        task.text = event.target.value;
        saveChecklistData(checklistData);
    };

    window.toggleSectionOptions = function(sectionId) {
        const optionsMenu = document.getElementById(`section-options-${sectionId}`);
        if (optionsMenu) {
            optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'block' : 'none';
        }
    };

    // Guardar datos del checklist en localStorage
    function saveChecklistData() {
        localStorage.setItem('checklistData', JSON.stringify(checklistData));
    }
});

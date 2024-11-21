// Archivo JavaScript para la lógica principal del proyecto de gestión de proyectos

import { createSection } from './components/section.js';
import { saveChecklistData, loadChecklistData, defaultChecklistData } from './components/utils.js';

// Contenedor principal
const app = document.getElementById('checklist-container');

// Datos iniciales del checklist
const checklistData = loadChecklistData().length > 0 ? loadChecklistData() : defaultChecklistData;

// Renderiza la plantilla principal
function renderChecklistTemplate() {
    app.innerHTML = ''; // Vaciar el contenedor

    checklistData.forEach(section => {
        const sectionHtml = createSection(section);
        app.insertAdjacentHTML('beforeend', sectionHtml); // Usar insertAdjacentHTML para agregar HTML
    });

    // Añadir event listeners para los títulos editables
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('blur', (event) => {
            const sectionId = parseInt(header.closest('.section').dataset.sectionId, 10);
            updateSectionTitle(event, sectionId);
        });
    });
}

// Inicializa el checklist cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    renderChecklistTemplate();
});

// Función para cambiar el título de una sección y actualizar los datos globales
window.updateSectionTitle = function (event, sectionId) {
    const newTitle = event.target.innerText.trim();
    const section = checklistData.find(s => s.id === sectionId);
    if (section && newTitle) {
        section.title = newTitle;
        saveChecklistData(checklistData);
    }
};

// Función para alternar el estado abierto/cerrado de una sección
window.toggleSection = function (sectionId) {
    const section = checklistData.find(s => s.id === sectionId);
    if (section) {
        section.open = !section.open; // Cambiar el estado 'open'
        saveChecklistData(checklistData);
        renderChecklistTemplate(); // Renderizar la plantilla para actualizar la vista
    }
};

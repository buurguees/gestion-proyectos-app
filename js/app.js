// Archivo JavaScript para la lógica principal del proyecto de gestión de proyectos

import { createSection } from './components/section.js';
import { checklistData } from './components/utils.js';

// Contenedor principal
const app = document.getElementById('checklist-container');

// Renderiza la plantilla principal
function renderChecklistTemplate() {
    app.innerHTML = ''; // Vaciar el contenedor

    checklistData.forEach(section => {
        const sectionHtml = createSection(section);
        app.insertAdjacentHTML('beforeend', sectionHtml); // Usar insertAdjacentHTML para evitar sobrescribir eventos
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
    const newTitle = event.target.innerText;
    const section = checklistData.find(s => s.id === sectionId);
    if (section) {
        section.title = newTitle;
        saveChecklistData();
    }
};

// Función para añadir una nueva sección
window.addNewSection = function () {
    const newSectionId = checklistData.length + 1;
    const newSection = {
        id: newSectionId,
        title: `Nueva Sección ${newSectionId}`,
        tasks: [],
        open: true,
        progress: 0
    };
    checklistData.push(newSection);
    saveChecklistData();
    renderChecklistTemplate();
};

// Función para alternar el estado abierto/cerrado de una sección
window.toggleSection = function (sectionId) {
    const section = checklistData.find(s => s.id === sectionId);
    if (section) {
        section.open = !section.open;
        saveChecklistData();
        renderChecklistTemplate();
    }
};

// Guarda los datos del checklist en el almacenamiento local
function saveChecklistData() {
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
}

// Carga los datos del checklist desde el almacenamiento local
function loadChecklistData() {
    const savedData = localStorage.getItem('checklistData');
    return savedData ? JSON.parse(savedData) : [];
}

// Datos iniciales del checklist (si no hay datos en el almacenamiento local)
const defaultChecklistData = [
    {
        id: 1,
        title: 'Sección de Ejemplo',
        tasks: [
            { id: 1, title: 'Tarea 1', completed: false },
            { id: 2, title: 'Tarea 2', completed: false },
            { id: 3, title: 'Tarea 3', completed: true }
        ],
        open: true,
        progress: 33
    }
];

// Inicializa los datos
const checklistData = loadChecklistData().length > 0 ? loadChecklistData() : defaultChecklistData;

// Renderiza la plantilla principal al iniciar el script
renderChecklistTemplate();

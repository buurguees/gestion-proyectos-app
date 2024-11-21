// Archivo utils.js: Funciones auxiliares para la gestión de los datos del checklist

// Guarda los datos del checklist en el almacenamiento local
export function saveChecklistData(data) {
    localStorage.setItem('checklistData', JSON.stringify(data));
}

// Carga los datos del checklist desde el almacenamiento local
export function loadChecklistData() {
    const savedData = localStorage.getItem('checklistData');
    return savedData ? JSON.parse(savedData) : [];
}

// Datos iniciales del checklist (si no hay datos en el almacenamiento local)
export const defaultChecklistData = [
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

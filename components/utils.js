// Archivo components/utils.js

function saveChecklistData(checklistData) {
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
}

function toggleOptionsMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}

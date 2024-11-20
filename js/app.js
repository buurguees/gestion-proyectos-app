// Archivo JavaScript (app.js)
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const users = [{
        type: 'Administrador',
        userName: 'admin',
        email: 'admin@gestium.com',
        password: 'admin123'
    }]; // Array para almacenar los usuarios

    // Renderizamos la interfaz inicial
    renderInitialInterface();

    // Interfaz inicial: permite registro o inicio de sesión
    function renderInitialInterface() {
        app.innerHTML = `
            <div id="initial-interface" class="initial-wrapper">
                <h2>Gestium - Bienvenido</h2>
                <div class="options-container">
                    <button id="registerBtn" class="option-btn">Registrarse</button>
                    <button id="loginBtn" class="option-btn">Iniciar Sesión</button>
                </div>
            </div>
        `;

        document.getElementById('registerBtn').addEventListener('click', renderRegisterOptions);
        document.getElementById('loginBtn').addEventListener('click', renderLoginForm);
    }

    // Opciones de registro: personal o empresa
    function renderRegisterOptions() {
        app.innerHTML = `
            <div id="register-options" class="register-options-wrapper">
                <h2>Registro en Gestium</h2>
                <div class="options-container">
                    <button id="personalRegisterBtn" class="option-btn">Registro Personal</button>
                    <button id="companyRegisterBtn" class="option-btn">Registro Empresa</button>
                </div>
            </div>
        `;

        document.getElementById('personalRegisterBtn').addEventListener('click', renderPersonalRegisterForm);
        document.getElementById('companyRegisterBtn').addEventListener('click', renderCompanyRegisterForm);
        addNavigationButtons(renderInitialInterface);
    }

    // Formulario de registro personal
    function renderPersonalRegisterForm() {
        app.innerHTML = `
            <div id="personal-register-container" class="login-wrapper">
                <div class="login-box">
                    <h2>Registro Personal</h2>
                    <form id="personalRegisterForm" class="login-form">
                        <div class="input-group">
                            <input type="text" id="firstName" placeholder="Nombre" required>
                        </div>
                        <div class="input-group">
                            <input type="text" id="lastName" placeholder="Apellido" required>
                        </div>
                        <div class="input-group">
                            <input type="email" id="personalEmail" placeholder="Correo Electrónico" required>
                        </div>
                        <div class="input-group">
                            <input type="text" id="userName" placeholder="Nombre de Usuario" required>
                        </div>
                        <div class="input-group">
                            <input type="password" id="personalPassword" placeholder="Contraseña" required>
                        </div>
                        <button type="submit" class="login-btn">Crear Cuenta Personal</button>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('personalRegisterForm').addEventListener('submit', handlePersonalRegistration);
        addNavigationButtons(renderRegisterOptions);
    }

    // Formulario de registro de empresa
    function renderCompanyRegisterForm() {
        app.innerHTML = `
            <div id="company-register-container" class="login-wrapper">
                <div class="login-box">
                    <h2>Registro Empresa</h2>
                    <form id="companyRegisterForm" class="login-form">
                        <div class="input-group">
                            <input type="text" id="companyName" placeholder="Nombre de la Empresa" required>
                        </div>
                        <div class="input-group">
                            <input type="email" id="companyEmail" placeholder="Correo Electrónico" required>
                        </div>
                        <div class="input-group">
                            <input type="password" id="companyPassword" placeholder="Contraseña" required>
                        </div>
                        <button type="submit" class="login-btn">Crear Cuenta Empresa</button>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('companyRegisterForm').addEventListener('submit', handleCompanyRegistration);
        addNavigationButtons(renderRegisterOptions);
    }

    // Formulario de inicio de sesión
    function renderLoginForm() {
        app.innerHTML = `
            <div id="login-container" class="login-wrapper">
                <div class="login-box">
                    <h2>Iniciar Sesión</h2>
                    <form id="loginForm" class="login-form">
                        <div class="input-group">
                            <input type="email" id="email" placeholder="Correo Electrónico" required>
                        </div>
                        <div class="input-group">
                            <input type="password" id="password" placeholder="Contraseña" required>
                        </div>
                        <button type="submit" class="login-btn">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('loginForm').addEventListener('submit', handleLogin);
        addNavigationButtons(renderInitialInterface);
    }

    // Manejo del registro personal
    function handlePersonalRegistration(e) {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('personalEmail').value;
        const userName = document.getElementById('userName').value;
        const password = document.getElementById('personalPassword').value;

        const newUser = { type: 'Personal', firstName, lastName, email, userName, password };
        users.push(newUser);
        alert('Cuenta personal creada exitosamente. Ahora puede iniciar sesión.');
        renderLoginForm();
    }

    // Manejo del registro de empresa
    function handleCompanyRegistration(e) {
        e.preventDefault();
        const companyName = document.getElementById('companyName').value;
        const email = document.getElementById('companyEmail').value;
        const password = document.getElementById('companyPassword').value;

        const newUser = { type: 'Empresa', companyName, email, password };
        users.push(newUser);
        alert('Cuenta de empresa creada exitosamente. Ahora puede iniciar sesión.');
        renderLoginForm();
    }

    // Manejo del inicio de sesión
    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            if (user.type === 'Administrador') {
                renderAdminPanel(user);
            } else {
                renderUserWorkspace(user);
            }
        } else {
            alert('Credenciales incorrectas, por favor intente nuevamente.');
        }
    }

    // Renderizar panel de administración del administrador
    function renderAdminPanel(user) {
        app.innerHTML = `
            <h1>Panel de Administración - Gestium</h1>
            <p>Bienvenido, Administrador ${user.userName}</p>
            <div id="admin-container">
                <h2>Gestión de Usuarios</h2>
                <div id="userManagementContainer"></div>
            </div>
        `;

        users.forEach(u => {
            if (u.type !== 'Administrador') {
                const userElement = document.createElement('div');
                userElement.classList.add('user');
                userElement.innerHTML = `
                    <p>Nombre: ${u.userName ? u.userName : u.companyName}</p>
                    <p>Correo: ${u.email}</p>
                    <p>Tipo: ${u.type}</p>
                `;
                document.getElementById('userManagementContainer').appendChild(userElement);
            }
        });

        addNavigationButtons(renderInitialInterface);
    }

    // Renderizar espacio de trabajo del usuario
    function renderUserWorkspace(user) {
        app.innerHTML = `
            <h1>Espacio de Trabajo - ${user.type === 'Personal' ? user.userName : user.companyName}</h1>
            <div id="workspace-container">
                <h2>Proyectos de ${user.type === 'Personal' ? user.userName : user.companyName}</h2>
                <button id="createProjectBtn" class="option-btn">Crear Nuevo Proyecto</button>
                <div id="projectManagementContainer"></div>
            </div>
        `;

        document.getElementById('createProjectBtn').addEventListener('click', () => {
            const projectName = prompt('Ingrese el nombre del nuevo proyecto:');
            const projectDescription = prompt('Ingrese una descripción del proyecto:');
            if (projectName && projectDescription) {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');
                projectElement.innerHTML = `
                    <h3>Proyecto: ${projectName}</h3>
                    <p>Descripción: ${projectDescription}</p>
                `;
                document.getElementById('projectManagementContainer').appendChild(projectElement);
            }
        });

        addNavigationButtons(renderInitialInterface);
    }

    // Función para agregar botones de navegación
    function addNavigationButtons(backCallback) {
        const backButton = document.createElement('button');
        backButton.textContent = 'Volver';
        backButton.classList.add('back-btn');
        backButton.addEventListener('click', backCallback);
        app.appendChild(backButton);

        const homeButton = document.createElement('button');
        homeButton.innerHTML = '🏠';
        homeButton.classList.add('home-btn');
        homeButton.addEventListener('click', renderInitialInterface);
        app.appendChild(homeButton);
    }
});

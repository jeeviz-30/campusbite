// ─── Standalone Auth (localStorage-based, no backend required) ───

// Returns the list of all registered users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('canteen_users') || '[]');
}

// Saves the user list back to localStorage
function saveUsers(users) {
    localStorage.setItem('canteen_users', JSON.stringify(users));
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();

    const name     = document.getElementById('reg-name').value.trim();
    const email    = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const confirm  = document.getElementById('confirm-password').value;
    const roleRaw  = document.getElementById('reg-role').value;

    // Map form role values → internal role constants
    const roleMap = {
        student: 'STUDENT',
        faculty:  'STUDENT',   // Faculty uses the student portal
        staff:    'CANTEEN_STAFF'
    };
    const role = roleMap[roleRaw] || 'STUDENT';

    // Basic validation
    if (!name || !email || !password) {
        alert('Please fill in all required fields.');
        return;
    }
    if (password !== confirm) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    const users = getUsers();

    // Check for duplicate email
    if (users.find(u => u.email === email)) {
        alert('An account with this email already exists. Please log in.');
        return;
    }

    // Save new user
    const newUser = {
        userId: Date.now(),
        name,
        email,
        password,   // stored plain-text for demo; never do this in production!
        role,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);

    alert('Account created successfully! Please log in.');
    window.location.href = 'login.html';
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();

    const email    = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please enter your email and password.');
        return;
    }

    const users = getUsers();
    const user  = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Invalid email or password. Please try again.');
        return;
    }

    // Persist session (minus password)
    const sessionUser = { userId: user.userId, name: user.name, email: user.email, role: user.role };
    localStorage.setItem('canteen_session', JSON.stringify(sessionUser));

    alert(`Welcome back, ${user.name}!`);

    // Redirect based on role — relative paths work with file:// and any server
    if (user.role === 'CANTEEN_STAFF') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Logout helper — call this from any page
function logout() {
    localStorage.removeItem('canteen_session');
    window.location.href = 'login.html';
}

// Auth guard — call at the top of protected pages to bounce unauthenticated users
function requireAuth(allowedRole) {
    const user = JSON.parse(localStorage.getItem('canteen_session') || 'null');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    if (allowedRole && user.role !== allowedRole) {
        alert('Access denied. You do not have permission to view this page.');
        window.location.href = 'login.html';
        return null;
    }
    return user;
}
// authProvider.js

const authProvider = {
  login: ({ username, password }) => {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
      });
  },

  logout: () => {
    // Implement logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return Promise.resolve();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      // Handle authentication errors (e.g., redirect to login page)
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    // Check if the user is authenticated (e.g., token exists)
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },

  getPermissions: () => {
    // Get user role from local storage
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();

  },

   // Check if the user has the required role
   checkRole: (requiredRole) => {
    return authProvider.getPermissions().then((userRole) => userRole === requiredRole);
  },
  getIdentity: () =>
        Promise.resolve({
            id: 'admin',
            fullName: 'Administrator',
        }),
  
};



export default authProvider;

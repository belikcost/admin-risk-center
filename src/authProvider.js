const authProvider = {
    // called when the user attempts to log in
    login: ({ username, permissions }) => {
        localStorage.setItem('username', username);
        localStorage.setItem('permissions', permissions);
        // accept all username/password combinations
        return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
    getIdentity: () => {
        try {
            const test = JSON.parse(localStorage.getItem('auth'));
            return Promise.resolve(test);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default authProvider;
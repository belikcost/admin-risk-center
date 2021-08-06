const authProvider = {
    login: ({name, role}) => {
        localStorage.setItem('username', name);
        localStorage.setItem('permissions', role);
        // accept all username/password combinations
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: ({status}) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
    getIdentity: async () => {
        try {
            let result;
            await fetch(process.env.REACT_APP_API + '/users/current', {
                method: 'GET',
                headers: {
                    'Authorization': "Token " + localStorage.getItem('token')
                }
            }).then(res => res.json()).then(res => {
                result = {id: res.id, fullName: res.name, avatar: res.photo_url};
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default authProvider;
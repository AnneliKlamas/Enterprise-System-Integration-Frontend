import {Backend} from "../axios-config";

export default {
    login: function(context, username, password, redirect) {
        let token = btoa(username + ":" + password);

        // do not forget to change the port to the right one, where your Spring Boot Application is running
        Backend.get("login", { headers: { 'Authorization': `Basic ${token}` } })
            .then(response => {
                localStorage.setItem('user-token', token);
                localStorage.setItem('user-roles', response.data);

                context.$router.push({path: redirect});
            })
            .catch(error => {
                console.log(error);
            });
    },
    logout: function() {
        localStorage.removeItem('user-roles');
        localStorage.removeItem('user-token');
    },
    isAuthenticated: function() {
        if (localStorage.getItem('user-token')) {
            return true;
        }

        return false;
    },
    isAuthorized: function(requiredRoles) {
        if (requiredRoles && this.isAuthenticated()) {
            if (requiredRoles.length > 0) {
                if (requiredRoles.includes(localStorage.getItem('user-roles'))) {
                    return true;
                } else {
                    return false;
                }
            }

            return true;
        }

        return false;
    }
}

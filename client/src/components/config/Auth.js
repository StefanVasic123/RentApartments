class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb) {
        this.authenticated = true;
        cb()
    }

    logout(cb) {
        this.authenticated = false;
        cb()
    }

    isAuthenticated() {
        if(localStorage.getItem('userId')) { // ovde vrsimo verifikaciju, znaci ako je localstorage ili cookie token ili id jednak trazenom
            return this.authenticated = true
        }
        return this.authenticated
    }
}

export default new Auth();
import { createStore } from 'vuex'
import axios from "axios";

const store = new createStore({
    state: {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || null,
        isAuthenticated: !!sessionStorage.getItem('token')
    },
    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isAuthenticated,
        getToken: (state) => state.token,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },

        SET_TOKEN(state, token) {
            state.token = token;
        },

        CLEAR_AUTH(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    actions: {
        async login({ commit }, userData) {
            try {
                const response = await axios.post('http://localhost:8080/auth/login', {
                    username: userData.username,
                    password: userData.password,
                });

                const token = response.data.jwt;
                const user = { // Beispielhafte Benutzerdaten TODO: Backend muss User Objekt zurückgeben
                    firstname: "Max",
                    lastname: "Mustermann",
                    username: userData.username,
                    email: "Max.Mustermann@email.com"
                };

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Token für zukünftige Requests setzen

                commit('SET_USER', user);
                commit('SET_TOKEN', token);
            } catch (error) {
                console.error('Login fehlgeschlagen:', error);
                throw new Error('Login fehlgeschlagen. Überprüfen Sie Ihre Anmeldedaten.');
            }
        },

        async register({ commit }, userData) {
            try {
                // POST-Anfrage an das Registrierungs-Endpoint
                const response = await axios.post('http://localhost:8080/api/users/register', {
                    username: userData.username,
                    password: userData.password,
                    email: userData.email // Wenn die API zusätzliche Felder wie E-Mail benötigt
                });

                // Annahme: Die Antwort enthält einen JWT-Token und Benutzerdaten
                const token = response.data.jwt;
                const user = { // Beispielhafte Benutzerdaten TODO: Backend muss User Objekt zurückgeben
                    firstname: "Max",
                    lastname: "Mustermann",
                    username: userData.username,
                    email: "Max.Mustermann@email.com"
                };

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Token setzen

                commit('SET_USER', user);
                commit('SET_TOKEN', token);

                return response.data; // Rückgabe zur weiteren Verwendung in der Komponente
            } catch (error) {
                console.error('Registrierung fehlgeschlagen:', error);
                throw new Error('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
            }
        },

        logout({ commit }) {
            commit('CLEAR_AUTH');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization']; // Entferne das Auth-Header
        },
        // Action, um den Store mit gespeicherten Daten beim Start zu initialisieren
        initializeAuth({ commit }) {
            const token = sessionStorage.getItem('token');
            const user = JSON.parse(sessionStorage.getItem('user'));

            if (token && user) {
                commit('SET_USER', user);
                commit('SET_TOKEN', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
    },
});
export default store;
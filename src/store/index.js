import { createStore } from 'vuex'
import axios from "axios";

const store = new createStore({
    state: {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || null,
        isAuthenticated: !!sessionStorage.getItem('token'),
        tasks: []
    },
    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isAuthenticated,
        getToken: (state) => state.token,
        getTasks: (state) => state.tasks
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
            state.tasks = [];
        },
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
    },
    actions: {
        async login({ commit }, userData) {
            try {
                const response = await axios.post('http://localhost:8080/auth/login', {
                    username: userData.username,
                    password: userData.password,
                });

                console.log("Logger: "+JSON.stringify(response.data));

                const token = response.data.jwt;
                const user = {
                    id: response.data.userId ?? null,
                    firstname: response.data.first_name ?? null,
                    lastname: response.data.last_name ?? null,
                    username: response.data.username ?? null,
                    email: response.data.email ?? null
                };

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = "Bearer " + token; // Token für zukünftige Requests setzen

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
                const user = {
                    id: response.data.userId ?? null,
                    firstname: response.data.first_name ?? null,
                    lastname: response.data.last_name ?? null,
                    username: response.data.username ?? null,
                    email: response.data.email ?? null
                };

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Token setzen

                commit('SET_USER', user);
                commit('SET_TOKEN', token);
            } catch (error) {
                console.error('Registrierung fehlgeschlagen:', error);
                throw new Error('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
            }
        },

        async fetchTasks({ commit }) {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                const response = await axios.get('http://localhost:8080/api/tasks/'+user.id.toString());
                if (response.data.length > 0) {
                    commit('SET_TASKS', response.data); // Speichert die abgerufenen Tasks im State
                }

            } catch (error) {
                console.error('Fehler beim Abrufen der Aufgaben:', error);
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
import {createStore} from 'vuex'
import axios from "axios";

const api_url = import.meta.env.VUE_APP_API_URL ?? 'http://localhost:8080'; // API-URL aus der .env-Datei

const store = new createStore({
    state: {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || null,
        isAuthenticated: !!sessionStorage.getItem('token'),
        tasks: [],
        progress: 0
    },
    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isAuthenticated,
        getToken: (state) => state.token,
        getTasks: (state) => state.tasks,
        getProgress: (state) => state.progress
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
        SET_PROGRESS(state, progress) {
            state.progress = progress;
        }
    },
    actions: {
        async login({commit}, userData) {
            try {
                const response = await axios.post(api_url+'/auth/login', {
                    username: userData.username,
                    password: userData.password,
                });

                console.log("Logger: " + JSON.stringify(response.data));

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
                console.error('Error Login:', error);
            }
        },

        async register({commit}, userData) {
            try {
                // POST-Anfrage an das Registrierungs-Endpoint
                const response = await axios.post(api_url+'/users/register', {
                    username: userData.username,
                    password: userData.password,
                    email: userData.email
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
                console.error('Error Registration:', error);
            }
        },

        async fetchTasks({commit}) {
            try {
                const user = store.getters.getUser;
                const response = await axios.get(api_url+'/api/tasks/' + user.id.toString());
                if (response.data.length > 0) {
                    commit('SET_TASKS', response.data);
                }

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },

        async addTask({commit}, task) {
            if (!task) {
                console.error('Task is empty');
                return;
            }
            try {
                const response = await axios.post(api_url+'/api/tasks', task);
                if (response.status === 200) {
                    commit('SET_TASKS', [...this.state.tasks, response.data]);
                }
            } catch (error) {
                console.error('Error adding task:', error);
            }
        },
        async deleteTask({commit}, taskId) {
            if (!taskId) {
                console.error('Task ID is empty');
                return;
            }
            try {
                const response = await axios.delete(api_url+'/api/tasks/' + taskId);
                if (response.status === 200) {
                    commit('SET_TASKS', this.state.tasks.filter(task => task.id !== taskId));
                }
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        },

        async updateTask({commit}, task) {
            if (!task) {
                console.error('Task is empty');
                return;
            }
            try {
                const response = await axios.put(api_url+'/api/tasks/' + task.id, task);
                if (response.status === 200) {
                    commit('SET_TASKS', this.state.tasks.map(t => t.id === task.id ? task : t));
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        },

        async completeTask({commit}, { taskId, ects }) {
            if(!taskId) {
                console.error('Task ID is empty');
                return;
            }
            if (ects < 0) {
                console.error('ECTS must be greater than 0');
                return;
            }
            try {
                await axios.post(api_url+'/api/tasks/'+taskId+"/complete", {
                    ects: ects
                });
            } catch (error) {
                console.error('Error completing task:', error);
            }
        },

        async getProgress({commit}) {
            try {
                const user = store.getters.getUser;
                const response = await axios.get(api_url+'/api/progress/' + user.id.toString());
                commit('SET_PROGRESS', response.data ? response.data : 0);

            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        },

        logout({commit}) {
            commit('CLEAR_AUTH');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },

        // Action, um den Store mit gespeicherten Daten beim Start zu initialisieren
        initializeAuth({commit}) {
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
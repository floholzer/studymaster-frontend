import {createStore} from 'vuex'
import axios from 'axios'

const api_url = 'http://localhost:8081';

function handleApiError(store, error) {
    if (error.response && error.response.status === 401) {
        // Session beenden, wenn ein 401-Fehler auftritt
        store.dispatch('logout');
        // Optional: Benutzer auf die Login-Seite weiterleiten
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    } else {
        // Fehler an die aufrufende Funktion weiterreichen
        throw error;
    }
}

const store = new createStore({
    state: {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || null,
        isAuthenticated: !!sessionStorage.getItem('token'),
        tasks: [],
        progress: 0,
        semester: {},
        subjects: [],
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
                const response = await axios.post(api_url + '/auth/login', {
                    username: userData.username,
                    password: userData.password,
                });

                console.log("Logger: " + JSON.stringify(response.data));

                const token = response.data.jwt;
                const user = {
                    id: response.data.userId ?? null,
                    first_name: response.data.firstName ?? null,
                    last_name: response.data.lastName ?? null,
                    username: response.data.username ?? null,
                    email: response.data.email ?? null
                };

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = "Bearer " + token; // Token für zukünftige Requests setzen

                commit('SET_USER', user);
                commit('SET_TOKEN', token);

                return { success: true };
            } catch (error) {
                console.error("Login error:", error.response?.data?.message || error.message);
                return {
                    success: false,
                    message: error.response?.data?.message || 'Login failed. Please try again.',
                };
            }
        },

        async register({commit, dispatch}, userData) {
            if (userData.username.length <= 0 || userData.password.length <= 0 || userData.email.length <= 0 || userData.firstname.length <= 0 || userData.lastname.length <= 0) {
                return {
                    success: false,
                    message: 'Please fill out all fields.'
                };
            } else {
                try {
                    // POST-Anfrage an das Registrierungs-Endpoint
                    const response = await axios.post(api_url+'/users/register', {
                        username: userData.username,
                        password: userData.password,
                        first_name: userData.firstname,
                        last_name: userData.lastname,
                        email: userData.email
                    });

                    // Login after successful registration
                    if (response.status === 200) {

                        const loginResult = await dispatch("login", {
                            username: userData.username,
                            password: userData.password,
                        });

                        if (loginResult.success) {
                            return { success: true };
                        } else {
                            return {
                                success: false,
                                message: "Registration successful, but login failed.",
                            };
                        }
                    }

                    return { success: true };
                } catch (error) {
                    console.error("Registration error:", error.response?.data?.message || error.message);
                    return {
                        success: false,
                        message: error.response?.data?.message || 'Registration failed. Please try again.',
                    };
                }
            }
        },

        async updateUser({commit}, userData) {
            try {
                const response = await axios.put(api_url+'/users/' + userData.id, userData);
                if (response.status === 200) {
                    commit('SET_USER', response.data);
                }
            } catch (error) {
                handleApiError(this, error);
            }
        },

        async fetchTasks({commit}) {
            try {
                const user = store.getters.getUser;
                const response = await axios.get(api_url+'/tasks/' + user.id.toString());
                if (response.data.length > 0) {
                    commit('SET_TASKS', response.data);
                }

            } catch (error) {
                handleApiError(this, error);
            }
        },

        async addTask({commit}, task) {
            if (!task) {
                console.error('Task is empty');
                return;
            }
            try {
                const response = await axios.post(api_url+'/tasks', task);
                if (response.status === 200) {
                    commit('SET_TASKS', [...this.state.tasks, response.data]);
                }
            } catch (error) {
                handleApiError(this, error);
            }
        },
        async deleteTask({commit}, taskId) {
            if (!taskId) {
                console.error('Task ID is empty');
                return;
            }
            try {
                const response = await axios.delete(api_url+'/tasks/' + taskId);
                if (response.status === 200) {
                    commit('SET_TASKS', this.state.tasks.filter(task => task.id !== taskId));
                }
            } catch (error) {
                handleApiError(this, error);
            }
        },

        async updateTask({commit}, task) {
            if (!task) {
                console.error('Task is empty');
                return;
            }
            try {
                const response = await axios.put(api_url+'/tasks/' + task.id, task);
                if (response.status === 200) {
                    commit('SET_TASKS', this.state.tasks.map(t => t.id === task.id ? task : t));
                }
            } catch (error) {
                handleApiError(this, error);
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
                await axios.post(api_url+'/tasks/'+taskId+"/complete", {
                    ects: ects
                });
            } catch (error) {
                handleApiError(this, error);
            }
        },

        async getProgress({commit}) {
            try {
                const user = store.getters.getUser;
                const response = await axios.get(api_url+'/progress/' + user.id.toString());
                commit('SET_PROGRESS', response.data ? response.data : 0);

            } catch (error) {
                handleApiError(this, error);
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
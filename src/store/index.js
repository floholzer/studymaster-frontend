import {createStore} from 'vuex'
import axios from 'axios'

const api_url = 'http://localhost:8080';

function handleApiError(store, error) {
    if (error.response && error.response.status === 401) {
        // Session beenden, wenn ein 401-Fehler auftritt
        store.dispatch('logout');
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
        semesters: [],
        subjects: [],
        badges: [],
    },
    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isAuthenticated,
        getToken: (state) => state.token,
        getTasks: (state) => state.tasks,
        getProgress: (state) => state.progress,
        getSemesters: (state) => state.semesters,
        getSubjects: (state) => state.subjects,
        getBadges: (state) => state.badges,
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
        },
        SET_SEMESTERS(state, semesters) {
            state.semesters = semesters;
        },
        SET_SUBJECTS(state, subjects) {
            state.subjects = subjects;
        },
        SET_BADGES(state, badges) {
            state.badges = badges;
        },
        ADD_BADGE(state, badge) {
            state.badges.push(badge);
        },
    },
    actions: {
        async login({commit, dispatch}, userData) {
            try {
                const response = await axios.post(api_url + '/auth/login', {
                    username: userData.username,
                    password: userData.password,
                });

                if (response.status === 200) {
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

                    await dispatch('getSemesters');
                    await dispatch('fetchTasks');
                    await dispatch('getProgress');


                    return { success: true };
                }

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
        // ##### USER ##### //
        /*
        User-Objekt:
            id: 1,
            username: "test",
            email: "max.mustermann@email.com",
            password: "password",
            first_name: "Max",
            last_name: "Mustermann",
            is_admin: false
         */

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
        // ##### SEMESTERS ##### //
        /*
        Semester-Objekt:
            id: 1,
            userId: 1,
            name: "WS 2021/22",
            status: "open" oder "completed",
            createdAt: "2022-03-31"
         */

        async getSemesters({commit}) {
            try {
                const user = store.getters.getUser;
                const response = await axios.get(api_url+'/semesters/' + user.id.toString());

                commit('SET_SEMESTERS', response.data);

            } catch (error) {
                handleApiError(this, error);
            }
        },

        async addSemester({commit}, semester) {
            if (!semester) {
                console.error('Semester is empty');
                return;
            }
            try {
                const response = await axios.post(api_url+'/semesters', semester);
                if (response.status === 200) {
                    commit('SET_SEMESTERS', [...this.state.semesters, response.data]);
                }
            } catch (error) {
                handleApiError(this, error);
            }
        },

        // ##### SUBJECTS ##### //
        /*
        Subject-Objekt:
            id: 1,
            semesterId: 1,
            name: "CLCO",
            status: "open" oder "completed",
            createdAt: "2022-03-31",
            userId: 1,
            award: "keinen"
        */
        async getSubjects({commit}, semesterId) {
            try {
                const response = await axios.get(api_url+'/subjects/' + semesterId.toString());
                commit('SET_SUBJECTS', response.data);

            } catch (error) {
                handleApiError(this, error);
            }
        },

        async addSubject({commit}, subject) {
            if (!subject) {
                console.error('Subject is empty');
                return;
            }
            try {
                const response = await axios.post(api_url+'/subjects', subject);
                if (response.status === 200) {
                    commit('SET_SUBJECTS', [...this.state.subjects, response.data]);
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
        // ##### TASKS ##### //
        /*
        Task-Objekt:
            id: 1,
            userId: 1,
            title: "Task 1",
            description: "Description",
            dueDate: "2022-03-31",
            status: "open" oder "completed",
            priority: "low" oder "medium" oder "high",
            ects: 5, Not ins Use!
            pointsPerSubmission: 5,
            totalSubmissions: 1,
            completedSubmissions: 1,
            createdAt: "2022-03-31",
            pointsEarned: 5,
            subjectId: 1,
         */
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

        async completeTask({commit}, { taskId, pointsEarned }) {
            if(!taskId) {
                console.error('TaskID is empty');
                return;
            }
            if (pointsEarned < 0) {
                console.error('Earned must not be negative');
                return;
            }
            try {
                await axios.post(api_url+'/tasks/'+taskId+"/complete", {pointsEarned: pointsEarned});
            } catch (error) {
                handleApiError(this, error);
            }
        },

        // ##### PROGRESS ##### //
        /*
        Progress-Objekt:
            id: 1,
            user_id: 1,
            task_id: 10,
            progress_percentage: 50,
            points_earned: 5,
            level: 1,
            updated_at: "2022-03-31",
         */

        async getProgress({commit}) {
            try {
                const user = store.getters.getUser;
                const response = await axios.get(api_url+'/progress/' + user.id.toString());
                commit('SET_PROGRESS', response.data ? response.data : 0);

            } catch (error) {
                handleApiError(this, error);
            }
        },
        // ##### BADGES ##### //
        /*
        Badge-Objekt:
            id: 1,
            name: "Beginner",
            description: "Awarded for earning 10 points",
            points_required: 10,
            badge_type: "standard" oder "semester_completion",

        UserBadge Table:
            id: 1,
            user_id: 1,
            badge_id: 1,
            awarded_at: "2022-03-31",
         */
        async fetchBadges({ commit }) {
            try {
                // durch API-Aufruf ersetzen
                const exampleBadges = [
                    { title: "First Semester", description: "Completed your first semester!" },
                    { title: "Overachiever", description: "Earned 30+ ECTS in one semester!" },
                    { title: "Task Master", description: "Completed 10 tasks!" },
                ];
                commit("SET_BADGES", exampleBadges);
            } catch (error) {
                console.error("Error fetching badges:", error);
            }
        },

        async addBadge({ commit }, badge) {
            try {
                // Beispiel für API-Aufruf
                // const response = await axios.post(`${api_url}/badges`, badge);
                // commit("ADD_BADGE", response.data);

                // Statische Lösung (z. B. für Offline-Demo):
                commit("ADD_BADGE", badge);
            } catch (error) {
                console.error("Error adding badge:", error);
            }
        },

        logout({commit}) {
            commit('CLEAR_AUTH');
            sessionStorage.clear();
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
import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    dashboard:{
      loading: false,
      data: {},
    },
    currentSurvey: {
      loading: false,
      data: {},
    },
    surveys: {
      loading: false,
      links: [],
      data: {},
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    notification: {
      show: false,
      type: "success",
      message: "",
    },
  },
  getters: {},
  actions: {

    getDashboardData({commit}) {
      commit('dashboardLoading', true)
      return axiosClient.get(`/dashboard`)
      .then((res) => {
        commit('dashboardLoading', false)
        commit('setDashboardData', res.data)
        return res;
      })
      .catch(error => {
        commit('dashboardLoading', false)
        return error;
      })

    },
    getSurveys({ commit }, { url = null } = {}) {
      commit("setSurveysLoading", true);
      url = url || "/survey";
      axiosClient
        .get(url)
        .then((res) => {
          commit("setSurveys", res.data);
          commit("setSurveysLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setSurveysLoading", false);
          throw err;
        });
    },
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },

    getSurveyBySlug({ commit }, slug) {
      
      commit("setCurrentSurveyLoading", true);
      axiosClient
        .get(`/survey-by-slug/${slug}`)
        .then((res) => {
          // console.log(res);
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            console.log(res.data);
            commit("setCurrentSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/survey", survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });

        return response;
      }
    },
    deleteSurvey({ commit }, id) {
      return axiosClient.delete(`/survey/${id}`);
    },

    saveSurveyAnswer({commit}, {surveyId, answers}) {
       console.log(surveyId);
      return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
    },

    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },

    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },

    logout({ commit }) {
      return axiosClient.post("/logout").then(({ data }) => {
        commit("logout", data);
        return data;
      });
    },
  },
  mutations: {
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, survey) => {
      state.surveys.links = survey.meta.links;
      state.surveys.data = survey.data;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },
    logout: (state) => {
      (state.user.data = {}), (state.user.token = null);
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userdata) => {
      state.user.data = userdata.user; // Set user details
      state.user.token = userdata.token; // Set token
      sessionStorage.setItem("TOKEN", userdata.token);
    },
    notify: (state, { message, type }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    },
  },
  modules: {},
});

export default store;

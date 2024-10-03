import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id:100,
    title:"welcome demo",
    slug:"welcome-demo",
    status: "draft",
    image:'https://picsum.photos/200/300?grayscale',
    description:"welcome to description",
    created_at:"2024-10-01",
    updated_at:"2024-10-01",
    expire_at:"2024-10-01",
    questions:[
      {
        id:1,
        type:"select",
        question:'Form which country',
        description:null,
        data:{
          options: [
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
          ]
        },
      },
      {
        id:2,
        type:"checkbox",
        question:'Form which country',
        description:null,
        data:{
          options: [
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
          ]
        },
      },
      {
        id:2,
        type:"radio",
        question:'Form which country',
        description:null,
        data:{
          options: [
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
          ]
        },
      }
    ]
  },
  {
    id:1001,
    title:"welcome demo",
    slug:"welcome-demo",
    status: "draft",
    image:'https://picsum.photos/200/300?grayscale',
    description:"welcome to description",
    created_at:"2024-10-01",
    updated_at:"2024-10-01",
    expire_at:"2024-10-01",
    questions:[
      {
        id:1,
        type:"select",
        question:'Form which country',
        description:null,
        data:{
          options: [
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
          ]
        },
      },
      {
        id:2,
        type:"checkbox",
        question:'Form which country',
        description:null,
        data:{
          options: [
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
          ]
        },
      },
      {
        id:2,
        type:"radio",
        question:'Form which country',
        description:null,
        data:{
          options: [
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
            {
              uuid:"ghghfdsaasgjhjhsfdsh",
              text:"USA"
            },
          ]
        },
      }
    ]
  },
 
]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tmpSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {},
  actions: {
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
        commit("logout",data);
        return data;
      });
    },
  },
  mutations: {
    logout: (state) => {
      (state.user.data = {}), (state.user.token = null);
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userdata) => {
      state.user.data = userdata.user; // Set user details
      state.user.token = userdata.token; // Set token
      sessionStorage.setItem("TOKEN", userdata.token);
    },
  },
  modules: {},
});

export default store;

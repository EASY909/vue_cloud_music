import { setToken, setUserName, removeToken, getToken, removeUserName, getUserName } from "@/utils/app.js";
import { Login } from "@/api/login.js";
const state = {

    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    // access_level: "" || sessionStorage.getItem("access_level"),
    username: getUserName() || "",
    to_Ken: '',
    roles: [],
    buttonPermission:[]

}
const getters = {
    isCollapse: state => state.isCollapse,
    roles: state => {
        return state.roles;
    },
    buttonPermission: state=> state.buttonPermission
    // access_level: state => state.access_level
}

const mutations = {
    SET_USERNAME(state, value) {
        state.username = value;
    },
    REMOVE_USERNAME(state) {
        state.username = "";
    },
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
        //Cookie.set('isCollapse',state.isCollapse)
    },
    SET_TOKEN(state, value) {
        state.to_Ken = value;
    },
    REMOVE_TOKEN(state) {
        state.to_Ken = '';
    },
    SET_ROLES(state, value) {
        state.roles = value;
    },
    REMOVE_ROLES(state) {
        state.roles = [];
    },
    SET_BUTTON(state,value){
        state.buttonPermission = value;
    }
    // setAccess_level(state, value) {
    //     sessionStorage.setItem("access_level", value)
    //     state.access_level = value;
    // },

}
const actions = {
    login({ commit }, requestData) {
        // console.log(content)
        return new Promise((resolve, reject) => {
            Login(requestData).then(response => {
                let data = response.data.data;

                commit("SET_USERNAME", data.username);
                commit("SET_TOKEN", data.token);
                // commit("setAccess_level", resonse.data);

                setUserName(data.username)
                setToken(data.token)

                resolve(response);
            }).catch(error => {

                reject(error)
            })
        })
    },
    out({ commit }) {
        return new Promise((resolve, reject) => {
            removeToken();
            removeUserName();
            // commit("setAccess_level", "");
            commit('REMOVE_USERNAME');
            commit('REMOVE_TOKEN');
            commit('REMOVE_ROLES');
            resolve();
        })
    }

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
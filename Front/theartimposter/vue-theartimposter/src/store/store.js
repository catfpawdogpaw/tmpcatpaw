import Vue from "vue";
import axios from "@/plugins/axios";
import { eraseCookie } from "@/utils/cookie";
import Vuex from "vuex"; // 쿠키 유틸리티 함수 가져오기

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem("access_token") || "",
        isAuthenticated: !!localStorage.getItem("access_token"),
        user: null // 유저 정보 필드
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
            state.isAuthenticated = true;
            localStorage.setItem("access_token", token);
        },
        setUser(state, user) { // 유저 정보를 저장하는 mutation 추가
            state.user = user;
        },
        logout(state) {
            state.accessToken = "";
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("access_token");
            eraseCookie("refresh_token");
        },
    },
    actions: {
        login({ commit }, { accessToken }) {
            commit("setAccessToken", accessToken);
        },
        fetchUser({ commit }) {
            return axios
                .get("/user/me")
                .then((response) => {
                    commit("setUser", response.data);
                    console.log(response.data);
                })
                .catch(() => {
                    commit("logout");
                });
        },
        logout({ commit }) {
            commit("logout");
        },
    },
});
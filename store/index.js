import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        userid: "",
        username: "",
        userpic: "",
        userphone: "",
        isLoaded: false
    },
    mutations: {
        setUserData(state,userData) {
            state.userid = userData.userid;
            state.username = userData.username || "佚名";
            state.userpic = userData.userpic;
            state.userphone = userData.userphone;
        }
    }
})

export default store;
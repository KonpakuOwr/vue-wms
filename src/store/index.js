import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
import receipt from "./receipt";

Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        tab: tab,
        user: user,
        receipt: receipt
    }
})

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user
    },
    getters,
    state: {
        tcolor: 'pure' // 默认为pure
    },
    mutations: {
        // 更新主题颜色
        setTColor(state, color) {
            this.state.themecolor = color
        }
    }

})

export default store
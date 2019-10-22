import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

var state = {
    users: {
        type: '',
        name: ''
    }
}

var mutations = {
    changeUser(state, user) {
        state.users.name = user.name,
        state.users.type = user.type
    }
}

var actions = {
    changeUser(context, user) {
        context.commit('changeUser', user)
    }
}

var store = new vuex.Store({
    state,
    actions,
    mutations
})

export default store

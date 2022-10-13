export const state = () => ({
  user: {},
  notification: {
    show: false,
    type: 1,
    message: '',
  }
});

export const mutations = {
  setUser(state, val) {
    state.user = { ...val };
  },
  setAuth(state, auth) {
    state.auth = auth;
  },
  setNotification(state, val){
    state.notification = val;
  }
}

export const actions = {
 nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      console.log('cookie found');
      try {
        user = this.$cookies.get('user');
        commit('setUser', user);
      } catch (e) {
        console.log('cannot find user cookie');
      }
    }   
  },
  setUser(context, user) {
    context.commit('setUser', user);
  },
  setAuth(context, val) {
    context.commit('setAuth', val);
  },
  setNotification(context, val){
    context.commit('setNotification', val);
  }
}
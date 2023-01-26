const user = {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem( 'TOKEN' ),
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
    getEmailVerifiedAt: state => state.user?.emailVerifiedAt,
  },
  mutations: {
    SET_VERIFIED: ( state, payload ) => {
      const {emailVerifiedAt} = payload
      if( state.user ) {
        state.user.emailVerifiedAt = emailVerifiedAt
      }      
    },
    SET_USER_IF_AUTH: ( state, payload ) => {
      const {user} = payload
      state.user = user
    },
    SET_USER: ( state, payload ) => {
      const {token, user} = payload
      state.token = token
      localStorage.setItem( 'TOKEN', token )
      state.user = user
    },
    DESTROY_USER: state => {
      state.token = null
      localStorage.removeItem( 'TOKEN' )
      state.user = null
    },
  },
  actions: {
    login( {commit} ) {
      console.log('login')
    },
    logout( {commit} ) {
      console.log('logout')
    },
  },
}

export default user
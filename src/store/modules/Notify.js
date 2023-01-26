const notify = {
    namespaced: true,
    state: {
        messages: [],
        errors: {},
        mI: null,
        eI: null,
    },
    getters: {
        getMessages: state => state.messages,
        getErrors: state => state.errors,
    },
    mutations: {
        SET_ERRORS: ( state, payload ) => {
            const {errors} = payload
            state.errors = errors

            clearTimeout( state.eI )

            state.eI = setTimeout( () => {
                state.errors = {}
            }, 6000 )
        },
        SET_MESSAGES: ( state, payload ) => {
            const {message} = payload
            
            state.messages.push( message )
            
            clearTimeout( state.mI )

            state.mI = setTimeout( () => {
                state.messages = []
            }, 6000 )
        }
    },
}
  
export default notify
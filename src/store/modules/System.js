const system = {
    namespaced: true,
    state: {
        attempt: false,
        verifTime: localStorage.getItem( 'VERIF_TIME' ),
        verifPerion: 60 // seconds
    },
    getters: {
        getAttempt: state => state.attempt,
        getVerifTime: state => state.verifTime,
        getVerifPerion: state => state.verifPerion,
    },
    mutations: {
        SET_VERIF_TIME: ( state, payload ) => {
            const {time} = payload
            localStorage.setItem( 'VERIF_TIME', time )
            state.verifTime = time
        },
        SET_ATTEMPT: ( state, payload ) => {
            const {attempt} = payload
            state.attempt = attempt
        },
    },
}

export default system
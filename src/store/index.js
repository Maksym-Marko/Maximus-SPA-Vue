import { createStore } from 'vuex'
import user from "@/store/modules/User"
import notify from "@/store/modules/Notify"
import system from "@/store/modules/System"

const store = createStore( {    
    modules: {
        user,
        notify,
        system,
    }
} )

export default store
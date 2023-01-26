import store from '@/store'

const emailVerification = () => {

    if( 
        import.meta.env.VITE_EMAIL_VERIFICATION === 'true' &&
        ! store.getters['user/getEmailVerifiedAt']
    ) {
        
        return false
    
    }

    return true

}

export default emailVerification
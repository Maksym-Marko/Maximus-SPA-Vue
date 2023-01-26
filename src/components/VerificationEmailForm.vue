<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
        <div>

            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Email verification</h2>
            <p class="mt-2 text-justify">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </p>

        </div>
        
        <form class="mt-8 space-y-6" @submit.prevent="resendVerificationEmail">

            <div>

            <button
                v-if="!attempt"
                type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Resend Verification Email
            </button>

            <button
                v-else
                disabled="true"
                type="button"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white"
            >
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-indigo-400" aria-hidden="true" />
                </span>
                Resend Verification Email
            </button>

            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import Auth from '@/services/Auth'
    import store from '@/store'
    import { LockClosedIcon } from '@heroicons/vue/20/solid'

    const attempt = computed( () => store.getters['system/getAttempt'] )
    const verifTime = computed( () => store.getters['system/getVerifTime'] )
    const verifPerion = computed( () => store.getters['system/getVerifPerion'] )
    const messages = computed( () => store.getters['notify/getMessages'] )

    const router = useRouter()

    const userVerified = computed( () => store.getters['user/getEmailVerifiedAt'] )

    const checkVerifTime = () => {

        if( ! verifTime.value ) return true

        if( ( Date.now() - parseInt( verifTime.value ) ) / 1000 > verifPerion.value ) return true        

        return false

    }

    const timeDifference = () => {

        return verifPerion.value - parseInt( ( Date.now() - parseInt( verifTime.value ) ) / 1000 )

    }

    const resendVerificationEmail = () => {      
        
        if( ! checkVerifTime() ) {

            if( messages.value.length===0 ) {
                store.commit( {
                    type: 'notify/SET_MESSAGES',
                    message: 'Wait ' + timeDifference() + ' seconds',
                } )
            }

            return
        }

        store.commit( {
            type: 'system/SET_ATTEMPT',
            attempt: true
        } )

        store.commit( {
            type: 'system/SET_VERIF_TIME',
            time: Date.now()
        } )

        Auth.emailVerificationSend()
        
    }

    const checkUser = () => {

        if( userVerified.value ) {

            router.push( { name: 'Dashboard' } )

            return

        }

    }    

    onMounted( () => {        

        checkUser()

    } )

</script>
<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>

                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Email verification</h2>
                
                <p class="mt-2 text-center">
                    Verification ...
                </p>

                <h2
                    v-if="$route.params.id === '' || $route.params.hash === ''"
                    class="text-red"
                >Something went wrong</h2>

            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import store from '@/store'
    import Auth from '@/services/Auth'

    const router = useRouter()
    const route = useRoute()

    const userVerified = computed( () => store.getters['user/getEmailVerifiedAt'] )
    
    const verification = () => {

        if( 
            typeof route.query.id === 'undefined' ||
            typeof route.query.hash === 'undefined'
        ) {


            router.push( { name: 'notFound' } )

            return

        }
        
        if( userVerified.value ) {

            router.push( { name: 'Dashboard' } )

            return

        }

        if( ! userVerified.value ) {

            Auth.emailVerificationCheck( {
                id: route.query.id,
                hash: route.query.hash
            } )

        }

    }

    onMounted( () => {

        verification()

    } )

</script>
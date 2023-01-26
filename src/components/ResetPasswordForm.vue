<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset Password</h2>
        
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="resetPassword">
        <div class="-space-y-px rounded-md shadow-sm">
            
            <div>
                <label for="email-address" class="sr-only">Your Email address</label>
                <input
                    id="email-address"
                    type="email"
                    v-model="formData.email"
                    required="true"
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    :class="[errors.length>0 && !formData.email ? 'empty-field' : '']"
                    placeholder="Email address" 
                />
            </div>
            <div>
                <label for="password" class="sr-only">New Password</label>
                <input
                    id="password"
                    type="password"
                    v-model="formData.password"              
                    required="true"
                    class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    :class="[errors.length>0 && !formData.password ? 'empty-field' : '']"
                    placeholder="Password" 
                />
            </div>
            <div>
                <label for="password_confirmation" class="sr-only">Password confirmation</label>
                <input
                    id="password_confirmation"
                    type="password"
                    v-model="formData.password_confirmation"              
                    required="true"
                    class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    :class="[errors.length>0 && !formData.password_confirmation ? 'empty-field' : '']"
                    placeholder="Password confirmation" 
                />
            </div>
        </div>

        <div>

          <button
            v-if="!attempt"
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reset Password
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
            Reset Password
          </button>

        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue'
    import store from '@/store'
    import { useRoute, useRouter } from 'vue-router'
    import Auth from '@/services/Auth'
    import { LockClosedIcon } from '@heroicons/vue/20/solid'

    const attempt = computed( () => store.getters['system/getAttempt'] )

    const router = useRouter()
    const route = useRoute()

    const formData = ref( {
        email: null,
        password: null,
        password_confirmation: null
    } )

    const errors = ref( [] )

    const resetPassword = () => {

        if( ! formData.value.email ) errors.value.push( 'Fill in email' )
        if( ! formData.value.password ) errors.value.push( 'Fill in password' )
        if( ! formData.value.password_confirmation ) errors.value.push( 'Confirm your password' )

        if( ! formData.value.email || ! formData.value.password || ! formData.value.password_confirmation ) return

        store.commit( {
          type: 'system/SET_ATTEMPT',
          attempt: true
        } )
        
        Auth.forgotPasswordCheck( {
            email: formData.value.email,
            password: formData.value.password,
            password_confirmation: formData.value.password_confirmation,
            token: route.query.token,
        } )

    }

    onMounted( () => {

        if( typeof route.query.token === 'undefined' ) {

            router.push( { name: 'notFound' } )

        }

    } )

</script>
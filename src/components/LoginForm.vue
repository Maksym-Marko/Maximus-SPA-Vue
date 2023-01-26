<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <router-link 
            :to="{name:'Register'}"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register for an account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              type="email"
              v-model="formData.email"
              autocomplete="email"
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :class="[errors.length>0 && !formData.email ? 'empty-field' : '']"
              placeholder="Email address" 
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              type="password"
              autocomplete="current-password"
              v-model="formData.password"              
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :class="[errors.length>0 && !formData.password ? 'empty-field' : '']"
              placeholder="Password" 
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="formData.remember"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
            />
            <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">

            <router-link 
              :to="{name: 'ForgotPassword'}"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </router-link>

          </div>
        </div>

        <div>

          <button
            v-if="!attempt"
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
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
            Sign in
          </button>

        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import store from '@/store'
  import Auth from '@/services/Auth'
  import { LockClosedIcon } from '@heroicons/vue/20/solid'

  const formData = ref( {
    email: null,
    password: null,
    remember: false
  } )

  const attempt = computed( () => store.getters['system/getAttempt'] )

  const errors = ref( [] )

  const login = () => {

    errors.value = []

    if( ! formData.value.email ) errors.value.push( 'Fill in email' )
    if( ! formData.value.password ) errors.value.push( 'Fill in password' )

    if( ! formData.value.email || ! formData.value.password ) return

    store.commit( {
      type: 'system/SET_ATTEMPT',
      attempt: true
    } )

    Auth.login( formData.value )

  }

</script>
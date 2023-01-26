import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Auth from '@/services/Auth'
import emailVerification from '@/services/emailVerification.js'

const routes = [

  // Auth area
  {
    path: '/auth',
    component: () => import( '@/components/DefaultLayout.vue' ),
    meta: {
      requiresGuest: true,
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import( '@/views/Login.vue' ),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import( '@/views/Register.vue' ),
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import( '@/views/ForgotPassword.vue' ),
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import( '@/views/ResetPassword.vue' ),
      },
    ]
  },

  // Email verification
  {
    path: '/verify-email',
    component: () => import('@/components/DefaultLayout.vue'),    
    children: [
      {
        path: '/verify-email',
        name: 'VerifyEmail',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/VerifyEmail.vue'),
      },
      {
        path: '/verify-email-check',
        name: 'VerifyEmailCheck',
        component: () => import('@/views/VerifyEmailCheck.vue'),
      }
    ]
  },

  // Dashboard area
  {
    path: '/dashboard',
    component: () => import( '@/components/DefaultLayout.vue' ),
    meta: {
      requiresAuth: true,
      requiresEmailVerificated: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import( '@/views/Dashboard.vue' ),
      }      
    ]
  },

  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from) => {
      Auth.logout()
      return false
    },
    component: () => import( '@/views/Login.vue' ),
  },
  
  // Common pages
  {
    path: '/',
    component: () => import( '@/components/DefaultLayout.vue' ),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import( '@/views/Home.vue' ),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import( '@/views/About.vue' ),
      },
      { 
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import( '@/views/NotFound.vue' ),
      }    
    ]
  },
    
]

const router = createRouter( {
  history: createWebHistory(),
  routes
} )

router.beforeEach( (to, from, next) => {

  const token = store.getters['user/getToken']
  const user = store.getters['user/getUser']
  const reqAuth = to.meta.requiresAuth
  const reqGuest = to.meta.requiresGuest
  const reqEmVer = to.meta.requiresEmailVerificated

  let _next = null

  if (reqAuth && ! token) {

    _next = { name: 'Login' }

  } else if( token && reqGuest ) {    

    _next = { name: 'Dashboard' }

  } else if( reqEmVer && ! emailVerification() ) {

    _next = { name: 'VerifyEmail' }

  }

  // Get user data if auth
  if( token && ! user ) {

    ;( async () => {

      await Auth.getUser()
        .then( res => {
          
          // Email verification
          if( ! emailVerification() && reqEmVer ) {

            _next = { name: 'VerifyEmail' }

          } else {

            _next = null

          }

          next( _next )

        } )

    } )()

  } else {

    next( _next )

  }

  // Reset attempt
  store.commit( {
    type: 'system/SET_ATTEMPT',
    attempt: false
  } )

} )

export default router
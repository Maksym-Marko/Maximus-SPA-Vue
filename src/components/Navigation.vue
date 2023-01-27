<template>

<Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="{name: item.name}"
                  class="22 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >{{
                  item.label
                }}</router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">

              <span 
                class="text-white"
                v-if="auth"
              >{{auth.name}}</span>

              <span 
                class="text-white"
                v-else
              >Hi, there! :)</span>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems v-if="uN.length>0" class="user-nav-area absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                       
                        <router-link
                            v-for="item in uN"
                            :key="item.name"
                            :to="item.name"
                            class="block px-4 py-2 text-sm text-gray-700"
                        >
                           {{ item.label }}
                        </router-link>

                    </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">

            <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="{name: item.name}"
                class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
                {{ item.label }}
            </router-link>
          
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div 
              v-if="auth"
              class="ml-3"
            >
              <div class="text-base font-medium leading-none text-white">{{ auth.name }}</div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ auth.email }}</div>
            </div> 
            
          </div>
          <div  v-if="uN.length>0" class="mt-3 space-y-1 px-2">
            <router-link
                v-for="item in uN"
                :key="item.name"
                :to="{name: item.name}"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
            {{ item.auth }} {{ item.label }}
            </router-link>

          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

</template>

<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { computed, ref, onMounted, watch } from 'vue'
  import store from '@/store'

  const auth = computed( () => store.getters['user/getUser'] )

  const user = {
    imageUrl:
      '/user.png',
  }
  
  const navigation = [
    { name: 'Home', label: 'Home' },
    { name: 'About', label: 'About' },
  ]

  const userNavigation = [
    { name: 'Dashboard', label: 'Dashboard', reqAuth: true },
    { name: 'Logout', label: 'Logout', reqAuth: true },
    { name: 'Register', label: 'Register', reqGuest: true },
    { name: 'Login', label: 'Login', reqGuest: true },
  ]

  const uN = ref( [] )

  const navPreparation = ( origin, output ) => {

    output.value = []

    origin.map( ( item, index ) => {

      if( auth.value ) {

        if( item.reqAuth || ( ! item.reqAuth && ! item.reqGuest ) ) {
          output.value.push( origin[index] )
        }

      } else {

        if( ! item.reqAuth || item.reqGuest ) {
          output.value.push( origin[index] )
        }

      }        

    } )

  }

  onMounted( () => {

    navPreparation( userNavigation, uN )

  } )

  watch( auth, () => {

    navPreparation( userNavigation, uN )

  } )
  
</script>
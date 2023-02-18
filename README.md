# Maximus SPA Vue

## What is Maximus SPA Vue?
Maximus SPA Vue is a starter kit for Vue.js 3 Single Page Application (SPA) https://github.com/Maxim-us/Maximus-SPA

#### Features:
- Registration
- Email verification
- Login
- Logout
- Reset Password

#### Installation:
0. `git clone https://github.com/Maxim-us/Maximus-SPA.git`

1. `cd Maximus-SPA`

2. `npm install`

3. `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`

4. `CTRL + C` ( to stop tailwindcss server or open a new terminal )

5. `npm run dev`

#### Setting up:
Create a .env file in the root folder of your project and add several variables there:

```javascript
VITE_API_BASE_URL=https://api.markomaksym.com.ua
VITE_APP_URL=http://localhost:3000
VITE_EMAIL_VERIFICATION=true
VITE_EMAIL_VERIFICATION_BASE_URL=http://localhost:3000/verify-email-check
VITE_RESET_PASSWORD_BASE_URL=http://localhost:3000/reset-password
```
If you want to check email verification feature, you must use a real email address in case you use https://api.markomaksym.com.ua API.

You can use Maximus API on your local PC and customize it. Please find Maximus API here: https://github.com/Maxim-us/Laravel-Vue3-Breeze

###### Inspired by:
https://github.com/garethredfern/laravel-vue/tree/feature/vue-3
https://github.com/thecodeholic/laravel-vue-survey
https://github.com/cretueusebiu/laravel-vue-spa
/** @type {import('tailwindcss').Config} */
// npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

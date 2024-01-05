/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        'primary/base': '#6B4EFF',
        'primary/light': '#9990FF',
        'primary/lightest': '#E7E7FF',
        'primary/darkest': '#5538EE',
        'sky/lighter': '#F2F4F5',
        'sky/base': '#CDCFD0',
        'sky/light': '#E3E5E5',
        'sky/dark': '#979C9E',
        'sky/white': '#FFFFFF',
        'ink/dark': '#303437',
        'ink/light': '#6C7072',
        'ink/lighter': '#72777A',
        'ink/darkest': '#090A0A',
        'ink/darker': '#202325',
        'ink/base': '#404446'
      },
      boxShadow: {
        base: '0px 0px 25px 0px rgba(69, 69, 69, 0.10)'
      },
      height: {
        contentHeight: 'calc(100vh - 120px)'
      }
    }
  },
  plugins: []
}

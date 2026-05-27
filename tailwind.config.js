/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A1108',
          brown: '#2C1F0E',
          orange: '#EC7823',
          'orange-hover': '#D06A1A',
          'orange-light': '#FEF0E4',
          light: '#FAF9F7',
          warm: '#F2EFE9',
          border: '#E5DFD5',
          muted: '#7A6856',
          cream: '#F8F4EF',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(26,17,8,0.88) 0%, rgba(44,31,14,0.72) 50%, rgba(60,40,15,0.45) 100%)',
      },
    },
  },
  plugins: [],
}

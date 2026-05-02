// /** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar'; // Импортируем плагин

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slide1: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        slide2: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        slide1: 'slide1 1s ease-in-out infinite', // Добавьте параметры анимации, иначе она не запустится
        slide2: 'slide2 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    tailwindScrollbar({ preferredStrategy: 'pseudoelements', nocompatible: true }),
  ],
};

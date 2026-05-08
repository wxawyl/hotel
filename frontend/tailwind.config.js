/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#E6F4FA',
          100: '#B3DFF5',
          200: '#80CAEF',
          300: '#4DB5E9',
          400: '#1A9FE3',
          500: '#0077B6',
          600: '#005D91',
          700: '#00436B',
          800: '#002946',
          900: '#000F21',
        },
        sand: {
          50: '#FEFCF8',
          100: '#F9F5EB',
          200: '#F4E4C1',
          300: '#EAD4A3',
          400: '#DFC485',
          500: '#D4B467',
          600: '#C9A449',
          700: '#A6853B',
          800: '#83672E',
          900: '#604920',
        },
        coral: {
          50: '#FFF0F0',
          100: '#FFE0E0',
          200: '#FFC0C0',
          300: '#FFA0A0',
          400: '#FF8080',
          500: '#FF6B6B',
          600: '#E55555',
          700: '#CC4040',
          800: '#B32B2B',
          900: '#991616',
        },
        palm: {
          50: '#EDF7F1',
          100: '#D9EDE0',
          200: '#B3D9C3',
          300: '#8DC5A5',
          400: '#67B187',
          500: '#2D6A4F',
          600: '#265741',
          700: '#1F4433',
          800: '#183125',
          900: '#111E17',
        },
        cream: '#FAF8F5',
        ivory: '#FFFFF0',
        slate: '#4A5568',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'strong': '0 12px 40px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

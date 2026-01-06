/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        mercan: {
          900: '#18181b', // Main Text (Dark)
          50: '#fafafa', // Main Background (Light)
          coral: '#FF6B6B',
          teal: '#0D9488', // Darker teal for light bg
          violet: '#6366f1',
          surface: 'rgba(0, 0, 0, 0.03)',
          glass: 'rgba(255, 255, 255, 0.6)',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 107, 107, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}

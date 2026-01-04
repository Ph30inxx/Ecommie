/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Dark theme base colors
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
        'dark-elevated': '#2a2a2a',

        // Accent colors for dark theme
        'neon-cyan': '#22d3ee',
        'neon-blue': '#3b82f6',
        'neon-purple': '#a855f7',
        'neon-pink': '#ec4899',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        // Dark theme shadows
        'dark-sm': '0 1px 2px 0 rgb(0 0 0 / 0.5)',
        'dark-md': '0 4px 6px -1px rgb(0 0 0 / 0.5)',
        'dark-lg': '0 10px 15px -3px rgb(0 0 0 / 0.7)',
        'dark-xl': '0 20px 25px -5px rgb(0 0 0 / 0.8)',

        // Glowing shadows for dark theme
        'glow-cyan-sm': '0 0 10px rgba(34, 211, 238, 0.3)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.5)',
        'glow-cyan-lg': '0 0 30px rgba(34, 211, 238, 0.7)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',

        // Combined elevation + glow
        'neon-cyan': '0 10px 30px -5px rgba(34, 211, 238, 0.3), 0 0 20px rgba(34, 211, 238, 0.2)',
        'neon-blue': '0 10px 30px -5px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
            borderColor: 'rgba(34, 211, 238, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)',
            borderColor: 'rgba(34, 211, 238, 0.6)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)',
        'dark-gradient': 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'feedback-in': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'feedback-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-7px)' },
          '30%': { transform: 'translateX(7px)' },
          '45%': { transform: 'translateX(-5px)' },
          '60%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
        'score-pop': {
          '0%': { transform: 'scale(0.4)', opacity: '0' },
          '55%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'word-chip-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'success-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
          '50%': { boxShadow: '0 0 32px 6px rgba(34, 197, 94, 0.22)' },
        },
      },
      animation: {
        'feedback-in': 'feedback-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'feedback-shake': 'feedback-shake 0.55s ease-out both',
        'score-pop': 'score-pop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'word-chip-in': 'word-chip-in 0.38s ease-out both',
        'success-glow': 'success-glow 1.6s ease-in-out 2',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [animate],
}


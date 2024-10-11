import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xs: '425px'
      },
      colors: {
        primary: 'var(--primary)',
        hoverPrimary: 'var(--hover-primary)',
        secondary: 'var(--secondary)',
        txtColor: 'var(--txt-color)',
        borderColor: 'var(--border-color)',
        bgSemiblue: 'var(--bg-semiblue)',
        danger: 'var(--danger)',
        colorGray1: 'var(--color-gray-1)',
        colorGray2: 'var(--color-gray-2)',
        colorGray3: 'var(--color-gray-3)',
        colorGray4: 'var(--color-gray-4)'
      }
    }
  },
  plugins: []
}
export default config

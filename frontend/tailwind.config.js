/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#0B0F19',
        panelbg: '#111827',
        cardbg: '#1F2937',
        bordercolor: '#374151',
        brandblue: '#3B82F6',
        brandcyan: '#06B6D4',
        critical: '#EF4444',
        warning: '#F59E0B',
        normal: '#10B981'
      }
    },
  },
  plugins: [],
}

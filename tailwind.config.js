// Arquivo: tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Certifique-se que isso está configurado
  ],
  theme: {
    extend: {},
  },

  // É AQUI QUE VOCÊ COLOCA O PLUGIN:
  plugins: [
    require('tailwind-scrollbar'),  // <--- ADICIONE ESTA LINHA
    // outros plugins podem vir aqui
  ],
}
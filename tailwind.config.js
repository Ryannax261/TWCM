// Palette tirée de la charte TWCM Holding (carte de visite) :
// gris ardoise de la marque, gris clair et blanc.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#4A504E', // gris de marque (fond de la carte de visite)
        slate: '#353A38', // gris plus profond, survols et sections d'appel
        steel: '#AFB2B1', // gris moyen, filets et détails décoratifs
        mist: '#E8E9E9', // gris clair de la marque
        accent: '#F5AF19', // or : touche de couleur (boutons, bordures, mises en avant)
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'], // géométrique, proche du logotype
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

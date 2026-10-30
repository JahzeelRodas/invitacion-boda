/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Paleta "minimalismo azul profundo": papel crema, tinta azul marino
           y acentos dorados antiguos. */
        cream: '#F7F5EE',
        mist: '#ECE4D8',
        abyss: '#001531',
        navy: {
          DEFAULT: '#00224C',
          bright: '#073268',
          sky: '#0B3A72',
          soft: '#3F6EA8',
        },
        ink: '#00224C',
        gold: {
          DEFAULT: '#C9A24A',
          antique: '#B58B2F',
        },

        /* Paleta del diseño B ("elegante 2026": papel cálido, pizarra azul,
           oliva suave y acento rojo profundo). */
        bPaper: '#fffdfa',
        bInk: '#304254',
        bHead: '#496070',
        bNavy: '#293C4B',
        bBody: '#5C5C5C',
        bNote: '#545454',
        bSage: '#808871',
        bSage2: '#A6AA79',
        bWave: '#98A26B',
        bLink: '#B50F15',
        bFooter: '#860D11',
      },
      fontFamily: {
        display: ['"Viaoda Libre"', 'Georgia', 'serif'],
        script: ['"The Nautigal"', '"Snell Roundhand"', 'cursive'],
        hand: ['"Ms Madi"', 'cursive'],
        serif: ['Baskerville', '"Times New Roman"', '"Nimbus Roman"', 'Lora', 'Georgia', 'serif'],
        lora: ['Lora', 'Georgia', 'serif'],
        case: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],

        /* Familias del diseño B */
        bQuatt: ['Quattrocento', 'Georgia', 'serif'],
        bAlice: ['Alice', 'Georgia', 'serif'],
        bCardo: ['Cardo', 'Georgia', 'serif'],
        bParis: ['Parisienne', '"Great Vibes"', 'cursive'],
        bHand: ['"Ms Madi"', 'cursive'],
        bSans: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '4px 4px 10px rgba(0,0,0,0.25)',
        float: '3px 4px 3px rgba(0,0,0,0.3)',
        cover: '0 25px 60px -12px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.2)',
        seal: '0 4px 20px rgba(0,34,76,0.5)',
      },
    },
  },
  plugins: [],
}

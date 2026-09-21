tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#171412',
        mist: '#b8ada1',
        paper: '#28231f',
        line: '#5b5047',
        frost: '#3b342e',
        sky: { DEFAULT: '#d9ad68', dark: '#a9783b', soft: '#ebc98e' },
      },
      spacing: { tight: '8px', item: '16px', card: '24px', block: '40px', section: '80px' },
      letterSpacing: { display: '-0.03em' },
      lineHeight: { body: '1.7' },
      boxShadow: {
        elevated: '0 8px 24px rgba(0,0,0,0.18)',
        floating: '0 24px 80px rgba(0,0,0,0.28)',
      },
      transitionTimingFunction: { spring: 'cubic-bezier(0.22, 1.2, 0.36, 1)' },
    },
  },
};

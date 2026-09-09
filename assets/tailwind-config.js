tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#12181f',
        mist: '#5c6874',
        paper: '#f4f7fb',
        line: '#d5dde6',
        frost: '#e6eef6',
        sky: { DEFAULT: '#1a6fb5', dark: '#145a94', soft: '#dceaf7' },
      },
      spacing: { tight: '8px', item: '16px', card: '24px', block: '40px', section: '80px' },
      letterSpacing: { display: '-0.03em' },
      lineHeight: { body: '1.7' },
      boxShadow: {
        elevated: '0 1px 1px rgba(26,111,181,0.06), 0 8px 24px rgba(18,24,31,0.06)',
        floating: '0 2px 4px rgba(26,111,181,0.08), 0 18px 40px rgba(18,24,31,0.12), 0 40px 72px rgba(26,111,181,0.10)',
      },
      transitionTimingFunction: { spring: 'cubic-bezier(0.22, 1.2, 0.36, 1)' },
    },
  },
};

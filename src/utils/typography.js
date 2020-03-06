import Typography from 'typography';

const typography = new Typography({
  title: 'Firas',
  baseFontSize: '16px',
  baseLineHeight: 1.61,
  headerFontFamily: ['Fira Sans', 'sans-serif'],
  bodyFontFamily: ['Fira Sans', 'sans-serif'],
  bodyWeight: 400,
  headerWeight: 700,
  boldWeight: 700,
  scaleRatio: 1.618,
});
// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;

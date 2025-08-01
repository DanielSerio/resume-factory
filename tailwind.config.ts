export default {
  content: [
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/routes/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /max-w-(((3|2)?)xs|sm|md|lg|xl|\dxl)/,
    },
  ],
};
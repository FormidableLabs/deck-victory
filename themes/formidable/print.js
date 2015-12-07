import print from "spectacle/themes/default/print";

const colors = {
  primary: "#000000",
  secondary: "#000000",
  tertiary: "#000000",
  darkestGray: "#000000",
  darkerGray: "#000000",
  darkGray: "#000000",
  gray: "#000000",
  lightGray: "#000000",
  lighterGray: "#000000",
  lightestGray: "#000000",
  darkRed: "#c23b33",
  red: "#ca5144",
  lightRed: "#000000",
  lighterRed: "#000000",
  lightestRed: "#000000"
};

const fonts = {
  secondary: "'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  primary: "'Didot', 'Bodoni MT', 'Cochin', 'Baskerville', 'Goudy Old Style', 'Bitstream Charter', serif",
  tertiary: "'Source Code Pro', 'Inconsolata', 'Courier New', 'Courier', monospace"
};

print.colors = colors;
print.fonts = fonts;
print.global.body.fontFamily = fonts.primary;
print.global.body.color = colors.primary;

export default print;

import { 
  createLightTheme,
  BrandVariants,
  Theme
} from '@fluentui/react-components';

// Define brand colors for the application
const myBrandVariants = {
  10: "#020305",
  20: "#111723",
  30: "#16263D",
  40: "#193253",
  50: "#1B3F6A",
  60: "#1B4C82",
  70: "#18599B",
  80: "#0F67B4",
  90: "#0078D4", // Primary Microsoft blue
  100: "#106EBE",
  110: "#1F7CC8",
  120: "#2E8AD2",
  130: "#3D98DC",
  140: "#4CA6E6",
  150: "#5BB4F0",
  160: "#6AC2FA"
};

// Create Fluent UI theme
const fluentTheme = createLightTheme(myBrandVariants);

// Export theme for use throughout the application
export const theme = fluentTheme;
export default fluentTheme;
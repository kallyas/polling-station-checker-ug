import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // For light/dark mode specific styles

const config = {
  initialColorMode: 'light', // can be 'light', 'dark', or 'system'
  useSystemColorMode: false, // if true, initialColorMode is ignored
};

const colors = {
  brand: { // Primary color palette (inspired by Uganda flag elements or official colors)
    50: '#fff0e6',  // Lightest shade (example)
    100: '#ffe0cc',
    200: '#ffc299',
    300: '#ffa366',
    400: '#ff8533',
    500: '#FF7000',  // Key brand color (example: vibrant orange)
    600: '#cc5a00',
    700: '#009E49',  // Dark Green (ECU like or National Green)
    800: '#00632C',
    900: '#000000',  // Black (Uganda Flag)
    // Accent colors
    accentYellow: '#FCDC04', // Yellow (Uganda Flag)
    accentRed: '#D90000',   // Red (Uganda Flag)
  },
  // You can define other semantic colors if needed
  success: '#38A169', // Green
  error: '#E53E3E',   // Red
  warning: '#DD6B20', // Orange
};

const fonts = {
  heading: `'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
  body: `'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
  mono: `'SFMono-Regular', Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('gray.50', 'gray.800')(props), // Light gray for light mode, dark for dark mode
      color: mode('gray.800', 'whiteAlpha.900')(props),
      lineHeight: 'base',
      fontFeatureSettings: `'kern'`,
      textRendering: `optimizeLegibility`,
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    }
  }),
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md', // Slightly rounded buttons
    },
    variants: {
      solid: (props) => ({ // Customize solid variant for brand color
        bg: mode('brand.700', 'brand.500')(props), // Primary brand color for buttons
        color: 'white',
        _hover: {
          bg: mode('brand.800', 'brand.600')(props),
          _disabled: { // Ensure hover state for disabled is same as base disabled
            bg: mode('brand.700', 'brand.500')(props),
          }
        },
        _active: {
            bg: mode('brand.900', 'brand.700')(props),
        },
        _disabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
            bg: mode('brand.700', 'brand.500')(props), // Keep color but change opacity
        }
      }),
    },
  },
  Input: { // Example: Global Input styling
    variants: {
        outline: (props) => ({
            field: {
                borderColor: mode('gray.300', 'gray.600')(props),
                _hover: {
                    borderColor: mode('brand.500', 'brand.300')(props),
                },
                _focus: {
                    borderColor: mode('brand.500', 'brand.300')(props),
                    boxShadow: `0 0 0 1px ${props.theme.colors.brand[500]}`,
                },
            },
        }),
    },
    sizes: {
        lg: {
            field: {
                fontSize: 'md',
                py: 3,
                px: 4,
                borderRadius: 'md',
            },
        },
    },
  },
  Heading: {
    baseStyle: (props) => ({
        color: mode('brand.900', 'brand.50')(props), // Darker headings in light mode
    }),
  },
  // ... other component customizations
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
});

export default theme;
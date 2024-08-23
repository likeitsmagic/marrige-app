import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#ffe8e7",
      100: "#f9c5c0",
      200: "#f3a29a",
      300: "#ed7f73",
      400: "#e75c4d",
      500: "#ba645d",
      600: "#8f4d48",
      700: "#643633",
      800: "#3a1f1e",
      900: "#100808",
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
          _active: {
            bg: "brand.700",
          },
        },
      },
    },
  },
});

export default theme;

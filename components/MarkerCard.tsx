import { styled } from "@stitches/react";
import React from "react";

const indigo = "#746aff";

export const MarkerCard = styled("div", {
  width: "280px",

  color: "White",
  border: "1px solid white",
  borderRadius: 4,

  transform: "translateY(-50%)",
  backdropFilter: "blur(8px)",

  background: "#000000c8",

  transition: `
    box-shadow 0.7s ease-in-out;
    height 0.2s ease-in-out;
  `,

  variants: {
    wide: { true: { width: 330 } },
    active: {
      true: {
        boxShadow: `
          0 0 14px #ffffff99;         /* outer right cyan */
          `,
      },
    },
  },
});

export const MarkerCardHeading = styled("div", {
  position: "absolute",
  top: -13,
  left: 10,
  fontFamily: "Jetbrains Mono",
  color: "black",
  fontWeight: "bold",
  background: "white",

  borderRadius: "2px",
  padding: "2px 6px",

  "&:hover": {
    color: indigo,
    borderColor: indigo,
    cursor: "pointer",
  },

  variants: {
    size: {
      small: { fontSize: 10 },
      medium: { fontSize: 14 },
      large: { fontSize: 18 },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

export const MarkerCardBody = styled("div", {
  marginTop: 10,
  padding: "12px 14px",
  fontFamily: "Iosevka SS05",
  fontSize: 14,

  variants: {
    boot: {
      true: {
        padding: "18px 14px",
        fontSize: 20,
        backdropFilter: "none",
      },
    },
  },
});

export const MarkerCardButton = styled("button", {
  backgroundColor: "#0101e0",
  color: "white",
  borderRadius: 0,
  border: "none",
  fontFamily: "Iosevka SS05",
  fontSize: 20,
  padding: "2px 6px",

  // width: 200,
  textAlign: "left",

  "&:hover": {
    color: "white",
    backgroundColor: indigo,
  },

  variants: {
    size: { small: { fontSize: 12 } },
  },
});

const TechnologyWrapper = styled("div", {
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 2,
  borderStyle: "solid",
  borderColor: "#d4d4d4",
  padding: 2,

  marginRight: 2,
});

export const Technology = ({ children }: { children: React.ReactNode }) => (
  <TechnologyWrapper>{children}</TechnologyWrapper>
);

export const Technologies = styled("div", {
  display: "flex",
});

export const MarkerInnerHeading = styled("h3", {
  fontSize: 12,
  marginBottom: 8,
});

export const Text = styled("p", {
  margin: 0,
  fontSize: 12,

  variants: {
    align: {
      right: { textAlign: "right" },
    },
  },
});

export const TechnologySection = ({ children }: { children: React.ReactNode }) => (
  <div>
    <MarkerInnerHeading>Built with:</MarkerInnerHeading>
    <Technologies>{children}</Technologies>
  </div>
);

export const Flex = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  justifyItems: "flex-end",

  variants: {
    flexDirection: {
      col: { flexDirection: "column" },
      row: { flexDirection: "row" },
    },
  },

  defaultVariants: {
    flexDirection: "row",
  },
});

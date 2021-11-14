import { styled } from "@stitches/react";
import React from "react";
import Emoji from "./Emoji";

const indigo = "#746aff";

export const MarkerCard = styled("div", {
  width: "280px",

  color: "White",
  border: "1px solid white",
  borderRadius: 4,

  transform: "translateY(-50%)",
  backdropFilter: "blur(8px)",

  background: "#000000ba",

  variants: {
    wide: { true: { width: 330 } },
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
  padding: "18px 14px",
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

const MarkerCardControls = styled("div", {
  color: "white",
  fontFamily: "Iosevka SS05",
  display: "inline-flex",
  justifyContent: "space-between",
  width: "100%",

  fontSize: 12,
});

const KeyCommand = styled("span", {
  border: "1px solid white",
  borderRadius: 2,
  display: "flex",

  padding: 4,

  "&:hover": {
    color: indigo,
    borderColor: indigo,
    cursor: "pointer",
  },
});

export const MarkerCardButton = styled("button", {
  backgroundColor: "blue",
  color: "white",
  borderRadius: 0,
  border: "none",
  fontFamily: "Iosevka SS05",
  fontSize: 20,
  padding: "8px 10px",
  marginLeft: "auto",

  "&:hover": {
    color: "white",
    backgroundColor: indigo,
  },
});

export const DefaultMarkerCard = () => (
  <>
    <MarkerCard>
      <MarkerCardHeading>Zaymon.dev</MarkerCardHeading>
      <MarkerCardBody>
        Hi there!
        <br />
        <br /> My name is <strong>Zaymon</strong>. I'm a full stack software engineer specialising
        in building software experiences that create real moments of connection.
        <br />
        <br />
        Welcome to my galaxy.
        <Emoji symbol="🚀" label="Emoji of a spaceship." spaceLeft />
        <Emoji symbol="🪐" label="Emoji of saturn." />
        <Emoji symbol="✨" label="Emoji of stars." />
      </MarkerCardBody>
    </MarkerCard>
  </>
);

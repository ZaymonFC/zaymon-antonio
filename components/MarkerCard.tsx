import { styled } from "@stitches/react";
import React from "react";
import Emoji from "./Emoji";

const indigo = "#746aff";

export const MarkerCard = styled("fieldset", {
  width: "280px",

  color: "White",
  border: "1px solid white",
  borderRadius: "2px",

  transform: "translateY(-50%)",
  backdropFilter: "blur(4px)",

  background: "#000000ba",
});

export const MarkerCardHeading = styled("legend", {
  fontFamily: "Jetbrains Mono",
  color: "black",
  fontWeight: "bold",
  background: "white",

  borderRadius: "2px",
  padding: "2px 4px",

  "&:hover": {
    color: indigo,
    borderColor: indigo,
    cursor: "pointer",
  },
});

export const MarkerCardBody = styled("div", {
  fontFamily: "Iosevka SS05",
  fontSize: 14,

  padding: 4,
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
  backgroundColor: "white",
  borderRadius: 0,
  border: "none",
  fontFamily: "Iosevka SS05",
  fontSize: 20,
  padding: "4px 8px",
  marginLeft: "auto",

  "&:hover": {
    color: "white",
    backgroundColor: indigo,
  },
});

export default function DefaultMarkerCard() {
  return (
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
          <Emoji symbol="🪐" label="Emoji of saturn." spaceLeft />
          <Emoji symbol="✨" label="Emoji of stars." spaceLeft />
        </MarkerCardBody>
      </MarkerCard>

      {/* <Fade duration={0.2} delay={1.5}>
        <MarkerCardControls>
          <KeyCommand>{"<<"}</KeyCommand>
          <KeyCommand>{">>"}</KeyCommand>
        </MarkerCardControls>
      </Fade> */}
    </>
  );
}

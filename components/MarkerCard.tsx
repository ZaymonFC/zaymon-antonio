import { styled } from "@stitches/react";
import React from "react";
import Emoji from "./Emoji";
import Fade from "./Fade";

const indigo = "#746aff";

const Card = styled("fieldset", {
  margin: 0,
  color: "White",
  border: "1px solid white",
  borderRadius: "2px",
  width: "280px",
  background: "#00000061",

  marginBottom: 4,
});

const MarkerCardHeading = styled("legend", {
  fontFamily: "Jetbrains Mono",
  color: "black",
  fontWeight: "bold",
  background: "white",
  padding: "4px",
  borderRadius: "2px",
  "&:hover": {
    color: indigo,
    borderColor: indigo,
    cursor: "pointer",
  },
});

const MarkerCardBody = styled("div", {
  fontFamily: "Iosevka SS05",
  padding: "4px",
  fontSize: 14,
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

type MarkerCardProps = { active?: boolean };

export default function MarkerCard({ active }: MarkerCardProps) {
  return (
    <>
      <Card>
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
      </Card>
      {/* {active && (
        <Fade duration={0.2} delay={1.5}>
          <MarkerCardControls>
            <KeyCommand>{"<<"}</KeyCommand>
            <KeyCommand>{">>"}</KeyCommand>
          </MarkerCardControls>
        </Fade>
      )} */}
    </>
  );
}

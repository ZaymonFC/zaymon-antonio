import { styled } from "@stitches/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Fade from "../components/Fade";
import Three from "../components/Galaxy";

const Body = styled("div", {
  backgroundColor: "#1a1a1a",
  height: "100vh",
});

const Main = styled("main", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  padding: "32px",
});

const border = {
  borderWidth: "2px",
  borderColor: "#42bbf3",
  borderStyle: "solid",
  borderRadius: "2px",
};

const Dialogue = styled("fieldset", {
  ...border,

  fontFamily: "Jetbrains Mono",
  fontSize: "1rem",
  backgroundColor: "#00000044",
  color: "White",

  marginBottom: "16px",

  boxShadow: `
    1.7px 1.7px 3.5px rgba(0, 0, 0, 0.019),
    3.9px 3.9px 7.8px rgba(0, 0, 0, 0.03),
    6.7px 6.7px 13.2px rgba(0, 0, 0, 0.039),
    10.3px 10.3px 20.4px rgba(0, 0, 0, 0.046),
    15.2px 15.2px 30.2px rgba(0, 0, 0, 0.053),
    22.3px 22.3px 44.4px rgba(0, 0, 0, 0.059),
    33.5px 33.5px 66.6px rgba(0, 0, 0, 0.064),
    53.4px 53.4px 106.2px rgba(0, 0, 0, 0.068),
    100px 100px 199px rgba(0, 0, 0, 0.07)
  `,

  hover: {
    color: "Green",
  },

  maxWidth: "320px",
});

const Legend = styled("legend", {
  color: "White",

  fontSize: "2rem",
  fontFamily: "Cardo",
  padding: "0 0.5rem",
  borderRadius: "4px",
});

const SelectItem = styled("a", {
  padding: "4px",
  borderRadius: "2px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#386aa3",
  },
});

const Heading = styled("h1", {
  margin: 0,

  fontFamily: "Cardo",
  fontSize: "4rem",
  color: "white",
});

const TagLine = styled("h2", {
  margin: 0,
  padding: 0,

  color: "white",
  fontFamily: "Cardo",
  fontStyle: "italic",
  marginTop: "8px",
});

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zaymon.Dev</title>
        <meta name="description" content="CHANGE ME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        <Three />
        <Main>
          <Fade duration={0.5} delay={0.5}>
            <Heading>Zaymon Antonio.</Heading>
          </Fade>
          <Fade duration={0.5} delay={0.8}>
            <TagLine>Software Engineer.</TagLine>
          </Fade>

          <div style={{ marginTop: "48px" }}></div>

          {/* <Fade duration={0.15} delay={1.5}>
            <Dialogue>
              <Legend>My Writing</Legend>
              <SelectItem href="https://boundless.garden">
                {">"} Boundless.Garden
              </SelectItem>
            </Dialogue>
            <Dialogue>
              <Legend>My Projects</Legend>
              <SelectItem> {">"} Boundless.Garden</SelectItem>
            </Dialogue>
            <Dialogue>
              <Legend>Socials</Legend>
              <SelectItem> {">"} Boundless.Garden</SelectItem>
            </Dialogue>
            <Dialogue>
              <Legend>Get in Touch</Legend>
              <SelectItem> {">"} Boundless.Garden</SelectItem>
            </Dialogue>
          </Fade> */}
        </Main>
      </Body>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import { styled } from "@stitches/react";
import Three from "../components/Galaxy";
import { motion } from "framer-motion";

const Body = styled("body", {
  backgroundColor: "#1a1a1a",
  height: "100vh",
});

const Main = styled("main", {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100%",
  padding: "32px",
});

const border = {
  borderWidth: "1px",
  borderColor: "#42f392",
  borderStyle: "solid",
};

const Dialogue = styled("fieldset", {
  ...border,

  borderRadius: "12px",

  fontFamily: "Jetbrains Mono",
  fontSize: "1rem",
  backgroundColor: "#1a150626",
  color: "White",

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

  maxWidth: "200px",
});

const Legend = styled("legend", {
  ...border,

  color: "White",
  backgroundColor: "#1a1a1a",

  fontSize: "1.2rem",
  fontFamily: "Iosevka SS05",
  padding: "0.5rem",
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

type FadeProps = { children: React.ReactNode; duration?: number };
export const Fade = ({ children, duration }: FadeProps) => {
  const time = duration ? duration : 0.15;
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: time }}
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zaymon.Dev</title>
        <meta name="description" content="CHANGE ME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        <Three />
        <Main>
          <Fade duration={1}>
            <Heading>Zaymon Antonio.</Heading>
          </Fade>
          <Fade duration={1.5}>
            <TagLine>Software Engineer.</TagLine>
          </Fade>
          {/* <Dialogue>
            <Legend>Console</Legend>
            <p> {">"} A message stream loads forth from a distanct galaxy.</p>
          </Dialogue> */}
        </Main>
      </Body>
    </div>
  );
};

export default Home;

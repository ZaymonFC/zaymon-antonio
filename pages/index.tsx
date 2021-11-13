import { styled } from "@stitches/react";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Fade from "../components/Fade";
import Scene from "../components/Scene";
import {
  MarkerCard,
  MarkerCardBody,
  MarkerCardButton,
  MarkerCardHeading,
} from "../components/MarkerCard";
import { playSfx, sfxAtlas } from "../modules/Sounds";

let useKeyDown = (...meh: any[]) => {};

if (process.browser) {
  useKeyDown = require("use-control/lib/keyStream").useKeyDown;
}

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

  variants: {
    visibility: {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
    },
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

const CenterScreen = styled("div", {
  display: "flex",
  justifyContent: "center",
  justifyItems: "center",
  alignItems: "center",

  height: "100vh",
});

const BootScreen = ({ setBooted }: { booted: boolean; setBooted: () => void }) => {
  const transition = { type: "spring", stiffness: 10000, damping: 15 };
  return (
    <motion.div
      key="boot-screen"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.4, ...transition }}
      exit={{ opacity: 0, transition: { delay: 0, ...transition } }}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}
    >
      <CenterScreen>
        <MarkerCard wide>
          <MarkerCardHeading size="large">Zaymon.dev</MarkerCardHeading>
          <MarkerCardBody boot>
            Welcome.
            <br />
            <br />
            <MarkerCardButton onClick={() => setBooted()}>
              Press to [B]oot the Universe
            </MarkerCardButton>
          </MarkerCardBody>
        </MarkerCard>
      </CenterScreen>
    </motion.div>
  );
};

const Title = () => (
  <>
    <Fade duration={0.5} delay={0.5}>
      <Heading>Zaymon Antonio.</Heading>
    </Fade>
    <Fade duration={0.5} delay={0.8}>
      <TagLine>Software Engineer.</TagLine>
    </Fade>
  </>
);

const TheGalaxy = ({ visible }: { visible: boolean }) => {
  return (
    <>
      <Scene visible={visible} />
      <Main visibility={visible ? "visible" : "hidden"}>{visible && <Title />}</Main>
    </>
  );
};

const Home: NextPage = () => {
  const [booted, setBooted] = React.useState(false);

  useEffect(() => {
    if (booted) {
      playSfx(sfxAtlas.boot);
      playSfx(sfxAtlas.powerup);
    }
  }, [booted]);

  useKeyDown("B".charCodeAt(0), () => {
    setBooted(true);
  });

  return (
    <>
      <Head>
        <title>Zaymon.Dev</title>
        <meta name="description" content="CHANGE ME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        <AnimatePresence>
          <TheGalaxy visible={booted} key="aslkdfj" />
          {!booted && <BootScreen booted={booted} setBooted={() => setBooted(true)} />}
        </AnimatePresence>
      </Body>
    </>
  );
};

export default Home;

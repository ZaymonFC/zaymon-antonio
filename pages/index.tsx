import { styled } from "@stitches/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Fade from "../components/Fade";
import Three from "../components/Galaxy";
import {
  MarkerCard,
  MarkerCardBody,
  MarkerCardButton,
  MarkerCardHeading,
} from "../components/MarkerCard";

import { playSfx, sfxAtlas } from "../components/Sounds";

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

const HomeMarkerCard = styled(MarkerCard, {
  width: 330,
});

const HomeMarkerCardBody = styled(MarkerCardBody, {
  fontSize: 20,
});

const BootScreen = ({ setBooted }: { setBooted: () => void }) => (
  <Fade duration={0.3}>
    <CenterScreen>
      <HomeMarkerCard>
        <MarkerCardHeading>Zaymon.dev</MarkerCardHeading>
        <HomeMarkerCardBody>
          Welcome.
          <br />
          <br />
          <MarkerCardButton onClick={() => setBooted()}>
            Press to [B]oot the Universe
          </MarkerCardButton>
        </HomeMarkerCardBody>
      </HomeMarkerCard>
    </CenterScreen>
  </Fade>
);

const TheGalaxy = () => {
  return (
    <>
      <Three />
      <Main>
        <Fade duration={0.5} delay={0.5}>
          <Heading>Zaymon Antonio.</Heading>
        </Fade>
        <Fade duration={0.5} delay={0.8}>
          <TagLine>Software Engineer.</TagLine>
        </Fade>

        <div style={{ marginTop: "48px" }}></div>
      </Main>
    </>
  );
};

const Home: NextPage = () => {
  const [booted, setBooted] = React.useState(false);

  useEffect(() => {
    if (booted) {
      playSfx(sfxAtlas.boot);
    }
  }, [booted]);

  return (
    <>
      <Head>
        <title>Zaymon.Dev</title>
        <meta name="description" content="CHANGE ME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        {!booted && <BootScreen setBooted={() => setBooted(true)} />}
        {booted && <TheGalaxy />}
      </Body>
    </>
  );
};

export default Home;

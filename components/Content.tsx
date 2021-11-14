import React, { useState, useEffect } from "react";
import { useKeyDown, KEYS } from "../modules/Control";
import { playSfx, sfxAtlas } from "../modules/Sounds";
import Emoji from "./Emoji";
import Fade from "./Fade";
import {
  MarkerCard,
  MarkerCardHeading,
  MarkerCardBody,
  TechnologySection,
  Technology,
  Flex,
  MarkerCardButton,
  Text,
} from "./MarkerCard";

export const IntroCard = ({ active }: { active: boolean }) => {
  const [additionalInfo, setAdditionalInfo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAdditionalInfo(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [setAdditionalInfo]);

  return (
    <MarkerCard active={active}>
      <MarkerCardHeading>Welcome!</MarkerCardHeading>
      <MarkerCardBody>
        <Text>
          My name is <strong>Zaymon</strong>. I'm a full stack software engineer specialising in
          building software experiences that create connection instead of frustration.
        </Text>
        <br />
        <Text>
          Welcome to my galaxy.
          <Emoji symbol="🚀" label="Emoji of a spaceship." spaceLeft />{" "}
          <Emoji symbol="🪐" label="Emoji of saturn." />{" "}
          <Emoji symbol="✨" label="Emoji of stars." />
        </Text>

        {additionalInfo && (
          <Fade duration={0.3}>
            <br />
            <Text align="right">Press right arrow {"->"}</Text>
          </Fade>
        )}
      </MarkerCardBody>
    </MarkerCard>
  );
};

export const LetterDeskApp = ({ active }: { active: boolean }) => {
  const url = "https://www.letterdesk.app";

  useKeyDown(KEYS.l, () => {
    playSfx(sfxAtlas.link);
    window.open(url, "_blank");
  });

  return (
    <MarkerCard active={active}>
      <MarkerCardHeading>
        <a href={url} target="_blank">
          [L]etterDesk.app
        </a>
      </MarkerCardHeading>
      <MarkerCardBody>
        <Text>
          Kicking off a new generation of letter writing and <em>long form communication.</em>
        </Text>
        <br />
        <Text>
          In an attention starved world, LetterDesk gives you the time and space to communicate your
          thoughts, feelings, stories and ideas with others without the pressure of instant
          messaging.
        </Text>
        <TechnologySection>
          <Technology>React</Technology>
          <Technology>NextJS</Technology>
          <Technology>Clojure</Technology>
          <Technology>Typescript</Technology>
          <Technology>PostgreSQL</Technology>
        </TechnologySection>
      </MarkerCardBody>
    </MarkerCard>
  );
};

export const BoundlessGarden = ({ active }: { active: boolean }) => {
  const url = "https://www.boundless.garden";

  useKeyDown(KEYS.b, () => {
    playSfx(sfxAtlas.link);
    window.open(url, "_blank");
  });

  return (
    <MarkerCard active={active}>
      <MarkerCardHeading>
        <a href={url} target="_blank">
          [B]oundless.garden
        </a>
      </MarkerCardHeading>
      <MarkerCardBody>
        <Text>
          Boundless Garden is a place for me to let my guard down and tend to my thoughts.
          Currently, this consists of a series of essays documenting my personal journey.
        </Text>
        <TechnologySection>
          <Technology>React</Technology>
          <Technology>Next.JS</Technology>
          <Technology>Typescript</Technology>
          <Technology>Stitches.JS</Technology>
        </TechnologySection>
      </MarkerCardBody>
    </MarkerCard>
  );
};

export const Socials = ({ active }: { active: boolean }) => {
  const urls = {
    twitter: "https://twitter.com/ZaymonTheUnwise",
    github: "https://github.com/ZaymonFC",
    linkedIn: "https://www.linkedin.com/in/zaymon/",
  };

  const openWithSound = (url: string) => {
    playSfx(sfxAtlas.link);
    window.open(url, "_blank");
  };

  const twitter = (_: any) => openWithSound(urls.twitter);
  const github = (_: any) => openWithSound(urls.github);
  const linkedIn = (_: any) => openWithSound(urls.linkedIn);

  useKeyDown(KEYS.t, twitter);
  useKeyDown(KEYS.g, github);
  useKeyDown(KEYS.i, linkedIn);

  return (
    <MarkerCard active={active}>
      <MarkerCardHeading>Socials</MarkerCardHeading>
      <MarkerCardBody>
        <Text></Text>
        <br />
        <Flex flexDirection="col">
          <MarkerCardButton onClick={twitter} size="small">
            [T]witter @ZaymonTheUnwise
          </MarkerCardButton>
          <MarkerCardButton onClick={github} size="small">
            [G]ithub
          </MarkerCardButton>
          <MarkerCardButton onClick={linkedIn} size="small">
            Linked[I]n
          </MarkerCardButton>
        </Flex>
      </MarkerCardBody>
    </MarkerCard>
  );
};

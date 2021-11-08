import { styled } from "@stitches/react";

export const MarkerCard = styled("fieldset", {
  margin: 0,
  color: "White",
  border: "1px solid white",
  borderRadius: "2px",
  width: "240px",
  fontFamily: "Iosevka SS05",
  background: "#00000040",
});

export const MarkerCardHeading = styled("legend", {
  color: "black",
  background: "white",
  padding: "4px",
  borderRadius: "2px",
  "&:hover": {
    color: "Orange",
  },
});

export const MarkerCardBody = styled("div", {
  padding: "4px",
});

import React from "react";

type EmojiProps = {
  symbol: string;
  label: string;
  spaceRight?: boolean;
  spaceLeft?: boolean;
};

const Space = () => <span>&nbsp;</span>;

const Emoji = (props: EmojiProps) => {
  const inner = (
    <>
      {props.spaceLeft && <Space></Space>}
      {props.symbol}
      {props.spaceRight && <Space></Space>}
    </>
  );

  const attributes = {
    "aria-label": props.label,
    "aria-hidden": false,
    role: "img",
    className: "emoji",
  };

  return <span {...attributes}>{inner}</span>;
};

export default Emoji;

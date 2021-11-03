import { styled } from "@stitches/react";
import { motion } from "framer-motion";

const MotionDiv = styled(motion.div, {
  height: "100%",
});

type FadeProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
};

export default function Fade({ children, duration, delay }: FadeProps) {
  const time = duration ? duration : 0.15;

  return (
    <MotionDiv
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: time, delay: delay }}
      exit="exit"
    >
      {children}
    </MotionDiv>
  );
}

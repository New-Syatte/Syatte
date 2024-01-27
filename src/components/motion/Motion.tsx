"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  initial?: string;
  animate?: string;
  whileInView?: any;
  variants?: any;
  viewport?: any;
  whileHover?: any;
  [key: string]: any;
}
const Motion = ({
  children,
  initial = "",
  animate = "",
  whileHover = {},
  whileInView = {},
  variants = {},
  viewport = {},
  ...restProps
}: Props) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      whileInView={whileInView}
      variants={variants}
      viewport={viewport}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};

export default Motion;

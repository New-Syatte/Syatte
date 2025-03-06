import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const isMobile = useMediaQuery({ minWidth: 360, maxWidth: 819 });

  const checkResize = () => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    checkResize();
  }, [isMobile, checkResize]);

  return mobile;
};

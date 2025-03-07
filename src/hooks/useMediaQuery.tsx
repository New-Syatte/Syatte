import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const isMobile = useMediaQuery({ minWidth: 360, maxWidth: 819 });

  useEffect(() => {
    const checkResize = () => {
      setMobile(isMobile);
    };
    
    checkResize();
  }, [isMobile]);

  return mobile;
};

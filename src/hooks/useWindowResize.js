// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

function useResponsiveScreen() {
  const [windowDimensions, setwindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    mobileScreen: isMobileScreen(),
  });

  useEffect(() => {
    function handleResize() {
      setwindowDimensions((prevSize) => ({
        ...prevSize,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function isMobileScreen() {
  return window.innerWidth <= 768; // we Customize the breakpoint as per our requirements
}

export default useResponsiveScreen;

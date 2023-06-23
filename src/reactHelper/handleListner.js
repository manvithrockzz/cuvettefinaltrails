// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

function useResponsiveScreen() {
  const [windowDimensions, setwindowDimensions] = useState({
    // Initialize width with the current window's inner width
    width: window.innerWidth, // Initialize width with the current window's inner width
    height: window.innerHeight, // Initialize height with the current window's inner height
    mobileScreen: isMobileScreen(), // Determine if the screen is mobile based on the current window width
  });

  useEffect(() => { // Update width with the updated window's inner width on resize
    function handleResize() { 
      setwindowDimensions((prevSize) => ({
        // Update width with the updated window's inner width on resize
        ...prevSize,
        width: window.innerWidth, // Update width with the updated window's inner width on resize
        height: window.innerHeight, // Update height with the updated window's inner height on resize
      }));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions; // Return the window dimensions object
}

function isMobileScreen() {
  return window.innerWidth <= 768; // Determine if the window width is less than or equal to 768 to identify a mobile screen
}

export default useResponsiveScreen;

// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react'

// export default
//     function useWindowResize() {
//     const [windowSize, setWindowSize] = useState({
//         width: undefined,
//         height: undefined,
//         mobileScreen: undefined
//     });


//     useEffect(() => {
//         function handleResize() {
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });

//         }


//         window.addEventListener("resize", handleResize);

//         handleResize();

//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return windowSize;
// }


// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    mobileScreen: isMobileScreen(),
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize((prevSize) => ({
        ...prevSize,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function isMobileScreen() {
  return window.innerWidth <= 768; // Customize the breakpoint as per your requirements
}

export default useWindowResize;

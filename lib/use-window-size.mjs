"use client";
import { useState as t, useEffect as o } from "react";
function r() {
  const [i, n] = t({
    height: void 0,
    width: void 0
  });
  return o(() => {
    function e() {
      n({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    return window.addEventListener("resize", e), e(), () => window.removeEventListener("resize", e);
  }, []), i;
}
export {
  r as useWindowSize
};

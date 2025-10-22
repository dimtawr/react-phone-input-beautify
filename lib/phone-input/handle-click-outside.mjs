"use client";
import { useEffect as s } from "react";
const i = (n, o) => !o.some((t) => {
  var e;
  return (e = t == null ? void 0 : t.current) == null ? void 0 : e.contains(n.target);
});
function c(n, o) {
  s(() => {
    const t = (e) => {
      i(e, n) && o(e);
    };
    return document.addEventListener("mousedown", t), () => {
      document.removeEventListener("mousedown", t);
    };
  }, [n, o]);
}
export {
  c as useClickOutside
};

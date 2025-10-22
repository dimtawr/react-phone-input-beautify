"use client";
import { j as s } from "../node_modules/react/jsx-runtime.mjs";
function c(e) {
  const { country: t, height: n = 40, type: o = "png" } = e;
  return /* @__PURE__ */ s.jsx(
    "img",
    {
      ...e,
      alt: t,
      src: o === "svg" ? `https://flagcdn.com/${t.toLowerCase()}.${o}` : `https://flagcdn.com/h${n}/${t.toLowerCase()}.${o}`
    }
  );
}
export {
  c as CountryFlag
};

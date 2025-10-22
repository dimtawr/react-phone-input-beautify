"use client";
import { jsx as c } from "react/jsx-runtime";
function s(e) {
  const { country: t, height: n = 40, type: o = "png" } = e;
  return /* @__PURE__ */ c(
    "img",
    {
      ...e,
      alt: t,
      src: o === "svg" ? `https://flagcdn.com/${t.toLowerCase()}.${o}` : `https://flagcdn.com/h${n}/${t.toLowerCase()}.${o}`
    }
  );
}
export {
  s as CountryFlag
};

"use client";
import { j as l } from "../node_modules/react/jsx-runtime.mjs";
import { clsx as p } from "../node_modules/clsx/dist/clsx.mjs";
import { useLayoutEffect as a } from "react";
import g from "./phone-input.module.scss.mjs";
import { usePhoneInput as f } from "./phone-input-provider.mjs";
function v(o) {
  const { isDialogOpen: r, isPortal: i, phoneInputRef: t, setDialogPosition: s, setPhoneInputRef: n } = f(), { className: c, style: m } = o;
  return a(() => {
    if (t != null && t.current) {
      const u = t.current.getBoundingClientRect().height;
      s({ top: u });
    }
  }, [t, r]), /* @__PURE__ */ l.jsx(
    "div",
    {
      ...o,
      className: p(g.phoneInput, c),
      ref: (e) => {
        e && !(t != null && t.current) && n({
          current: e
        });
      },
      style: {
        ...i ? {} : { position: "relative" },
        ...m
      }
    }
  );
}
export {
  v as PhoneInputWrapper
};

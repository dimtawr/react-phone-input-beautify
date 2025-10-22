"use client";
import { jsx as u } from "react/jsx-runtime";
import p from "clsx";
import { useLayoutEffect as a } from "react";
import g from "./phone-input.module.scss.mjs";
import { usePhoneInput as f } from "./phone-input-provider.mjs";
function d(o) {
  const { isDialogOpen: r, isPortal: i, phoneInputRef: t, setDialogPosition: s, setPhoneInputRef: n } = f(), { className: c, style: l } = o;
  return a(() => {
    if (t != null && t.current) {
      const m = t.current.getBoundingClientRect().height;
      s({ top: m });
    }
  }, [t, r]), /* @__PURE__ */ u(
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
        ...l
      }
    }
  );
}
export {
  d as PhoneInputWrapper
};

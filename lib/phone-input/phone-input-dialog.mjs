"use client";
import { j as h } from "../node_modules/react/jsx-runtime.mjs";
import { clsx as D } from "../node_modules/clsx/dist/clsx.mjs";
import { useRef as I, useEffect as P } from "react";
import { useClickOutside as d } from "./handle-click-outside.mjs";
import n from "./phone-input.module.scss.mjs";
import { usePhoneInput as O } from "./phone-input-provider.mjs";
function N(e) {
  const { children: r, className: l, onOpenChange: t, open: i, ...a } = e, {
    dialogPosition: p,
    isDialogOpen: u,
    isPortal: f,
    props: { phoneInputDialogProps: g },
    setIsDialogOpen: m,
    triggerRef: c
  } = O(), o = typeof i == "boolean" ? i : u, s = I(null);
  return d([s, c], () => {
    o && m(!1);
  }), P(() => {
    t && t(o);
  }, [o]), p ? /* @__PURE__ */ h.jsx(
    "div",
    {
      ...a,
      ...g,
      className: D(
        n.phoneInputDialog,
        l,
        o && n.phoneInputDialogOpen,
        f && n.phoneInputDialogPortal
      ),
      ref: s,
      style: { top: p.top },
      children: r
    }
  ) : null;
}
function b(e) {
  return {
    phoneInputDialogProps: {
      "aria-hidden": !e.open
    }
  };
}
export {
  N as PhoneInputDialog,
  b as usePhoneInputDialog
};

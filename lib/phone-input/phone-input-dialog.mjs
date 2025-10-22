"use client";
import { jsx as h } from "react/jsx-runtime";
import D from "clsx";
import { useRef as I, useEffect as P } from "react";
import { useClickOutside as d } from "./handle-click-outside.mjs";
import n from "./phone-input.module.scss.mjs";
import { usePhoneInput as O } from "./phone-input-provider.mjs";
function j(e) {
  const { children: s, className: l, onOpenChange: t, open: i, ...a } = e, {
    dialogPosition: p,
    isDialogOpen: u,
    isPortal: f,
    props: { phoneInputDialogProps: g },
    setIsDialogOpen: m,
    triggerRef: c
  } = O(), o = typeof i == "boolean" ? i : u, r = I(null);
  return d([r, c], () => {
    o && m(!1);
  }), P(() => {
    t && t(o);
  }, [o]), p ? /* @__PURE__ */ h(
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
      ref: r,
      style: { top: p.top },
      children: s
    }
  ) : null;
}
function k(e) {
  return {
    phoneInputDialogProps: {
      "aria-hidden": !e.open
    }
  };
}
export {
  j as PhoneInputDialog,
  k as usePhoneInputDialog
};

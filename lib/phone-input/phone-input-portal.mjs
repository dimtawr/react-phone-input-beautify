"use client";
import { useState as a, useEffect as c, useLayoutEffect as d } from "react";
import f from "react-dom";
import { useWindowSize as p } from "../use-window-size.mjs";
import m from "./phone-input.module.scss.mjs";
import { usePhoneInput as h } from "./phone-input-provider.mjs";
function g({ children: s, className: n }) {
  const { phoneInputRef: e, setIsPortal: l } = h(), [t, i] = a(null), u = p();
  return c(() => {
    l(!0);
    const r = document.createElement("div");
    return r.classList.add(m.portal), i(r), () => {
      l(!1), t && t.parentNode && t.parentNode.removeChild(t);
    };
  }, []), d(() => {
    if (t && (e != null && e.current)) {
      const r = e.current, o = e.current.getBoundingClientRect();
      return t.style.position = "absolute", t.style.top = `${o.bottom}px`, t.style.left = `${o.left}px`, t.style.width = `${o.width}px`, n && t.classList.add(n), r.appendChild(t), () => {
        t.parentNode === r && r.removeChild(t);
      };
    }
    return () => {
    };
  }, [t, e, u]), t ? f.createPortal(s, t) : null;
}
export {
  g as default
};

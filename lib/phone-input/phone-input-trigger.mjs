"use client";
import { jsx as u } from "react/jsx-runtime";
import c from "clsx";
import g from "./phone-input.module.scss.mjs";
import { usePhoneInput as m } from "./phone-input-provider.mjs";
function f(e) {
  const { onClick: t } = e, { isDialogOpen: r, setIsDialogOpen: a, setTriggerRef: i, triggerRef: n } = m(), s = (o) => {
    a(!r), t == null || t(o);
  }, { children: p, className: l } = e;
  return /* @__PURE__ */ u(
    "button",
    {
      ...e,
      "aria-expanded": r,
      "aria-haspopup": "listbox",
      "aria-label": "Country selector",
      className: c(g.phoneInputTrigger, l),
      "data-open": r,
      onClick: s,
      ref: (o) => {
        o && !(n != null && n.current) && i({
          current: o
        });
      },
      role: "combobox",
      type: "button",
      children: p
    }
  );
}
function y(e) {
  return {
    triggerProps: {
      "aria-expanded": e.open,
      "aria-haspopup": "listbox",
      "aria-label": "Select country",
      role: "combobox",
      type: "button"
    }
  };
}
export {
  f as PhoneInputTrigger,
  y as usePhoneInputTrigger
};

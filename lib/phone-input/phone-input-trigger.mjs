"use client";
import { j as l } from "../node_modules/react/jsx-runtime.mjs";
import { clsx as c } from "../node_modules/clsx/dist/clsx.mjs";
import m from "./phone-input.module.scss.mjs";
import { usePhoneInput as g } from "./phone-input-provider.mjs";
function f(e) {
  const { onClick: t } = e, { isDialogOpen: r, setIsDialogOpen: a, setTriggerRef: s, triggerRef: n } = g(), i = (o) => {
    a(!r), t == null || t(o);
  }, { children: p, className: u } = e;
  return /* @__PURE__ */ l.jsx(
    "button",
    {
      ...e,
      "aria-expanded": r,
      "aria-haspopup": "listbox",
      "aria-label": "Country selector",
      className: c(m.phoneInputTrigger, u),
      "data-open": r,
      onClick: i,
      ref: (o) => {
        o && !(n != null && n.current) && s({
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

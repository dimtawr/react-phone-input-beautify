"use client";
import { j as i } from "../node_modules/react/jsx-runtime.mjs";
import { clsx as h } from "../node_modules/clsx/dist/clsx.mjs";
import { useCallback as C } from "react";
import { useController as I } from "../node_modules/react-hook-form/dist/index.esm.mjs";
import d from "./phone-input.module.scss.mjs";
import { usePhoneInput as g } from "./phone-input-provider.mjs";
import { getCountryCallingCode as y } from "../node_modules/libphonenumber-js/min/exports/getCountryCallingCode.mjs";
function P(e) {
  const { children: t, className: o, country: r, onClick: n, onKeyDown: l } = e, {
    props: { getListItemProps: u },
    setIsDialogOpen: a,
    state: c
  } = g(), m = (s) => {
    c.handleCountryChange(r), n == null || n(s), a(!1);
  }, f = (s) => {
    s.key === "Enter" && (c.handleCountryChange(r), l == null || l(s), a(!1));
  }, p = u({
    value: r
  });
  return /* @__PURE__ */ i.jsx(
    "li",
    {
      ...e,
      ...p,
      "aria-controls": r,
      className: h(d.countrySelectItem, o),
      onClick: m,
      onKeyDown: f,
      children: t
    }
  );
}
function N(e) {
  const { country: t, name: o } = e, {
    field: { ref: r, ...n }
  } = I({
    ...e
  });
  return /* @__PURE__ */ i.jsx(
    P,
    {
      ...e,
      ...n,
      onClick: () => {
        n.onChange({
          target: {
            name: o,
            value: `+${y(t)}`
          }
        });
      }
    }
  );
}
function S(e) {
  const { selected: t } = e;
  return {
    getListItemProps: C(
      (o) => ({
        "aria-controls": o.value,
        "aria-selected": t === o.value,
        role: "option"
      }),
      [t]
    )
  };
}
export {
  P as PhoneInputItem,
  N as PhoneInputItemWithForm,
  S as usePhoneInputItem
};

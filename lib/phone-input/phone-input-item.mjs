"use client";
import { jsx as i } from "react/jsx-runtime";
import p from "clsx";
import { getCountryCallingCode as C } from "libphonenumber-js";
import { useCallback as I } from "react";
import { useController as d } from "react-hook-form";
import g from "./phone-input.module.scss.mjs";
import { usePhoneInput as y } from "./phone-input-provider.mjs";
function P(e) {
  const { children: t, className: o, country: r, onClick: n, onKeyDown: s } = e, {
    props: { getListItemProps: u },
    setIsDialogOpen: a,
    state: c
  } = y(), m = (l) => {
    c.handleCountryChange(r), n == null || n(l), a(!1);
  }, f = (l) => {
    l.key === "Enter" && (c.handleCountryChange(r), s == null || s(l), a(!1));
  }, h = u({
    value: r
  });
  return /* @__PURE__ */ i(
    "li",
    {
      ...e,
      ...h,
      "aria-controls": r,
      className: p(g.countrySelectItem, o),
      onClick: m,
      onKeyDown: f,
      children: t
    }
  );
}
function b(e) {
  const { country: t, name: o } = e, {
    field: { ref: r, ...n }
  } = d({
    ...e
  });
  return /* @__PURE__ */ i(
    P,
    {
      ...e,
      ...n,
      onClick: () => {
        n.onChange({
          target: {
            name: o,
            value: `+${C(t)}`
          }
        });
      }
    }
  );
}
function j(e) {
  const { selected: t } = e;
  return {
    getListItemProps: I(
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
  b as PhoneInputItemWithForm,
  j as usePhoneInputItem
};

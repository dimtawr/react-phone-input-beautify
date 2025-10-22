"use client";
import { useState as m } from "react";
import C from "../node_modules/zod/lib/index.mjs";
import { isValidPhoneNumber as P } from "../node_modules/libphonenumber-js/min/exports/isValidPhoneNumber.mjs";
import { parsePhoneNumber as N } from "../node_modules/libphonenumber-js/min/exports/parsePhoneNumber.mjs";
import { AsYouType as f } from "../node_modules/libphonenumber-js/min/exports/AsYouType.mjs";
import { getCountryCallingCode as d } from "../node_modules/libphonenumber-js/min/exports/getCountryCallingCode.mjs";
import { iso31661 as T } from "../node_modules/iso-3166/1.mjs";
const Y = ({ invalid: e, required: o } = {
  invalid: "Invalid phone number",
  required: "Phone number is required"
}) => C.string({
  required_error: o
}).refine((n) => {
  try {
    return P(n);
  } catch {
    return !1;
  }
}, e);
function E(e) {
  const o = N(e);
  return o ? o.country : "";
}
function S(e, o) {
  const n = new f(o);
  if (!e)
    return `+${d(o)}`;
  const s = n.input(e);
  return s || e;
}
const L = ({ initialCountry: e = "US", initialPhoneNumber: o = "" } = {}) => {
  const [n, s] = m(e), h = d(e), [p, a] = m(() => S(o, e)), [l, c] = m(() => Y().safeParse(o).success), y = () => {
    a(`+${h}`), s(e), c(!1);
  }, b = (r, t) => new f(t).input(r.startsWith("+") ? r : `+${r}`), g = (r) => {
    const t = new f(n);
    t.input(r);
    const u = t.getNumber();
    if (a(r), u && u.isValid()) {
      c(!0);
      const i = u.country;
      i && i !== n && s(i);
    } else
      c(!1);
  };
  return {
    country: n,
    countryList: T,
    handleCountryChange: (r) => {
      try {
        const t = d(r);
        a(`+${t}`), s(r), c(!1);
      } catch (t) {
        console.error("Error fetching country calling code:", t), a(""), s(r);
      }
    },
    handlePhoneNumberChange: (r) => {
      const t = r.trim();
      if (!t)
        return y(), "";
      const u = b(t, n);
      return g(u), u;
    },
    isValid: l,
    phoneNumber: p
  };
};
export {
  S as formatPhoneNumber,
  E as getCountryCode,
  Y as phoneValidationSchema,
  L as usePhoneState
};

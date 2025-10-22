"use client";
import { iso31661 as C } from "iso-3166";
import { isValidPhoneNumber as P, parsePhoneNumberFromString as N, AsYouType as d, getPhoneCode as S, getCountryCallingCode as h } from "libphonenumber-js";
import { useState as m } from "react";
import T from "zod";
const Y = ({ invalid: e, required: n } = {
  invalid: "Invalid phone number",
  required: "Phone number is required"
}) => T.string({
  required_error: n
}).refine((o) => {
  try {
    return P(o);
  } catch {
    return !1;
  }
}, e);
function x(e) {
  const n = N(e);
  return n ? n.country : "";
}
function V(e, n) {
  const o = new d(n);
  if (!e)
    return `+${S(n)}`;
  const s = o.input(e);
  return s || e;
}
const z = ({ initialCountry: e = "US", initialPhoneNumber: n = "" } = {}) => {
  const [o, s] = m(e), f = h(e), [l, a] = m(() => V(n, e)), [p, c] = m(() => Y().safeParse(n).success), y = () => {
    a(`+${f}`), s(e), c(!1);
  }, g = (r, t) => new d(t).input(r.startsWith("+") ? r : `+${r}`), b = (r) => {
    const t = new d(o);
    t.input(r);
    const u = t.getNumber();
    if (a(r), u && u.isValid()) {
      c(!0);
      const i = u.country;
      i && i !== o && s(i);
    } else
      c(!1);
  };
  return {
    country: o,
    countryList: C,
    handleCountryChange: (r) => {
      try {
        const t = h(r);
        a(`+${t}`), s(r), c(!1);
      } catch (t) {
        console.error("Error fetching country calling code:", t), a(""), s(r);
      }
    },
    handlePhoneNumberChange: (r) => {
      const t = r.trim();
      if (!t)
        return y(), "";
      const u = g(t, o);
      return b(u), u;
    },
    isValid: p,
    phoneNumber: l
  };
};
export {
  V as formatPhoneNumber,
  x as getCountryCode,
  Y as phoneValidationSchema,
  z as usePhoneState
};

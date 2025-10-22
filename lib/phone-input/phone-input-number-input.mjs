"use client";
import { jsx as p } from "react/jsx-runtime";
import C from "clsx";
import { forwardRef as N, useRef as d, useEffect as h } from "react";
import { useController as y } from "react-hook-form";
import R from "./phone-input.module.scss.mjs";
import { usePhoneInput as P } from "./phone-input-provider.mjs";
const x = N(
  (n, o) => {
    const { props: c, state: l } = P(), { className: a, ...g } = n, f = d(null);
    h(() => {
      typeof o == "function" ? o(f.current) : o && (o.current = f.current);
    }, [o]);
    const I = (s, t, u) => {
      const m = s.slice(0, u).replace(/\D/g, "").length;
      let e = 0, i = 0;
      for (let r = 0; r < t.length && (/\d/.test(t[r]) && i++, !(i > m)); r++)
        e = r + 1;
      return t.length > s.length && t[u] === " " && (e = Math.max(0, e - 1)), e;
    }, b = (s) => {
      var i;
      const t = s.target, u = t.selectionStart, m = t.value, e = l.handlePhoneNumberChange(t.value);
      if (e !== null && (t.value = e, u !== null)) {
        const r = I(m, e, u);
        t.setSelectionRange(r, r);
      }
      (i = n.onChange) == null || i.call(n, s);
    };
    return /* @__PURE__ */ p(
      "input",
      {
        ...g,
        ...c.numberInputProps,
        className: C(c.numberInputProps.className, a),
        onChange: b,
        ref: f
      }
    );
  }
);
function E(n) {
  const {
    field: { ref: o, ...c },
    formState: l
  } = y(n), { state: a } = P();
  return h(() => {
    l.isDirty || a.handlePhoneNumberChange("");
  }, [l.isDirty]), /* @__PURE__ */ p(x, { ...n, ...c, ref: o });
}
function F() {
  return {
    numberInputProps: {
      className: R.phoneInputNumberInput,
      type: "tel"
    }
  };
}
export {
  x as PhoneInputNumberInput,
  E as default,
  F as usePhoneInputNumberInput
};

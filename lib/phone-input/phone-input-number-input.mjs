"use client";
import { j as p } from "../node_modules/react/jsx-runtime.mjs";
import { clsx as C } from "../node_modules/clsx/dist/clsx.mjs";
import { forwardRef as N, useRef as d, useEffect as h } from "react";
import { useController as x } from "../node_modules/react-hook-form/dist/index.esm.mjs";
import R from "./phone-input.module.scss.mjs";
import { usePhoneInput as P } from "./phone-input-provider.mjs";
const y = N(
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
    return /* @__PURE__ */ p.jsx(
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
function B(n) {
  const {
    field: { ref: o, ...c },
    formState: l
  } = x(n), { state: a } = P();
  return h(() => {
    l.isDirty || a.handlePhoneNumberChange("");
  }, [l.isDirty]), /* @__PURE__ */ p.jsx(y, { ...n, ...c, ref: o });
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
  y as PhoneInputNumberInput,
  B as default,
  F as usePhoneInputNumberInput
};

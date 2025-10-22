"use client";
import { jsx as C } from "react/jsx-runtime";
import a, { useState as n, useMemo as O } from "react";
const l = a.createContext({});
function D() {
  const e = a.useContext(l);
  if (!e)
    throw new Error("PhoneInput compound components cannot be rendered outside the PhoneInput component");
  return e;
}
function w({
  children: e,
  dialog: P,
  props: t,
  state: o
}) {
  const [s, h] = n(null), [r, f] = n(), [u, g] = n(null), { isDialogOpen: i, onOpenChange: c, setIsDialogOpen: I, setOnOpenChange: m } = P, [p, x] = n(!1), d = O(
    () => ({
      dialogPosition: r,
      isDialogOpen: i,
      isPortal: p,
      onOpenChange: c,
      phoneInputRef: s,
      props: t,
      setDialogPosition: f,
      setIsDialogOpen: I,
      setIsPortal: x,
      setOnOpenChange: m,
      setPhoneInputRef: h,
      setTriggerRef: g,
      state: o,
      triggerRef: u
    }),
    [s, r, t, o, u, i, c, p]
  );
  return /* @__PURE__ */ C(l.Provider, { value: d, children: e });
}
export {
  w as PhoneInputContextProvider,
  D as usePhoneInput
};

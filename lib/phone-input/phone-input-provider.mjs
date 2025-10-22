"use client";
import { j as C } from "../node_modules/react/jsx-runtime.mjs";
import a, { useState as n, useMemo as R } from "react";
const l = a.createContext({});
function v() {
  const e = a.useContext(l);
  if (!e)
    throw new Error("PhoneInput compound components cannot be rendered outside the PhoneInput component");
  return e;
}
function D({
  children: e,
  dialog: P,
  props: t,
  state: o
}) {
  const [s, h] = n(null), [r, f] = n(), [u, g] = n(null), { isDialogOpen: i, onOpenChange: c, setIsDialogOpen: x, setOnOpenChange: m } = P, [p, I] = n(!1), d = R(
    () => ({
      dialogPosition: r,
      isDialogOpen: i,
      isPortal: p,
      onOpenChange: c,
      phoneInputRef: s,
      props: t,
      setDialogPosition: f,
      setIsDialogOpen: x,
      setIsPortal: I,
      setOnOpenChange: m,
      setPhoneInputRef: h,
      setTriggerRef: g,
      state: o,
      triggerRef: u
    }),
    [s, r, t, o, u, i, c, p]
  );
  return /* @__PURE__ */ C.jsx(l.Provider, { value: d, children: e });
}
export {
  D as PhoneInputContextProvider,
  v as usePhoneInput
};

"use client";
import { j as g } from "../node_modules/react/jsx-runtime.mjs";
import l, { useState as D, useEffect as m, useMemo as x } from "react";
import { usePhoneState as W } from "../use-phone-state/use-phone-state.mjs";
import { usePhoneInputDialog as j, PhoneInputDialog as E } from "./phone-input-dialog.mjs";
import { usePhoneInputItem as F, PhoneInputItem as R, PhoneInputItemWithForm as S } from "./phone-input-item.mjs";
import L, { PhoneInputNumberInput as T, usePhoneInputNumberInput as V } from "./phone-input-number-input.mjs";
import v from "./phone-input-portal.mjs";
import { PhoneInputContextProvider as A } from "./phone-input-provider.mjs";
import { usePhoneInputTrigger as M, PhoneInputTrigger as q } from "./phone-input-trigger.mjs";
import { PhoneInputWrapper as w } from "./phone-input-wrapper.mjs";
function z(n, o) {
  const { numberInputProps: h } = V(), { getListItemProps: a } = F({
    selected: o.country
  }), { triggerProps: u } = M({
    open: n.isDialogOpen
  }), { phoneInputDialogProps: t } = j({
    open: n.isDialogOpen
  });
  return {
    getListItemProps: a,
    numberInputProps: h,
    phoneInputDialogProps: t,
    triggerProps: u
  };
}
function B(n) {
  const { children: o, initialCountry: h, initialPhoneNumber: a, onCountryChange: u, onPhoneChange: t, onValidationChange: c, ...f } = n, e = W({
    initialCountry: h,
    initialPhoneNumber: a
  }), [p, d] = l.useState(!1), C = z({ isDialogOpen: p }, e), [r, I] = D();
  m(() => {
    u && u(e.country);
  }, [n, e.country]);
  const b = x(
    () => ({
      isDialogOpen: p,
      onOpenChange: r,
      setIsDialogOpen: d,
      setOnOpenChange: I
    }),
    [p, r]
  );
  m(() => {
    r && I(r);
  }, [r]), m(() => {
    c && c(e.isValid);
  }, [c, e.isValid]), m(() => {
    t && e.phoneNumber && t(e.phoneNumber);
  }, [t, e.phoneNumber]);
  const P = (i, s) => {
    if (typeof i == "function") {
      const N = i({
        country: e.country,
        countryList: e.countryList,
        onPhoneChange: (O) => e.handlePhoneNumberChange(O.target.value),
        open: p,
        phone: e.phoneNumber ?? ""
      });
      return l.cloneElement(N, { key: s });
    }
    return l.cloneElement(i, { key: s });
  }, y = Array.isArray(o) ? o.map((i, s) => P(i, s)) : P(o);
  return /* @__PURE__ */ g.jsx(A, { dialog: b, props: C, state: e, children: /* @__PURE__ */ g.jsx(w, { ...f, children: y }) });
}
const $ = {
  Dialog: E,
  Item: R,
  ItemWithForm: S,
  NumberInput: T,
  NumberInputWithForm: L,
  Portal: v,
  Root: B,
  Trigger: q
};
export {
  $ as PhoneInput,
  B as PhoneInputRoot,
  z as usePhone
};

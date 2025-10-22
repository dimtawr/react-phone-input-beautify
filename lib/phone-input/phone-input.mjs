"use client";
import { jsx as g } from "react/jsx-runtime";
import l, { useState as D, useEffect as m, useMemo as W } from "react";
import { usePhoneState as F } from "../use-phone-state/use-phone-state.mjs";
import { usePhoneInputDialog as S, PhoneInputDialog as x } from "./phone-input-dialog.mjs";
import { usePhoneInputItem as E, PhoneInputItem as L, PhoneInputItemWithForm as R } from "./phone-input-item.mjs";
import T, { PhoneInputNumberInput as V, usePhoneInputNumberInput as v } from "./phone-input-number-input.mjs";
import A from "./phone-input-portal.mjs";
import { PhoneInputContextProvider as j } from "./phone-input-provider.mjs";
import { usePhoneInputTrigger as M, PhoneInputTrigger as q } from "./phone-input-trigger.mjs";
import { PhoneInputWrapper as w } from "./phone-input-wrapper.mjs";
function z(n, o) {
  const { numberInputProps: h } = v(), { getListItemProps: a } = E({
    selected: o.country
  }), { triggerProps: u } = M({
    open: n.isDialogOpen
  }), { phoneInputDialogProps: t } = S({
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
  const { children: o, initialCountry: h, initialPhoneNumber: a, onCountryChange: u, onPhoneChange: t, onValidationChange: c, ...f } = n, e = F({
    initialCountry: h,
    initialPhoneNumber: a
  }), [p, d] = l.useState(!1), C = z({ isDialogOpen: p }, e), [r, I] = D();
  m(() => {
    u && u(e.country);
  }, [n, e.country]);
  const b = W(
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
  return /* @__PURE__ */ g(j, { dialog: b, props: C, state: e, children: /* @__PURE__ */ g(w, { ...f, children: y }) });
}
const $ = {
  Dialog: x,
  Item: L,
  ItemWithForm: R,
  NumberInput: V,
  NumberInputWithForm: T,
  Portal: A,
  Root: B,
  Trigger: q
};
export {
  $ as PhoneInput,
  B as PhoneInputRoot,
  z as usePhone
};

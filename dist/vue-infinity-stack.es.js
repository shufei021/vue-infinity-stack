import { defineComponent as T, ref as a, watch as k, nextTick as E, onMounted as O, onBeforeUnmount as L, openBlock as V, createBlock as z, Teleport as J, createElementVNode as M, normalizeStyle as B, renderSlot as _, createCommentVNode as P } from "vue";
const q = ["id"], F = /* @__PURE__ */ T({
  __name: "VueInfinityStack",
  props: {
    uuid: { default: "" },
    visible: { type: Boolean },
    isAnimation: { type: Boolean, default: !0 },
    zIndex: { default: 1e3 },
    autoIndex: { type: Boolean },
    storeName: { default: "historyState" },
    extra: { default: () => ({}) },
    storeType: { default: "localStorage" },
    getContainer: { type: [Function, String], default: "body" },
    isAsync: { type: Boolean, default: !1 },
    ishasAnimation: { type: Function, default: () => {
    } }
  },
  emits: ["update:visible", "onOpen", "onClose"],
  setup(f, { expose: I, emit: C }) {
    const o = f, l = C, s = a(null), m = a(!0), d = a(!1), p = a(!1), r = a(`popuplayer_${b()}`), y = a(1e3);
    let c = null;
    function b() {
      return Array.from(
        { length: 8 },
        (e, t) => ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
      ).join("");
    }
    function u() {
      const e = o.storeName || "historyState", t = window[o.storeType || "localStorage"], n = t.getItem(e) ? JSON.parse(t.getItem(e)) : [];
      return {
        reset() {
          (!t.getItem(e) || n.length) && t.setItem(e, JSON.stringify([]));
        },
        update(i) {
          t.setItem(e, JSON.stringify([...n, i]));
        },
        getCur() {
          return n;
        },
        pop() {
          n.pop(), t.setItem(e, JSON.stringify(n));
        },
        push(i) {
          t.setItem(e, JSON.stringify([...n, i]));
        }
      };
    }
    function g(e) {
      var h;
      const t = ((h = e.state) == null ? void 0 : h.id) || "", n = u().getCur(), i = n.length;
      if (i && t !== n[i - 1] && n[i - 1] === r.value) {
        l("onClose", { isPopstate: !0 }, o.extra || {}), l("update:visible", !1), u().pop(), p.value = !0;
        const S = document.activeElement;
        S instanceof HTMLElement && S.blur();
      }
    }
    k(() => o.visible, (e) => {
      c && clearTimeout(c), e ? d.value = !0 : c = setTimeout(() => {
        d.value = !1, typeof o.ishasAnimation == "function" && (m.value = !0);
      }, 300), E(() => {
        e ? x() : w(), window[e ? "addEventListener" : "removeEventListener"]("popstate", g);
      });
    });
    function x() {
      window.history.pushState({ id: r.value }, ""), u().push(r.value), setTimeout(() => {
        l("onOpen", r.value, o.extra || {});
      }, 200);
    }
    function w() {
      if (p.value) {
        p.value = !1;
        return;
      }
      l("onClose", { isPopstate: !1 }, o.extra || {}), u().pop(), history.back();
    }
    function N() {
      return Math.max(
        ...Array.from(document.querySelectorAll("*")).map(
          (e) => parseInt(window.getComputedStyle(e).zIndex) || 1
        )
      );
    }
    function A(e, t, n) {
      for (let i = e + 1; i <= t; i++)
        setTimeout(() => {
          n == null || n(i);
        }, i * 30);
    }
    O(() => {
      let e = null;
      typeof o.getContainer == "function" ? e = o.getContainer() : o.getContainer && (e = document.querySelector(o.getContainer)), e == null || e.appendChild(s.value), o.autoIndex && (y.value = N()), !o.isAsync && v();
    });
    function v() {
      const e = u().getCur(), t = (e == null ? void 0 : e.length) || 0;
      t && history.go(-t);
    }
    return L(() => {
      var e;
      window.removeEventListener("popstate", g), (e = s.value) != null && e.parentNode && s.value.parentNode.removeChild(s.value);
    }), I({
      asyncHandler: v,
      backLvBy: A
    }), (e, t) => (V(), z(J, { to: e.getContainer }, [
      M("div", {
        style: B([{ position: "fixed", top: "0", left: "0", bottom: "0", right: "0", width: "100%", "backface-visibility": "hidden", "background-color": "#fff" }, {
          zIndex: e.autoIndex ? y.value : e.zIndex,
          transform: e.visible ? "translateX(0)" : "translateX(100%)",
          transition: e.isAnimation && m.value ? "transform 0.3s" : "none"
        }]),
        ref_key: "popupRef",
        ref: s,
        class: "popup-layer",
        id: e.uuid || r.value
      }, [
        d.value ? _(e.$slots, "default", { key: 0 }) : P("", !0)
      ], 12, q)
    ], 8, ["to"]));
  }
}), X = {
  install(f) {
    f.component("VueInfinityStack", F);
  }
};
export {
  F as VueInfinityStack,
  X as default
};

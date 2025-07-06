import { defineComponent as T, ref as s, watch as k, nextTick as E, onMounted as O, onBeforeUnmount as L, openBlock as V, createBlock as z, Teleport as J, createElementVNode as M, normalizeStyle as B, renderSlot as _, createCommentVNode as P } from "vue";
const H = ["id"], R = /* @__PURE__ */ T({
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
    getContainer: { default: "body" },
    isAsync: { type: Boolean, default: !1 },
    ishasAnimation: { type: Function, default: () => {
    } }
  },
  emits: ["update:visible", "onOpen", "onClose"],
  setup(f, { expose: I, emit: b }) {
    const i = f, u = b, l = s(null), m = s(!0), d = s(!1), p = s(!1), a = s(`popuplayer_${x()}`), y = s(1e3);
    let c = null;
    function x() {
      return Array.from(
        { length: 8 },
        (e, t) => ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
      ).join("");
    }
    function r() {
      const e = i.storeName || "historyState", t = window[i.storeType || "localStorage"], n = t.getItem(e) ? JSON.parse(t.getItem(e)) : [];
      return {
        reset() {
          (!t.getItem(e) || n.length) && t.setItem(e, JSON.stringify([]));
        },
        update(o) {
          t.setItem(e, JSON.stringify([...n, o]));
        },
        getCur() {
          return n;
        },
        pop() {
          n.pop(), t.setItem(e, JSON.stringify(n));
        },
        push(o) {
          t.setItem(e, JSON.stringify([...n, o]));
        }
      };
    }
    function v(e) {
      var g;
      const t = ((g = e.state) == null ? void 0 : g.id) || "", n = r().getCur(), o = n.length;
      if (o && t !== n[o - 1] && n[o - 1] === a.value) {
        u("onClose", { isPopstate: !0 }, i.extra || {}), u("update:visible", !1), r().pop(), p.value = !0;
        const S = document.activeElement;
        S instanceof HTMLElement && S.blur();
      }
    }
    k(() => i.visible, (e) => {
      c && clearTimeout(c), e ? d.value = !0 : c = setTimeout(() => {
        d.value = !1, typeof i.ishasAnimation == "function" && (m.value = !0);
      }, 300), E(() => {
        e ? w() : C(), window[e ? "addEventListener" : "removeEventListener"]("popstate", v);
      });
    });
    function w() {
      window.history.pushState({ id: a.value }, ""), r().push(a.value), setTimeout(() => {
        u("onOpen", a.value, i.extra || {});
      }, 200);
    }
    function C() {
      if (p.value) {
        p.value = !1;
        return;
      }
      u("onClose", { isPopstate: !1 }, i.extra || {}), r().pop(), history.back();
    }
    function N() {
      return Math.max(
        ...Array.from(document.querySelectorAll("*")).map(
          (e) => parseInt(window.getComputedStyle(e).zIndex) || 1
        )
      );
    }
    function A(e, t, n) {
      for (let o = e + 1; o <= t; o++)
        setTimeout(() => {
          n == null || n(o);
        }, o * 30);
    }
    O(() => {
      i.autoIndex && (y.value = N()), !i.isAsync && h();
    });
    function h() {
      const e = r().getCur(), t = (e == null ? void 0 : e.length) || 0;
      t && history.go(-t);
    }
    return L(() => {
      var e;
      window.removeEventListener("popstate", v), (e = l.value) != null && e.parentNode && l.value.parentNode.removeChild(l.value);
    }), I({
      asyncHandler: h,
      backLvBy: A
    }), (e, t) => (V(), z(J, { to: e.getContainer }, [
      M("div", {
        style: B([{ position: "fixed", top: "0", left: "0", bottom: "0", right: "0", width: "100%", "backface-visibility": "hidden", "background-color": "#fff" }, {
          zIndex: e.autoIndex ? y.value : e.zIndex,
          transform: e.visible ? "translateX(0)" : "translateX(100%)",
          transition: e.isAnimation && m.value ? "transform 0.3s" : "none"
        }]),
        ref_key: "popupRef",
        ref: l,
        class: "popup-layer",
        id: e.uuid || a.value
      }, [
        d.value ? _(e.$slots, "default", { key: 0 }) : P("", !0)
      ], 12, H)
    ], 8, ["to"]));
  }
}), $ = {
  install(f) {
    f.component("VueInfinityStack", R);
  }
};
export {
  R as VueInfinityStack,
  $ as default
};

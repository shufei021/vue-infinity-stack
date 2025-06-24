import { ref as l, watch as k, nextTick as T, onMounted as L, onBeforeUnmount as z, openBlock as E, createElementBlock as O, normalizeStyle as B, renderSlot as M, createCommentVNode as P } from "vue";
const V = ["id"], q = {
  __name: "VueInfinityStack",
  props: {
    uuid: {
      type: String,
      default: ""
    },
    visible: Boolean,
    isAnimation: {
      type: Boolean,
      default: !0
    },
    zIndex: {
      type: Number,
      default: 1e3
    },
    autoIndex: Boolean,
    storeName: {
      type: String,
      default: "historyState"
    },
    extra: {
      type: Object,
      default: () => ({})
    },
    storeType: {
      type: String,
      default: "localStorage"
    },
    getContainer: {
      type: [Function, String],
      default: ""
    },
    isAsync: Boolean,
    ishasAnimation: {
      type: Function,
      default: () => {
      }
    }
  },
  emits: ["update:visible", "onOpen", "onClose"],
  setup(a, { expose: x, emit: S }) {
    const n = a, d = S, I = () => Array.from({ length: 8 }, (e, t) => ((1 + Math.random()) * 65536 | 0).toString(16).substring(1) + ([1, 2, 3, 4].includes(t) ? "-" : "")).join(""), c = l(null), y = l(!0), p = l(!1), m = l(!1), f = l(`popuplayer_${I()}`), g = l(1e3);
    let v = null;
    const r = () => {
      const e = n.storeName, t = window[n.storeType], i = JSON.parse, o = JSON.stringify, s = t.getItem(e) ? i(t.getItem(e)) : [];
      return {
        reset() {
          (!t.getItem(e) || s.length) && t.setItem(e, o([]));
        },
        update(u) {
          t.setItem(e, o([...s, u]));
        },
        getCur() {
          return s;
        },
        pop() {
          s.pop(), t.setItem(e, o(s));
        },
        push(u) {
          t.setItem(e, o([...s, u]));
        }
      };
    }, h = (e) => {
      var s, u;
      const t = ((s = e.state) == null ? void 0 : s.id) || "", i = r().getCur(), o = i.length;
      o && t !== i[o - 1] && i[o - 1] === f.value && (d("onClose", { isPopstate: !0 }, n.extra), d("update:visible", !1), r().pop(), m.value = !0, (u = document.activeElement) == null || u.blur());
    };
    k(() => n.visible, (e) => {
      v && clearTimeout(v), e ? p.value = !0 : v = setTimeout(() => {
        p.value = !1, n.ishasAnimation && (y.value = !0);
      }, 300), T(() => {
        e ? b() : C(), window[e ? "addEventListener" : "removeEventListener"]("popstate", h);
      });
    });
    const b = () => {
      window.history.pushState({ id: f.value }, ""), r().push(f.value), setTimeout(() => {
        d("onOpen", f.value, n.extra);
      }, 200);
    }, C = () => {
      if (m.value)
        return m.value = !1;
      d("onClose", { isPopstate: !1 }, n.extra), r().pop(), history.back();
    }, w = () => {
      d("update:visible", !1);
    }, A = () => Math.max(
      ...Array.from(document.querySelectorAll("*")).map(
        (e) => parseInt(window.getComputedStyle(e).zIndex) || 1
      )
    ), N = (e, t, i) => {
      for (let o = e + 1; o <= t; o++)
        setTimeout(() => {
          i == null || i(o);
        }, o * 30);
    };
    return L(() => {
      let e;
      if (typeof n.getContainer == "function" ? e = n.getContainer() : n.getContainer && (e = document.querySelector(n.getContainer)), e == null || e.appendChild(c.value), n.autoIndex && (g.value = A()), !n.isAsync) {
        const t = r().getCur(), i = (t == null ? void 0 : t.length) || 0;
        i && history.go(-i), r().reset();
      }
    }), z(() => {
      var e;
      window.removeEventListener("popstate", h), (e = c.value) != null && e.parentNode && c.value.parentNode.removeChild(c.value);
    }), x({
      closeLv: w,
      backLvBy: N
    }), (e, t) => (E(), O("div", {
      style: B([{ position: "fixed", top: "0", left: "0", bottom: "0", right: "0", width: "100%", "backface-visibility": "hidden", "background-color": "#fff" }, {
        zIndex: a.autoIndex ? g.value : a.zIndex,
        transform: a.visible ? "translateX(0)" : "translateX(100%)",
        transition: a.isAnimation && y.value ? "transform 0.3s" : "none"
      }]),
      ref_key: "popupRef",
      ref: c,
      class: "vue-infinity-stack",
      id: a.uuid || f.value
    }, [
      p.value ? M(e.$slots, "default", { key: 0 }) : P("", !0)
    ], 12, V));
  }
};
export {
  q as default
};

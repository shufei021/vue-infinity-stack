import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    uuid: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    visible: {
        type: __PropType<boolean>;
        required: true;
    };
    isAnimation: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    zIndex: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    autoIndex: {
        type: __PropType<boolean>;
        required: true;
    };
    storeName: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    extra: {
        type: __PropType<Record<string, any> | undefined>;
        required: false;
        default: () => {};
    };
    storeType: {
        type: __PropType<"localStorage" | "sessionStorage" | undefined>;
        required: false;
        default: string;
    };
    getContainer: {
        type: __PropType<string | (() => HTMLElement) | undefined>;
        required: false;
        default: string;
    };
    isAsync: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    ishasAnimation: {
        type: __PropType<(() => void) | undefined>;
        required: false;
        default: () => void;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:visible" | "onOpen" | "onClose")[], "update:visible" | "onOpen" | "onClose", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    uuid: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    visible: {
        type: __PropType<boolean>;
        required: true;
    };
    isAnimation: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    zIndex: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    autoIndex: {
        type: __PropType<boolean>;
        required: true;
    };
    storeName: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    extra: {
        type: __PropType<Record<string, any> | undefined>;
        required: false;
        default: () => {};
    };
    storeType: {
        type: __PropType<"localStorage" | "sessionStorage" | undefined>;
        required: false;
        default: string;
    };
    getContainer: {
        type: __PropType<string | (() => HTMLElement) | undefined>;
        required: false;
        default: string;
    };
    isAsync: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    ishasAnimation: {
        type: __PropType<(() => void) | undefined>;
        required: false;
        default: () => void;
    };
}>> & Readonly<{
    "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    onOnOpen?: ((...args: any[]) => any) | undefined;
    onOnClose?: ((...args: any[]) => any) | undefined;
}>, {
    uuid: string | undefined;
    isAnimation: boolean | undefined;
    zIndex: number | undefined;
    storeName: string | undefined;
    extra: Record<string, any> | undefined;
    storeType: "localStorage" | "sessionStorage" | undefined;
    getContainer: string | (() => HTMLElement) | undefined;
    isAsync: boolean | undefined;
    ishasAnimation: (() => void) | undefined;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _sfc_main;

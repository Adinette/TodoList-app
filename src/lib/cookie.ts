import Cookies from "js-cookie";

export default function jsCookie(): {
    get: (key: string) => string | undefined;
    set: (
        key: string,
        value: string,
        options?: Cookies.CookieAttributes
    ) => void;
    remove: (key: string) => void;
} {
    function get(key: string) {
        return Cookies.get(key);
    }

    function set(
        key: string,
        value: string,
        options?: Cookies.CookieAttributes
    ) {
        Cookies.set(key, value, options);
    }

    function remove(key: string) {
        Cookies.remove(key);
    }

    return { get, set, remove };
}

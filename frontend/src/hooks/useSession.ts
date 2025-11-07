import { useCallback, useState } from "react";

const sessionKey = "__g1ft5h0p__";
const userKey = "__u53r@r0l3_";
export type User = {
    userId: string;
}
type ServerAuth = {
    user: User;
    key: string;
}
export const getInstance = () => sessionStorage.getItem(sessionKey) || "";

const useSession = () => {

    const [inSession, setInSession] = useState<boolean>(() => {
        return !!sessionStorage.getItem(sessionKey);
    });
    const [user, setUser] = useState<User | null>(() => {
        const sUser = sessionStorage.getItem(userKey);
        if (sUser) {
            try {
                return JSON.parse(sUser);
            } catch (e) {
                return null;
            }
        }
    });
    const [instance, setInstance] = useState<string | null>(() => {
        return sessionStorage.getItem(sessionKey);
    });

    const login = useCallback((data: ServerAuth, redirectTo: string = "/") => {
        if (data) {
            const { user, key } = data;
            sessionStorage.setItem(sessionKey, key);
            sessionStorage.setItem(userKey, JSON.stringify(user));

            setInSession(true);
            setUser(user);
            setInstance(key);
            location.replace(redirectTo);
        }
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(sessionKey);
        sessionStorage.removeItem(userKey);
        setInSession(false);
        setUser(null);
        location.replace("/");
    }, []);


    return { user, login, logout, inSession, instance };
}

export default useSession;
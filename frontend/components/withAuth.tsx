import router from "next/router";
import { useEffect } from "react";


export default function withAuth(Component: any) {
    return function WithAuth(props: any) {
       
        useEffect(() => {
            if (process.browser) { // ensure running on client-side
                const token = localStorage.getItem("token");
                // todo: make call to backend to verify token
                if (!token) {
                    router.push("/Login");
                }
            }
        }, []);

        return <Component {...props} />;
    };
}
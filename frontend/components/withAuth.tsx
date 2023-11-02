import { USER_URI } from "@/constants/uri";
import axios from "axios";
import router from "next/router";
import { useEffect } from "react";


export default function withAuth(Component: any) {
    return function WithAuth(props: any) {
       
        useEffect(() => {
            (async () => {
                if (process.browser) { // ensure running on client-side
                    try {
                        const token = localStorage.getItem("token");
                        await axios.get(USER_URI.VERIFY_TOKEN, {
                            headers: {
                                Authorization: `${token}`,
                            },
                        })
                    } catch (error) {
                        console.error(error);
                        router.push("/Login");
                    }
            }
            })();
        }, []);

        return <Component {...props} />;
    };
}
import { ReactLenis } from "@studio-freight/react-lenis";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <ReactLenis root>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </ReactLenis>
    );
}

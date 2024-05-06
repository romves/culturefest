import Navbar from "@/Components/layout/Navbar";
import { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

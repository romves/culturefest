import Footer from "@/Components/layout/Footer";
import Navbar from "@/Components/layout/Navbar";
import { PropsWithChildren } from "react";

export default function PageLayout({
    children,
    withTopPadding = true,
    navVariant = "default",
    withFooter = true,
}: PropsWithChildren<{
    withFooter?: boolean;
    withTopPadding?: boolean;
    navVariant?: "dark" | "light" | "default";
}>) {
    return (
        <>
            <Navbar variant={navVariant} />
            <main className={withTopPadding ? "pt-16" : ""}>{children}</main>
            {withFooter && <Footer />}
        </>
    );
}

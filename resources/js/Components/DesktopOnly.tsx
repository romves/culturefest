import React, { useState, useEffect } from "react";

const DesktopOnly = ({ children }: { children: React.ReactNode }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1920);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1920);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isDesktop) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="p-8 text-center bg-white rounded-lg shadow-md">
                    <h1 className="mb-4 text-2xl font-bold">Desktop Only</h1>
                    <p className="text-gray-600">
                        This application is optimized for desktop screens with a
                        minimum width of 1920 pixels. Please use a larger screen
                        to access the content.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default DesktopOnly;

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";

export default function Dialog({
    children,
    title,
    isOpen,
    onClose,
}: PropsWithChildren<{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}>) {
    return (
        <div
            className={cn(
                isOpen ? "fixed" : "hidden",
                "inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            )}
        >
            <div
                className={cn(
                    "p-4 bg-white rounded-lg w-96",
                    isOpen ? "fixed" : "hidden"
                )}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

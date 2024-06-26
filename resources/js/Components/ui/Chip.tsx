import { cn } from "@/lib/utils";

interface VariantStyles {
    [key: string]: string;
}

export default function Chip({ text }: { text: string }) {
    function getVariant(variant = text): string {
        const variantStyles: VariantStyles = {
            declined: "bg-red-100 text-red-500",
            accepted: "bg-green-100 text-green-500",
            expired: "bg-red-100 text-red-500",
            paid: "bg-green-100 text-green-500",
            success: "bg-green-100 text-green-500",
            danger: "bg-red-100 text-red-500",
            warning: "bg-yellow-100 text-yellow-500",
            pending: "bg-yellow-100 text-yellow-500",
        };

        if (variant in variantStyles) {
            return variantStyles[variant];
        } else {
            return "bg-gray-100 text-gray-500";
        }
    }

    return (
        <div
            className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                getVariant(text)
            )}
        >
            {text.charAt(0).toUpperCase() + text.slice(1)}
        </div>
    );
}

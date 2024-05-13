import { cn } from "@/lib/utils";

export default function Chip({ text, variant }: { variant?: string; text: string }) {
    function getVariant() {
        switch (variant) {
            case "success":
                return "bg-green-100 text-green-500";
            case "danger":
                return "bg-red-100 text-red-500";
            case "warning":
                return "bg-yellow-100 text-yellow-500";
            default:
                return "bg-gray-100 text-gray-500";
        }
    }

    return (
        <div
            className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                getVariant()
            )}
        >
            {text.charAt(0).toUpperCase() + text.slice(1)}
        </div>
    );
}

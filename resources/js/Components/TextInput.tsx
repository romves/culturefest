import { cn } from "@/lib/utils";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        label,
        error,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean;
        label?: string;
        error?: string;
    },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <div className="w-full">
            <label className="grid text-sm font-medium text-gray-700 dark:text-gray-200">
                {label}
                <input
                    {...props}
                    type={type}
                    className={cn(
                        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
                            className
                    )}
                    ref={localRef}
                />
            </label>
            <pre>{error}</pre>
        </div>
    );
});

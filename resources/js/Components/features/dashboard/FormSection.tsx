import { PropsWithChildren, ReactNode } from "react";

const FormSection = ({
    title,
    children,
    action,
}: PropsWithChildren<{ title: string; action?: ReactNode }>) => {
    return (
        <div className="p-4 bg-white rounded-xl">
            <div className="flex justify-between">
                <h2 className="mb-6 text-lg font-semibold">{title}</h2>
                {action}
            </div>
            {children}
        </div>
    );
};

export default FormSection;

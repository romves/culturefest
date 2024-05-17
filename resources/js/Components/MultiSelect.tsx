import { Category } from "@/types/common";
import { useState } from "react";

interface Option {
    id: number;
    name: string;
}

interface MultiSelectProps {
    options: Option[];
    selectedOptions: Option[];
    onChange: (selected: Option) => void;
}

const MultiSelect = <T,>({
    options,
    selectedOptions,
    onChange,
}: MultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option: Option) => {
        onChange(option);
    };

    return (
        <div className="relative w-full">
            <div
                className="flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className="flex flex-wrap">
                    {selectedOptions.length === 0 ? (
                        <span className="text-gray-500">Select options</span>
                    ) : (
                        selectedOptions.map((option) => (
                            <span
                                key={option.id}
                                className="px-2 py-1 m-1 text-sm text-white rounded bg-primary"
                            >
                                {option.name}
                            </span>
                        ))
                    )}
                </div>
                <div>
                    <svg
                        className={`w-5 h-5 transition-transform transform ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded max-h-60">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                selectedOptions.some(
                                    (category: Category) =>
                                        category.id === option.id
                                )
                                    ? "bg-gray-200"
                                    : ""
                            }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;

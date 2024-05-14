import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Category, Event } from "@/types/common";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import { updateEvent } from "./service/eventService";
import { IFormData } from "./types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Check } from "lucide-react";

const Edit = ({
    event,
    event_categories,
}: {
    event: Event;
    event_categories: Category[];
}) => {
    const { data, setData, errors } = useForm<IFormData>({
        name: event.name ?? "",
        description: event.description ?? "",
        start_date: event.start_date ?? "",
        end_date: event.end_date ?? "",
        location: event.location ?? "",
        max_participants: event.max_participants ?? "",
        is_seated: event.is_seated ?? "",
        image: undefined,

        categories: event.categories,
    });

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setData(e.target.name as any, e.target.value);
    }

    console.log(event);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Event
                    </h2>
                </div>
            }
        >
            <div className="container grid grid-cols-2 gap-2 py-8">
                <FormSection title="Event Details">
                    <form
                        className="grid gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateEvent(event.id, data);
                        }}
                    >
                        <TextInput
                            name="name"
                            label="Name"
                            value={data.name}
                            error={errors.name}
                            onChange={onChange}
                        />
                        <TextInput
                            name="description"
                            label="Description"
                            value={data.description}
                            error={errors.description}
                            onChange={onChange}
                        />

                        <div className="flex w-full gap-2 ">
                            <TextInput
                                className="w-full"
                                name="start_date"
                                label="Start Date"
                                type="datetime-local"
                                value={data.start_date}
                                error={errors.start_date}
                                onChange={onChange}
                            />

                            <TextInput
                                className="w-full"
                                name="end_date"
                                label="End Date"
                                type="datetime-local"
                                value={data.end_date}
                                error={errors.end_date}
                                onChange={onChange}
                            />
                        </div>

                        <TextInput
                            name="location"
                            label="Location"
                            value={data.location}
                            error={errors.location}
                            onChange={onChange}
                        />

                        <TextInput
                            name="max_participants"
                            label="Max Participant"
                            value={data.max_participants}
                            error={errors.max_participants}
                            onChange={onChange}
                        />

                        <TextInput
                            name="is_seated"
                            label="Is Seated"
                            value={data.is_seated}
                            error={errors.is_seated}
                            onChange={onChange}
                        />

                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setData("image", e.target.files?.[0]);
                            }}
                        />

                        <div className="flex gap-2">
                            <img
                                src={
                                    window.location.origin +
                                    "/" +
                                    event.image_url
                                }
                                alt="event image"
                                className="rounded-md w-[10rem] aspect-video object-contain bg-slate-400/40"
                            />
                        </div>

                        <Button type="submit">Update</Button>
                    </form>
                </FormSection>

                <div className="flex flex-col gap-2">
                    <FormSection title="Event Categories">
                        <MultiSelect
                            options={event_categories.map((category) => ({
                                id: category.id,
                                name: category.name,
                            }))}
                            selectedOptions={(data.categories ?? []).map(
                                (category: Category) => ({
                                    id: category.id,
                                    name:
                                        event_categories.find(
                                            (c) => c.id === category.id
                                        )?.name ?? "",
                                })
                            )}
                            onChange={(selected) => {
                                const isSelected = (data.categories ?? []).some(
                                    (category: Category) =>
                                        category.id === selected.id
                                );

                                setData(
                                    "categories",
                                    isSelected
                                        ? (data.categories ?? []).filter(
                                              (category: Category) =>
                                                  category.id !== selected.id
                                          )
                                        : [...(data.categories ?? []), selected]
                                );
                            }}
                        />
                    </FormSection>
                    <FormSection title="Ticket Type">
                        {event.ticket_types.map((ticket) => (
                            <div key={ticket.id}>
                                <h3>{ticket.name}</h3>
                                <p>{ticket.price}</p>
                            </div>
                        ))}
                    </FormSection>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;

const FormSection = ({
    title,
    children,
}: PropsWithChildren<{ title: string }>) => {
    return (
        <div className="p-4 bg-white rounded-xl">
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            {children}
        </div>
    );
};

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

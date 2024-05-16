import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { numberFormat } from "@/lib/utils";
import { Category, Event } from "@/types/common";
import { router, useForm } from "@inertiajs/react";
import { EllipsisVertical, X } from "lucide-react";
import { ChangeEvent, PropsWithChildren, ReactNode, useState } from "react";
import { deleteImagebyId, updateEvent } from "./service/eventService";
import { IFormData } from "./types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

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
        images_server: event.images_server,
        images: null,

        categories: event.categories,
    });

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setData(e.target.name as any, e.target.value);
    }

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
            <div className="container grid grid-cols-2 gap-4 py-8">
                <FormSection title="Event Details">
                    <form
                        className="grid gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateEvent(event.id, {
                                ...data,
                                categories: data.categories.map(
                                    (category: Category) => category.id
                                ),
                            });
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

                        <div className="flex w-full gap-4 ">
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
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setData("images", e.target.files);
                            }}
                        />

                        <div className="flex gap-4">
                            {data.images_server?.map((image: any) => (
                                <div className="relative group">
                                    <img
                                        key={image.id}
                                        src={
                                            window.location.origin +
                                            "/" +
                                            image.file_path
                                        }
                                        alt="event image"
                                        className="rounded-md w-[10rem] aspect-video object-contain bg-slate-400/40"
                                    />

                                    <button
                                        type="button"
                                        className="absolute transition-all opacity-0 top-1 right-1 group-hover:opacity-100"
                                        onClick={() => {
                                            deleteImagebyId(image.id);
                                            setData(
                                                "images_server",
                                                data.images_server?.filter(
                                                    (img: any) =>
                                                        img.id !== image.id
                                                )
                                            );
                                        }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Button type="submit">Update</Button>
                    </form>
                </FormSection>

                <div className="flex flex-col gap-4">
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
                    <FormSection
                        title="Ticket Type"
                        action={
                            <Button
                                size="sm"
                                onClick={() =>
                                    router.visit(
                                        route(
                                            "dashboard.ticket.create",
                                            event.id
                                        )
                                    )
                                }
                            >
                                Add
                            </Button>
                        }
                    >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {event.ticket_types.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-medium">
                                            {ticket.name}
                                        </TableCell>
                                        <TableCell className="w-[10%] text-sm font-medium">
                                            {numberFormat(ticket.price)}
                                        </TableCell>
                                        <TableCell className="w-[10%] text-sm font-medium">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <EllipsisVertical
                                                        size={22}
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-fit">
                                                    <div className="grid gap-1">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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

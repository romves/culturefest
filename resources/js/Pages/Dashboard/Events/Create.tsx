import TextInput from "@/Components/TextInput";
import { Button, buttonVariants } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { ChangeEvent, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { createEvent, deleteImagebyId } from "./service/eventService";
import { IFormData } from "./types";
import { Category, Event } from "@/types/common";
import FormSection from "@/Components/features/dashboard/FormSection";
import { cn, numberFormat } from "@/lib/utils";
import FileInputPreview from "@/Components/FileInputPreview";
import MultiSelect from "@/Components/MultiSelect";
import { EllipsisVertical } from "lucide-react";
import { toast } from "react-toastify";

const Create = ({ event, event_categories }: PageProps<{ event: Event; event_categories: Category[] }>) => {
    const [isOpened, setIsOpened] = useState({
        addTicket: false,
        editTicket: false,
        selectedTicket: undefined as number | undefined,
    });

    const { data, setData, errors } = useForm<IFormData>({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        max_participants: "",
        is_seated: "",
        images: null,

        categories: [],
    });

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData(e.target.name as any, e.target.value);
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create Event
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
                            createEvent(data);
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

                        <div className="flex items-center gap-2 ">
                            <input
                                name="images"
                                id="images"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                multiple
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setData("images", e.target.files);
                                }}
                            />
                            <label
                                htmlFor="images"
                                className={cn(
                                    buttonVariants({
                                        size: "sm",
                                    }),
                                    "w-fit"
                                )}
                            >
                                Upload Image
                            </label>
                        </div>

                        <div className="flex gap-4 mb-2">
                            {(data.images != null
                                ? Array.from(data.images)
                                : []
                            ).map((image: any) => {
                                return (
                                    <FileInputPreview
                                        src={URL.createObjectURL(image)}
                                        deleteHandler={() => {
                                            setData(
                                                "images",
                                                Array.from(data.images).filter(
                                                    (img: any) =>
                                                        img.name !== image.name
                                                )
                                            );
                                        }}
                                    />
                                );
                            })}
                            {data.images_server?.map((image: any) => (
                                <FileInputPreview
                                    src={"/" + image.file_path}
                                    deleteHandler={() => {
                                        deleteImagebyId(image.id);
                                        setData(
                                            "images_server",
                                            data.images_server?.filter(
                                                (img: any) =>
                                                    img.id !== image.id
                                            )
                                        );
                                    }}
                                />
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
                    {/* <FormSection
                        title="Ticket Type"
                        action={
                            <Button
                                disabled={
                                    event.max_participants ===
                                    allTicketTypeMaxParticipantCount
                                }
                                size="sm"
                                onClick={() =>
                                    setIsOpened({
                                        ...isOpened,
                                        addTicket: !isOpened.addTicket,
                                    })
                                }
                            >
                                Add
                            </Button>
                        }
                    >
                        {event.max_participants -
                            allTicketTypeMaxParticipantCount >
                            0 && (
                            <div className="px-2 py-1 my-2 text-sm font-medium text-red-400 rounded-md bg-red-50 w-fit">
                                {event.max_participants -
                                    allTicketTypeMaxParticipantCount}{" "}
                                tickets is unassigned
                            </div>
                        )}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Max Ticket</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {event.ticket_types.map((ticket) => (
                                    <TableRow
                                        key={ticket.id}
                                        className="font-medium"
                                    >
                                        <TableCell className="">
                                            {ticket.name}
                                        </TableCell>
                                        <TableCell className="">
                                            {ticket.max_tickets}
                                        </TableCell>
                                        <TableCell className="w-[10%] text-sm ">
                                            {numberFormat(ticket.price)}
                                        </TableCell>
                                        <TableCell className="w-[10%] text-sm ">
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
                                                            onClick={() =>
                                                                setIsOpened({
                                                                    ...isOpened,
                                                                    editTicket:
                                                                        !isOpened.editTicket,
                                                                    selectedTicket:
                                                                        ticket.id,
                                                                })
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-red-500 hover:text-red-600"
                                                            onClick={() =>
                                                                router.delete(
                                                                    route(
                                                                        "dashboard.ticket.destroy",
                                                                        ticket.id
                                                                    ),
                                                                    {
                                                                        onSuccess:
                                                                            () =>
                                                                                toast.success(
                                                                                    "Ticket deleted successfully"
                                                                                ),
                                                                    }
                                                                )
                                                            }
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
                    </FormSection> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;

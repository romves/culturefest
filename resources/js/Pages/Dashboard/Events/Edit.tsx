import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Event } from "@/types/common";
import { useForm } from "@inertiajs/react";
import { ChangeEvent } from "react";
import { updateEvent } from "./service/eventService";
import { IFormData } from "./types";

const Edit = ({ event }: { event: Event }) => {
    console.log(event);
    const { data, setData, errors } = useForm<IFormData>({
        name: event.name ?? "",
        description: event.description ?? "",
        start_date: event.start_date ?? "",
        end_date: event.end_date ?? "",
        location: event.location ?? "",
        max_participants: event.max_participants ?? "",
        is_seated: event.is_seated ?? "",
        image: undefined,
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
            <div className="grid grid-cols-2 gap-2 container py-8">
                <div className="bg-red-400 p-4">
                    <h2>Event Information</h2>

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

                        <div className="flex gap-2 w-full ">
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
                </div>

                <div className="flex flex-col gap-2">
                    <div className="bg-red-400 p-4">
                        <h2>Event Categories</h2>

                        {event.categories.map((category) => (
                            <div key={category.id}>{category.name}</div>
                        ))}
                    </div>
                    <div className="bg-red-400 p-4">
                        <h2>Event Tickets Type</h2>

                        {event.ticket_types.map((ticket) => (
                            <div key={ticket.id}>
                                <h3>{ticket.name}</h3>
                                <p>{ticket.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;

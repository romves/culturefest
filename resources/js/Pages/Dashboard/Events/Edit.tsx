import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { ChangeEvent } from "react";
import { IFormData } from "./types";
import { Event } from "@/types/common";
import { updateEvent } from "./service/eventService";

const Edit = ({ event }: { event: Event }) => {
    const { data, setData } = useForm<IFormData>({
        name: event.name ?? "",
        description: event.description ?? "",
        start_date: event.start_date ?? "",
        end_date: event.end_date ?? "",
        location: event.location ?? "",
        max_participants: event.max_participants ?? "",
        is_seated: event.is_seated ?? "",
        image: undefined,
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
            <div className="container py-8">
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
                        onChange={onChange}
                    />
                    <TextInput
                        name="description"
                        label="Description"
                        value={data.description}
                        onChange={onChange}
                    />

                    <TextInput
                        name="start_date"
                        label="Start Date"
                        type="datetime-local"
                        value={data.start_date}
                        onChange={onChange}
                    />

                    <TextInput
                        name="end_date"
                        label="End Date"
                        type="datetime-local"
                        value={data.end_date}
                        onChange={onChange}
                    />

                    <TextInput
                        name="location"
                        label="Location"
                        value={data.location}
                        onChange={onChange}
                    />

                    <TextInput
                        name="max_participants"
                        label="Max Participant"
                        value={data.max_participants}
                        onChange={onChange}
                    />

                    <TextInput
                        name="is_seated"
                        label="Is Seated"
                        value={data.is_seated}
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
                            src={window.location.origin + "/" + event.image_url}
                            alt="event image"
                            className="rounded-md w-[10rem] aspect-video object-contain bg-slate-400/40"
                        />
                    </div>

                    <Button type="submit">Update</Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;

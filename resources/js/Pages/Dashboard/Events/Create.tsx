import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { createEvent } from "./service/eventService";
import { IFormData } from "./types";

const Create = ({}: PageProps) => {
    const { data, setData, errors } = useForm<IFormData>({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        max_participants: "",
        is_seated: "",
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

                    <TextInput
                        name="start_date"
                        label="Start Date"
                        type="datetime-local"
                        value={data.start_date}
                        error={errors.start_date}
                        onChange={onChange}
                    />

                    <TextInput
                        name="end_date"
                        label="End Date"
                        type="datetime-local"
                        value={data.end_date}
                        error={errors.end_date}
                        onChange={onChange}
                    />

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

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;

import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";

interface IFormData {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    max_participants: string;
    is_seated: string;
    image: File | undefined;
}

const Create = ({}: PageProps) => {
    const { data, setData, post } = useForm<IFormData>({
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
                        post(route("dashboard.event.store"), {
                            onSuccess: () => {
                                toast.success("Event created successfully");
                            },
                        });
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

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;

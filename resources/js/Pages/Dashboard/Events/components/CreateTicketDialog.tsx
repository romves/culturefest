import Dialog from "@/Components/Dialog";
import { ICreateTicketForm, TicketDialogProps } from "../Edit";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function CreateTicketDialog({
    isOpen,
    onClose,
    maxCount,
    event,
}: TicketDialogProps) {
    const { data, setData, errors, post, transform } =
        useForm<ICreateTicketForm>({
            name: "",
            price: "",
            max_tickets: "",
        });

    return (
        <Dialog title="Create Event" isOpen={isOpen} onClose={onClose}>
            <form
                className="mt-4 space-y-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    transform((data) => {
                        return {
                            ...data,
                            max_tickets: Number(data.max_tickets),
                            event_id: event.id,
                        };
                    });

                    post(route("dashboard.ticket.store"), {
                        onSuccess: () => {
                            toast.success("Ticket created successfully");
                            onClose();
                        },
                    });
                }}
            >
                <TextInput
                    label="Name"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <TextInput
                    label="Max Ticket"
                    name="max_tickets"
                    id="max_tickets"
                    type="number"
                    min={0}
                    max={maxCount}
                    onChange={(e) => {
                        setData("max_tickets", e.target.value);
                    }}
                />
                <TextInput
                    label="Price"
                    name="price"
                    id="price"
                    type="number"
                    value={data.price}
                    onChange={(e) => setData("price", Number(e.target.value))}
                />
                <Button className="" type="submit">
                    Create
                </Button>
            </form>
        </Dialog>
    );
}

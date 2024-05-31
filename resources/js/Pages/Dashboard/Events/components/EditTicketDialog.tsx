import Dialog from "@/Components/Dialog";
import { ICreateTicketForm, TicketDialogProps } from "../Edit";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function EditTicketDialog({
    isOpen,
    onClose,
    maxCount,
    selectedId,
    event,
}: TicketDialogProps) {
    const selectedEvent = event.ticket_types.find(
        (ticket) => ticket.id === selectedId
    );

    if (!selectedEvent) {
        return null;
    }

    const { data, setData, put, transform } = useForm<ICreateTicketForm>({
        name: selectedEvent.name,
        price: selectedEvent.price,
        max_tickets: selectedEvent.max_tickets,
    });

    return (
        <Dialog title="Edit Event" isOpen={isOpen} onClose={onClose}>
            <form
                className="mt-4 space-y-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    transform((data) => {
                        return {
                            ...data,
                            max_tickets: Number(data.max_tickets),
                            event_id: selectedEvent.id,
                        };
                    });

                    put(route("dashboard.ticket.update", selectedEvent.id), {
                        onSuccess: () => {
                            toast.success("Ticket updated successfully");
                            onClose();
                        },
                    });
                }}
            >
                <TextInput
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <TextInput
                    label="Max Ticket"
                    type="number"
                    min={0}
                    max={maxCount + Number(data.max_tickets)}
                    value={data.max_tickets}
                    onChange={(e) => {
                        setData("max_tickets", e.target.value);
                    }}
                />
                <TextInput
                    label="Price"
                    type="number"
                    value={data.price}
                    onChange={(e) => setData("price", Number(e.target.value))}
                />
                <Button type="submit">Update</Button>
            </form>
        </Dialog>
    );
}

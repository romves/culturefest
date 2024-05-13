import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export function deleteEvent(eventId: number) {
    router.delete(route("dashboard.event.destroy", eventId), {
        onError: () => {
            toast.error("Failed to delete event");
        },
        onSuccess: () => {
            toast.success("Event deleted successfully");
        },
    });
}

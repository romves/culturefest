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

export function createEvent(payload: Record<string, any>) {
    router.post(route("dashboard.event.store"), payload, {
        onError: () => {
            toast.error("Failed to create event");
        },
        onSuccess: () => {
            toast.success("Event created successfully");
            router.reload({});
        },
    });
}

export function updateEvent(eventId: number, payload: Record<string, any>) {
    router.post(
        route("dashboard.event.update", eventId),
        { _method: "patch", ...payload },
        {
            onError: () => {
                toast.error("Failed to update event");
            },
            onSuccess: () => {
                toast.success("Event updated successfully");
                router.visit(route("dashboard.event.edit", eventId));
            },
        }
    );
}

export function deleteImagebyId(imageId: number) {
    router.delete(route("dashboard.event.deleteImage", { image: imageId }), {
        onError: () => {
            toast.error("Failed to delete image");
        },
        onSuccess: () => {
            toast.success("Image deleted successfully");
            router.reload({});
        },
    });
}

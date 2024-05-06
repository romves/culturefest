import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Event } from "@/types/common";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { formatDate } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";
import EventCard from "@/Components/features/event/EventCard";

function Index({ events }: PageProps<{ events: Event[] }>) {
    function toasters() {
        toast.success("Success Notification !");
    }

    return (
        <PageLayout>
            <section className="container py-8">
                <div className="flex flex-wrap gap-4">
                    {events.map((event) => (
                        <EventCard event={event} />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}

export default Index;

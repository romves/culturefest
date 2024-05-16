import EventCard from "@/Components/features/event/EventCard";
import PageLayout from "@/Layouts/PageLayout";
import { PageProps } from "@/types";
import { Event } from "@/types/common";
import { toast } from "react-toastify";

function Index({ events }: PageProps<{ events: Event[] }>) {

    console.log(events)

    return (
        <PageLayout>
            <section className="container py-8">
                <div className="flex flex-wrap gap-4">
                    {events.map((event) => (
                        <EventCard event={event} key={event.id}/>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}

export default Index;

import EventCard from "@/Components/features/event/EventCard";
import Footer from "@/Components/layout/Footer";
import PageLayout from "@/Layouts/PageLayout";
import { PageProps } from "@/types";
import { Event } from "@/types/common";
import { toast } from "react-toastify";

function Index({ events }: PageProps<{ events: Event[] }>) {
    console.log(events);

    return (
        <PageLayout navVariant="dark">
            <section className="container py-8">
                <div className="grid justify-between gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard
                            event={event}
                            key={event.id}
                            className="w-full min-w-[20rem] "
                        />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}

export default Index;

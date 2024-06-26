import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Event } from "@/types/common";
import { Link } from "@inertiajs/react";
import { MapPinned, Ticket, Users } from "lucide-react";
import React from "react";

export default function EventCard({
    event,
    className,
}: {
    event: Event;
    className?: string;
}) {
    return (
        <Card
            key={event.id}
            className={cn(
                className,
                "relative hover:scale-[101%] transition-all hover:shadow-md duration-300"
            )}
        >
            <Link href={`/events/${event.slug}`}>
                <img
                    src={
                        event?.images_server[0]?.file_path
                            ? `/${event?.images_server[0]?.file_path}`
                            : "https://images.unsplash.com/photo-1714818282987-7d61de55302e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
                    }
                    className="object-cover w-full rounded-t-md aspect-video"
                />
                <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                        {event.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="flex gap-1 text-sm font-medium text-neutral-500">
                            At : {event.location}
                        </p>
                        <p className="flex items-center gap-1 text-sm font-medium text-neutral-500">
                            {event.max_participants}{" "}
                            <Users size="14" strokeWidth={2.5} />{" "}
                            <span className="flex items-center gap-1 ml-2 text-red-400 animate-pulse">
                                2 tickets left{" "}
                                <Ticket size="14" strokeWidth={2.5} />
                            </span>
                        </p>
                        <p className="font-medium">
                            {formatDate(event.start_date)} -{" "}
                            {formatDate(event.end_date)}
                        </p>
                    </div>

                    <div className="flex gap-1">
                        {event.categories.map((category) => (
                            <span
                                key={category.id}
                                className="px-2 text-xs font-medium border rounded-full text-violet-500 border-violet-500"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>

                    <span className="absolute px-2 text-sm font-semibold text-orange-500 bg-orange-100 rounded right-2 top-1">
                        Closed
                    </span>
                </CardContent>
            </Link>
        </Card>
    );
}

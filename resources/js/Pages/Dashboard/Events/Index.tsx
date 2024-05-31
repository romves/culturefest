import Chip from "@/Components/ui/Chip";
import { Button, buttonVariants } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate } from "@/lib/utils";
import { PageProps, User } from "@/types";
import { Event } from "@/types/common";
import { CircleCheck, CircleX, EllipsisVertical } from "lucide-react";
import { deleteEvent } from "./service/eventService";
import { Link } from "@inertiajs/react";

const EventPage = ({
    events,
}: PageProps<{ events: Event[] }>) => {
    console.log(events);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Event
                    </h2>

                    <Link
                        className={buttonVariants()}
                        href={route("dashboard.event.create")}
                    >
                        Add Event
                    </Link>
                </div>
            }
        >
            <Table className="container w-full my-10 bg-white">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Event Schedule</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Available</TableHead>
                        {/* <TableHead>Seated</TableHead> */}
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(events ?? []).map((event, index) => (
                        <TableRow key={event.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <img
                                    src={
                                        event.images_server[0]?.file_path
                                            ? `${window.location.origin}/${event.images_server[0].file_path}`
                                            : "https://fakeimg.pl/800x450"
                                    }
                                    alt="event image"
                                    className="object-contain w-[10rem] rounded-md aspect-video bg-slate-400/40"
                                />
                            </TableCell>
                            <TableCell className="w-[20%]">
                                {event.name}
                            </TableCell>
                            <TableCell>
                                {formatDate(event.start_date)}
                                {" - "}
                                {formatDate(event.end_date)}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {event.max_participants}
                            </TableCell>
                            <TableCell>
                                {event.is_available == 1 ? (
                                    <CircleCheck
                                        size={18}
                                        className="text-green-400"
                                    />
                                ) : (
                                    <CircleX
                                        size={18}
                                        className="text-red-400"
                                    />
                                )}
                            </TableCell>
                            {/* <TableCell>
                                {event.is_seated == 1 ? (
                                    <CircleCheck
                                        size={18}
                                        className="text-green-400"
                                    />
                                ) : (
                                    <CircleX
                                        size={18}
                                        className="text-red-400"
                                    />
                                )}
                            </TableCell> */}
                            <TableCell>
                                <Chip
                                    text={event.status}
                                />
                            </TableCell>
                            <TableCell className="flex items-center h-full gap-1">
                                <Link
                                    href={route(
                                        "dashboard.event.edit",
                                        event.id
                                    )}
                                    className={buttonVariants({
                                        variant: "info",
                                    })}
                                >
                                    Edit
                                </Link>
                                <Button
                                    onClick={() => deleteEvent(event.id)}
                                    variant="destructive"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
};

export default EventPage;

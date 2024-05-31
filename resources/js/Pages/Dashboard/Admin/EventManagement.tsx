import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Event } from "@/types/common";
import Chip from "@/Components/ui/Chip";
import { numberFormat } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function EventManagement({ events }: { events: Event[] }) {
    console.log(events);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Event Management
                    </h2>
                </div>
            }
        >
            <Table className="container w-full bg-white">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-left">Owner</TableHead>
                        <TableHead className="text-left">Status</TableHead>
                        <TableHead className="text-left">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event.id}>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.user.name}</TableCell>
                            <TableCell>
                                <Chip text={event.status} />
                            </TableCell>
                            <TableCell className="flex items-center h-full gap-1">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="info">Details</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <div className="flex flex-col gap-4">
                                            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                                {event.name}
                                            </h2>
                                            <p>
                                                <strong>Description:</strong>{" "}
                                                {event.description}
                                            </p>
                                            <p>
                                                <strong>Location:</strong>{" "}
                                                {event.location}
                                            </p>
                                            <p>
                                                <strong>Start Date:</strong>{" "}
                                                {event.start_date}
                                            </p>
                                            <p>
                                                <strong>End Date:</strong>{" "}
                                                {event.end_date}
                                            </p>
                                            <p>
                                                <strong>
                                                    Max Participants:
                                                </strong>{" "}
                                                {event.max_participants}
                                            </p>
                                            <p>
                                                <strong>Is Available:</strong>{" "}
                                                {event.is_available
                                                    ? "Yes"
                                                    : "No"}
                                            </p>
                                            <p>
                                                <strong>Is Seated:</strong>{" "}
                                                {event.is_seated ? "Yes" : "No"}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                {event.status}
                                            </p>
                                            <div>
                                                <strong>Categories:</strong>
                                                {event.categories.map(
                                                    (category) => (
                                                        <Chip
                                                            key={category.id}
                                                            text={category.name}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <div>
                                                <strong>Ticket Types:</strong>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableCell>
                                                                Name
                                                            </TableCell>
                                                            <TableCell>
                                                                Max Ticket
                                                            </TableCell>
                                                            <TableCell>
                                                                Price
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHeader>

                                                    <TableBody>
                                                        {event.ticket_types.map(
                                                            (ticket) => (
                                                                <TableRow
                                                                    key={
                                                                        ticket.id
                                                                    }
                                                                    className="font-medium"
                                                                >
                                                                    <TableCell className="">
                                                                        {
                                                                            ticket.name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="">
                                                                        {
                                                                            ticket.max_tickets
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="w-[10%] text-sm ">
                                                                        {numberFormat(
                                                                            ticket.price
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>

                                                <div className="mt-4 space-x-2">
                                                    <Link
                                                        method="put"
                                                        href={route(
                                                            "dashboard.admin.event-management.approve-event",
                                                            { event: event }
                                                        )}
                                                        className={buttonVariants(
                                                            { variant: "info" }
                                                        )}
                                                        onSuccess={() => {
                                                            toast.success("Event Approved")
                                                        }}
                                                    >
                                                        Approve Event
                                                    </Link>
                                                    <Link
                                                        method="put"
                                                        href={route(
                                                            "dashboard.admin.event-management.reject-event",
                                                            { event: event }
                                                        )}
                                                        className={buttonVariants(
                                                            {
                                                                variant:
                                                                    "destructive",
                                                            }
                                                        )}
                                                        onSuccess={() => {
                                                            toast.success("Event Rejected")
                                                        }}
                                                    >
                                                        Reject Event
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}

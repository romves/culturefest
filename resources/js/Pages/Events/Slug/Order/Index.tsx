import PageLayout from "@/Layouts/PageLayout";
import { Event, TicketType } from "@/types/common";
import { TicketCard, TicketCardSmall } from "../Index";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { numberFormat } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-toastify";
import { Button } from "@/Components/ui/button";

interface IOrderData {
    ticket_type_id: number;
    quantity: number;
}

interface OrderPayload {
    tickets: IOrderData[];
    payment_method: string;
}

export default function OrderPage({ event }: { event: Event }) {
    const { data, setData, post, processing, transform } =
        useForm<OrderPayload>({
            tickets: [],
            payment_method: "",
        });
    const isUltrawide = useMediaQuery({ query: "(min-width: 1760px)" });

    function handleIncrement(ticket: TicketType) {
        const newData = data.tickets.map((item: any) => {
            if (item.ticket_type_id === ticket.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }

            return item;
        });

        setData("tickets", newData);
    }

    function handleDecrement(ticket: TicketType) {
        const newData = data.tickets
            .map((item: any) => {
                if (item.ticket_type_id === ticket.id && item.quantity > 0) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            })
            .filter((item: any) => item.quantity > 0);

        setData("tickets", newData);
    }

    function handleSubmit({ slug }: { slug: string }) {
        transform((data) => {
            return {
                ...data,
                tickets: data.tickets.filter((item: any) => item.quantity > 0),
            };
        });

        post(route("order.orderTickets", { event_slug: slug }), {
            onSuccess: () => toast.success("Order has been placed"),
            onError: () => toast.error("Failed to place order"),
        });
    }

    return (
        <PageLayout navVariant="light">
            <section className="flex min-h-screen py-16">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit({ slug: event.slug });
                    }}
                    className="container flex flex-col gap-2 xl:flex-row"
                >
                    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md md:hidden">
                        <h2 className="mb-4 font-semibold md:text-2xl">
                            Ticket Type
                        </h2>

                        {event.ticket_types.map((ticket: TicketType) => (
                            <div className="flex justify-between p-2">
                                {ticket.name}
                                <div className="flex gap-1">
                                    {data.tickets.find(
                                        (item: any) =>
                                            item.ticket_type_id === ticket.id
                                    ) ? (
                                        <>
                                            <button
                                                type="button"
                                                className="relative p-3 text-white rounded-full bg-neutral-400"
                                                onClick={() =>
                                                    handleIncrement(ticket)
                                                }
                                            >
                                                <Plus
                                                    size={14}
                                                    className="absolute top-[5px] right-[5px]"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                className="relative p-3 text-white rounded-full bg-neutral-400"
                                                onClick={() =>
                                                    handleDecrement(ticket)
                                                }
                                            >
                                                <Minus
                                                    size={14}
                                                    className="absolute top-[5px] right-[5px]"
                                                />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            className="px-3 text-sm text-white rounded-full bg-neutral-400"
                                            onClick={() =>
                                                setData("tickets", [
                                                    ...data.tickets,
                                                    {
                                                        ticket_type_id:
                                                            ticket.id,
                                                        quantity: 1,
                                                    },
                                                ])
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-col hidden gap-2 md:flex ">
                        {event.ticket_types.map((ticket: TicketType) => (
                            <div className="flex gap-1" key={ticket.id}>
                                {isUltrawide ? (
                                    <TicketCard
                                        key={ticket.id}
                                        event={event}
                                        ticket={ticket}
                                    />
                                ) : (
                                    <TicketCardSmall
                                        key={ticket.id}
                                        event={event}
                                        ticket={ticket}
                                    />
                                )}
                                <div className="flex gap-1">
                                    {data.tickets.find(
                                        (item: any) =>
                                            item.ticket_type_id === ticket.id
                                    ) ? (
                                        <div className="flex flex-col gap-2">
                                            <button
                                                type="button"
                                                className="h-full px-2 rounded-lg bg-neutral-400"
                                                onClick={() =>
                                                    handleIncrement(ticket)
                                                }
                                            >
                                                <span className="text-white">
                                                    <Plus />
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="h-full px-2 rounded-lg bg-neutral-400"
                                                onClick={() =>
                                                    handleDecrement(ticket)
                                                }
                                            >
                                                <span className="text-white">
                                                    <Minus />
                                                </span>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            className="px-2 rounded-lg bg-neutral-400"
                                            onClick={() =>
                                                setData("tickets", [
                                                    ...data.tickets,
                                                    {
                                                        ticket_type_id:
                                                            ticket.id,
                                                        quantity: 1,
                                                    },
                                                ])
                                            }
                                        >
                                            <span className="text-white">
                                                <ShoppingCart />
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 w-full xl:w-[45%] ml-auto">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <h2 className="font-semibold md:text-2xl">
                                Order Summary
                            </h2>

                            <div className="flex flex-col justify-between mt-4 text-sm md:text-base">
                                {data.tickets.map((item: any) => {
                                    const ticket = event.ticket_types.find(
                                        (ticket) =>
                                            ticket.id === item.ticket_type_id
                                    );

                                    if (!ticket) return null;

                                    return (
                                        <div
                                            key={ticket?.id}
                                            className="flex justify-between w-full"
                                        >
                                            <p>
                                                {event.name.slice(0, 20)} |{" "}
                                                {ticket.name}{" "}
                                                <span className="font-medium">
                                                    x {item.quantity}
                                                </span>
                                            </p>
                                            <p className="font-medium">
                                                {numberFormat(
                                                    ticket.price * item.quantity
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col justify-between mt-4 text-sm font-medium md:text-base">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>
                                        {numberFormat(
                                            data.tickets.reduce(
                                                (acc: number, item: any) => {
                                                    const ticket =
                                                        event.ticket_types.find(
                                                            (ticket) =>
                                                                ticket.id ===
                                                                item.ticket_type_id
                                                        );

                                                    if (!ticket) return acc;

                                                    return (
                                                        acc +
                                                        ticket.price *
                                                            item.quantity
                                                    );
                                                },
                                                0
                                            )
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Tax</p>
                                    <p>{numberFormat(0)}</p>
                                </div>
                                <div className="flex justify-between py-4 text-base font-semibold md:text-xl">
                                    <p>Total</p>
                                    <p>
                                        {numberFormat(
                                            data.tickets.reduce(
                                                (acc: number, item: any) => {
                                                    const ticket =
                                                        event.ticket_types.find(
                                                            (ticket) =>
                                                                ticket.id ===
                                                                item.ticket_type_id
                                                        );

                                                    if (!ticket) return acc;

                                                    return (
                                                        acc +
                                                        ticket.price *
                                                            item.quantity
                                                    );
                                                },
                                                0
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                {/* <Label className="text-sm font-medium">Payment Method</Label> */}
                                <Select
                                    required
                                    value={data.payment_method}
                                    onValueChange={(value) =>
                                        setData("payment_method", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Payment Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PaymentMethod.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                className="w-full mt-4"
                                disabled={
                                    processing ||
                                    data.payment_method == "" ||
                                    data.tickets.length == 0
                                }
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </PageLayout>
    );
}

const PaymentMethod = ["BRI", "BCA", "Mandiri", "BNI"];

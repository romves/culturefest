import Chip from "@/Components/ui/Chip";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import PageLayout from "@/Layouts/PageLayout";
import { Link, router } from "@inertiajs/react";
import { CircleCheck, Copy } from "lucide-react";
import { useEffect, useState } from "react";

interface Payment {
    order_code: string;
    transaction_status: string;
}

export default function PaymentPage({ order }: any) {
    const [liveStatus, setLiveStatus] = useState(order.status);
    const [remainingTime, setRemainingTime] = useState(0);
    const { order_code } = order;
    const payload = JSON.parse(order.payload);
    const isExpired = new Date(payload.expiry_time) < new Date();

    const startCountdown = () => {
        const expiryTime = new Date(payload.expiry_time).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiryTime - now;
            if (distance <= 0) {
                clearInterval(interval);
            } else {
                setRemainingTime(distance);
            }
        }, 1000);
    };

    useEffect(() => {
        let isMounted = true;

        async function fetchStatus() {
            try {
                const res = await fetch(`/api/payment-status/${order_code}`);
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted) {
                        setLiveStatus(data.status);
                    }
                    if (data.status === "paid" || data.status === "expired") {
                        return;
                    }
                }
            } catch (error) {
                console.error("Failed to fetch payment status:", error);
            }

            if (isMounted) {
                setTimeout(fetchStatus, 1000);
            }
        }

        fetchStatus();
        startCountdown();

        return () => {
            isMounted = false;
        };
    }, [order_code]);

    const formatTime = () => {
        const hours = Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        return `${hours < 10 ? "0" + hours : hours} : ${
            minutes < 10 ? "0" + minutes : minutes
        } : ${seconds < 10 ? "0" + seconds : seconds}`;
    };

    return (
        <PageLayout>
            <section className="">
                <div className="container flex h-screen ">
                    <Link href={route('recent-order')} className={buttonVariants({className: 'absolute mt-8 gap-1', variant: 'link'})} >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-chevron-left"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to
                    </Link>
                    <Card className="mx-auto my-auto w-fit">
                        <CardHeader className="py-2 border-b">
                            <h1 className="text-lg font-bold text-center">
                                Payment Details
                            </h1>
                        </CardHeader>
                        <div className="px-16 py-8 space-y-4 text-center">
                            <div>
                                <p className="font-bold">#{order_code}</p>
                                <p className="my-8 text-2xl font-semibold">
                                    {liveStatus == "paid" ? (
                                        <CircleCheck
                                            className="mx-auto text-green-500 animate-pulse"
                                            size={40}
                                        />
                                    ) : (
                                        formatTime()
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Bank{" "}
                                    <span className="uppercase">
                                        {payload.va_numbers[0].bank}
                                    </span>{" "}
                                    Virtual Account
                                </p>
                                <p
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            payload.va_numbers[0].va_number
                                        );

                                        alert("Copied to clipboard");
                                    }}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="font-bold">
                                        {payload.va_numbers[0].va_number}
                                    </span>
                                    <Copy size={12} />
                                </p>
                                <p className="mt-4">
                                    Transaction Status:{" "}
                                    <Chip
                                        text={
                                            !isExpired ? liveStatus : "expired"
                                        }
                                    />
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </PageLayout>
    );
}

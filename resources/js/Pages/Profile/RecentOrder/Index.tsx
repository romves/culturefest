import Chip from "@/Components/ui/Chip";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import PageLayout from "@/Layouts/PageLayout";
import { formatDate, formatDateTime, numberFormat } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function RecentOrder({ recentOrder }: { recentOrder: any[] }) {
    console.log(recentOrder);

    return (
        <PageLayout>
            <section className="py-16">
                <div className="container flex flex-col gap-4">
                    {recentOrder.map((order) => {
                        const payload = JSON.parse(order.payload);
                        const isExpired =
                            new Date(payload.expiry_time) < new Date();
                        return (
                            <Card
                                key={order.id}
                                className="flex flex-col justify-between gap-3 p-4 w-[480px] mx-auto"
                            >
                                <div className="w-full space-y-4">
                                    <p className="flex justify-between w-full">
                                        <p className="font-medium">
                                            #{order.order_code}
                                        </p>
                                        <p className="font-medium">
                                            {numberFormat(order.total_price)}
                                        </p>
                                    </p>
                                    <div className="space-y-1">
                                        <p className="">{order.event.name}</p>
                                        <p className="text-sm">
                                            {formatDateTime(order.created_at)}
                                        </p>
                                    </div>

                                    <Chip
                                        text={
                                            !isExpired
                                                ? order.status
                                                : "expired"
                                        }
                                    />
                                </div>
                                {order.status != "paid" && !isExpired && (
                                    <Link
                                        href={route(
                                            "order.payment",
                                            order.order_code
                                        )}
                                        className={buttonVariants({
                                            className: "my-auto",
                                            variant: "info",
                                        })}
                                    >
                                        Pay Now
                                    </Link>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </section>
        </PageLayout>
    );
}

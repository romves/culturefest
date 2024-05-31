import Chip from "@/Components/ui/Chip";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { numberFormat } from "@/lib/utils";
import { Event } from "@/types/common";
import React, { PropsWithChildren, ReactNode } from "react";

interface RecentOrder {
    id: number;
    order_code: string;
    status: string;
    payment_method: string;
    total_price: number;
    event: Event;
}

function Index({
    recentOrders,
}: PropsWithChildren<{ recentOrders: RecentOrder[] }>) {
    console.log(recentOrders);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Recent Order
                    </h2>
                </div>
            }
        >
            <div className="container">
                <Table className="container w-full my-10 bg-white">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Code</TableHead>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Total Order</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-semibold">
                                    {order.order_code}
                                </TableCell>
                                <TableCell>{order.event.name}</TableCell>
                                <TableCell>{order.payment_method}</TableCell>
                                <TableCell>
                                    {numberFormat(order.total_price)}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        text={order.status}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;

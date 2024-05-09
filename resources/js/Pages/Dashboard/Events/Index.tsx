import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";

const Event = ({ user }: PageProps<{ user: User }>) => {
    return <AuthenticatedLayout user={user}  header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Event</h2>}>
        <div className="container w-full h-screen bg-red-400">
            
        </div>
    </AuthenticatedLayout>;
};

export default Event;

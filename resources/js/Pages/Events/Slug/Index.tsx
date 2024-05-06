import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import PageLayout from "@/Layouts/PageLayout";
import { PageProps } from "@/types";
import { Event } from "@/types/common";

export default function EventDetail({ event }: PageProps<{ event: Event }>) {
    return (
        <PageLayout>
            <section>
                <div className="container py-4 space-y-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">
                                    Components
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex flex-wrap gap-4">
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1714818282987-7d61de55302e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
                                className="w-full rounded-md"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h1 className="text-3xl font-bold">{event.name}</h1>
                            <p className="text-lg text-neutral-500">
                                {event.description}
                            </p>
                            <div className="flex gap-4 mt-4">
                                <div>
                                    <p className="text-sm text-neutral-500">
                                        {event.max_participants} participants
                                    </p>
                                    <p className="text-sm text-neutral-500">
                                        {event.location}
                                    </p>
                                    <p className="font-medium">
                                        2022-01-01 - 2022-01-02
                                    </p>
                                </div>
                                <div>
                                    <button className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

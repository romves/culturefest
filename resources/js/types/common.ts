export interface Event {
    id: number;
    name: string;
    description: string;
    slug: string;
    location: string;
    start_date: string;
    end_date: string;
    max_participants: number;
    is_available: number;
    is_seated: number;
    status: string;
    categories: Category[];
    images: FileList | null;
    ticket_types: TicketType[];
    images_server: ServerImage[];
}

export interface Category {
    id: number;
    name: string;
}

export interface TicketType {
    id: number;
    name: string;
    price: number;
}

export enum EventStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELED = "canceled",
    COMPLETED = "completed",
}

export interface ServerImage {
    id: number;
    file_path: string;
    filename: string;
}

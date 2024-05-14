export interface Event {
    id: number;
    name: string;
    description: string;
    slug: string;
    image_url: string;
    location: string;
    start_date: string;
    end_date: string;
    max_participants: number;
    is_available: number;
    is_seated: number;
    status: string;
    categories: Category[];
    ticket_types: TicketType[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface TicketType {
    id: number;
    name: string;
    price: number;
}

export enum EventStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    CANCELED = 'canceled',
    COMPLETED = 'completed',
}

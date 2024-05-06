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
}

export enum EventStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    CANCELED = 'canceled',
    COMPLETED = 'completed',
}

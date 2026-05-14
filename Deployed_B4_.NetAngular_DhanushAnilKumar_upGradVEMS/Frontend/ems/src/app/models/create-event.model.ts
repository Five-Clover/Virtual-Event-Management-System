export interface CreateEvent {
  eventName: string;
  categoryId: string;
  eventDate: Date;
  description?: string;
  status: string;
}
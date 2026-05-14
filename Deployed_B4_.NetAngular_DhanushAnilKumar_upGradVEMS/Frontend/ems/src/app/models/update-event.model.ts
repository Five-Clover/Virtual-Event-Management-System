export interface UpdateEvent {
  eventName: string;
  categoryId: string;
  eventDate: Date;
  description?: string;
  status: string;
}
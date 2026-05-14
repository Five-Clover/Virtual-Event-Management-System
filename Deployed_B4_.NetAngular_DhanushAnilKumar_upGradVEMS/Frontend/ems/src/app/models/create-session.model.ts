export interface CreateSession {
  eventId: string;
  speakerId: string;
  title: string;
  sessionStart: Date;
  sessionEnd: Date;
  sessionUrl?: string;
  description?: string;
}
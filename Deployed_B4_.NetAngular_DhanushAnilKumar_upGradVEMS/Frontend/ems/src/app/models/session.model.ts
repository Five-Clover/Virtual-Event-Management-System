export interface Session {
  sessionId: string;
  title: string;
  eventName: string;
  speakerName: string;
  sessionStart: Date;
  sessionEnd: Date;
  sessionUrl?: string;
}
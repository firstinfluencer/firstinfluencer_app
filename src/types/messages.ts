export interface Message {
  id: string;
  conversationId: string;
  campaignId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  campaignId: string;
  participants: string[];
  lastMessage?: {
    content: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
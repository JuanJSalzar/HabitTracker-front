export type MessageRole = 'user' | 'bot';

export interface ChatMessage {
    role: MessageRole;
    content: string;
}

export interface ChatResponse {
    messages: ChatMessage[];
}
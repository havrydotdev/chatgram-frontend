import { Chat } from "@/types/chat";

interface ChatTabProps {
  chat: Chat;
}

export default function ChatTab({ chat }: ChatTabProps) {
  return (
    <li>
      <h3>{chat.name}</h3>
      <h5>{chat.messages.at(chat.messages.length - 1)?.text}</h5>
    </li>
  );
}

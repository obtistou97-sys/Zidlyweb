import { getKV } from "./kv";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export type Conversation = {
  id: string;
  locale: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

const CONV_PREFIX = "conv:";
const INDEX_KEY = "conv:index";

export async function saveMessage(
  conversationId: string,
  locale: string,
  messages: { role: string; content: string }[]
): Promise<void> {
  const now = Date.now();

  const kv = getKV();
  let conv = await kv.get<Conversation>(`${CONV_PREFIX}${conversationId}`);

  if (!conv) {
    conv = {
      id: conversationId,
      locale,
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
  }

  conv.messages = messages.map((m, i) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
    timestamp: now - (messages.length - 1 - i) * 1000,
  }));
  conv.updatedAt = now;
  conv.locale = locale;

  await kv.set(`${CONV_PREFIX}${conversationId}`, conv, { ex: 60 * 60 * 24 * 90 });

  const index = (await kv.get<string[]>(INDEX_KEY)) || [];
  if (!index.includes(conversationId)) {
    index.push(conversationId);
    await kv.set(INDEX_KEY, index, { ex: 60 * 60 * 24 * 90 });
  }
}

export async function getConversation(id: string): Promise<Conversation | null> {
  const kv = getKV();
  return kv.get<Conversation>(`${CONV_PREFIX}${id}`);
}

export async function getAllConversations(): Promise<Conversation[]> {
  const kv = getKV();
  const index = (await kv.get<string[]>(INDEX_KEY)) || [];
  if (index.length === 0) return [];

  const convs = await Promise.all(index.map((id) => kv.get<Conversation>(`${CONV_PREFIX}${id}`)));
  return convs
    .filter((c): c is Conversation => c !== null)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function deleteConversation(id: string): Promise<void> {
  const kv = getKV();
  await kv.del(`${CONV_PREFIX}${id}`);
  const index = (await kv.get<string[]>(INDEX_KEY)) || [];
  await kv.set(
    INDEX_KEY,
    index.filter((i) => i !== id),
    { ex: 60 * 60 * 24 * 90 }
  );
}

export async function clearAllConversations(): Promise<void> {
  const kv = getKV();
  const index = (await kv.get<string[]>(INDEX_KEY)) || [];
  if (index.length > 0) {
    await Promise.all(index.map((id) => kv.del(`${CONV_PREFIX}${id}`)));
  }
  await kv.del(INDEX_KEY);
}

const LEAD_PREFIX = "lead:";
const LEAD_INDEX_KEY = "lead:index";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  capturedAt: string;
};

export async function saveLead(lead: Omit<Lead, "id">): Promise<void> {
  const kv = getKV();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const fullLead: Lead = { ...lead, id };

  await kv.set(`${LEAD_PREFIX}${id}`, fullLead, { ex: 60 * 60 * 24 * 365 });

  const index = (await kv.get<string[]>(LEAD_INDEX_KEY)) || [];
  index.push(id);
  await kv.set(LEAD_INDEX_KEY, index, { ex: 60 * 60 * 24 * 365 });
}

export async function getAllLeads(): Promise<Lead[]> {
  const kv = getKV();
  const index = (await kv.get<string[]>(LEAD_INDEX_KEY)) || [];
  if (index.length === 0) return [];

  const leads = await Promise.all(index.map((id) => kv.get<Lead>(`${LEAD_PREFIX}${id}`)));
  return leads
    .filter((l): l is Lead => l !== null)
    .sort((a, b) => new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime());
}

export async function deleteLead(id: string): Promise<void> {
  const kv = getKV();
  await kv.del(`${LEAD_PREFIX}${id}`);
  const index = (await kv.get<string[]>(LEAD_INDEX_KEY)) || [];
  await kv.set(
    LEAD_INDEX_KEY,
    index.filter((i) => i !== id),
    { ex: 60 * 60 * 24 * 365 }
  );
}

export async function clearAllLeads(): Promise<void> {
  const kv = getKV();
  const index = (await kv.get<string[]>(LEAD_INDEX_KEY)) || [];
  if (index.length > 0) {
    await Promise.all(index.map((id) => kv.del(`${LEAD_PREFIX}${id}`)));
  }
  await kv.del(LEAD_INDEX_KEY);
}

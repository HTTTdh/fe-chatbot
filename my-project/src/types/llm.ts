export interface LLMDetailResponse {
  id: number;
  name: string;
  key_free: string;
  llm_keys: LLMKeyResponse[];
}

export interface LLMResponse {
  id: number;
  prompt: string;
  created_at: string;
  system_greeting: string;
  botName: string;
  bot_model_detail_id: number;
  embedding_model_detail_id: number;
  llm_details: LLMDetailResponse[];
}

export interface LLMKeyResponse {
  id: number;
  name: string;
  key: string;
  type: "bot" | "embedding";
  created_at: string;
  updated_at: string;
  llm_detail_id: number;
}
export interface LLM {
  prompt: string;
  system_greeting: string;
  botName: string;
  bot_model_detail_id: string;
  embedding_model_detail_id: string;
  company_id: string;
}

export interface LLMKey {
  name: string;
  key: string;
  type: "bot" | "embedding";
}
export interface LLMKeyResponse {
  id: number;
  name: string;
  key: string;
  type: "bot" | "embedding";
  llm_detail_id: number;
  created_at: string;
  updated_at: string;
}

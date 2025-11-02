import axiosClient from "@/config/axios";
import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type { LLM, LLMKey, LLMKeyResponse, LLMResponse } from "@/types/llm";

export const getAllLLMs = async (): Promise<LLMResponse[]> => {
  const response = await axiosClient.get<LLMResponse[]>(
    API_ENDPOINT.LLM.GET_ALL
  );
  return response.data;
};

export const createLLM = async (
  llmData: Partial<LLM>
): Promise<LLMResponse> => {
  const response = await axiosClient.post<LLMResponse>(
    API_ENDPOINT.LLM.CREATE,
    llmData
  );
  return response.data;
};
export const updateLLM = async (
  llm_id: number,
  llmData: Partial<LLM>
): Promise<LLMResponse> => {
  const response = await axiosClient.put<LLMResponse>(
    API_ENDPOINT.LLM.UPDATE(llm_id),
    llmData
  );
  return response.data.llm;
};

export const deleteLLM = async (llm_id: number): Promise<void> => {
  await axiosClient.delete<void>(API_ENDPOINT.LLM.DELETE(llm_id));
};
export const getLLMById = async (llm_id: number): Promise<LLMResponse> => {
  const response = await axiosClient.get<LLMResponse>(
    API_ENDPOINT.LLM.GET_BY_ID(llm_id)
  );
  return response.data;
};
export const createLLMKey = async (
  llm_id: number,
  keyData: Partial<LLMKey>
): Promise<LLMKeyResponse> => {
  const response = await axiosClient.post<LLMKeyResponse>(
    API_ENDPOINT.LLM.CREATE_KEY(llm_id),
    keyData
  );
  return response.data.llm_key;
};
export const getLLMKeys = async (llm_id: number): Promise<LLMKeyResponse[]> => {
  const response = await axiosClient.get<LLMKeyResponse[]>(
    API_ENDPOINT.LLM.GET_KEYS(llm_id)
  );
  return response.data;
};
export const updateLLMKey = async (
  llm_id: number,
  key_id: number,
  keyData: Partial<LLMKey>
): Promise<LLMKeyResponse> => {
  const response = await axiosClient.put<LLMKeyResponse>(
    API_ENDPOINT.LLM.UPDATE_KEY(llm_id, key_id),
    keyData
  );
  return response.data;
};
export const deleteLLMKey = async (
  llm_id: number,
  key_id: number
): Promise<void> => {
  await axiosClient.delete<void>(API_ENDPOINT.LLM.DELETE_KEY(llm_id, key_id));
};

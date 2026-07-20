"use client";

import { useMutation } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";

interface GenerateDescriptionParams {
  make: string;
  model: string;
  year: number;
  condition?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  color?: string;
  features?: string[];
  tone?: "professional" | "enthusiast" | "luxury";
  length?: "short" | "medium" | "long";
}

export function useGenerateDescription() {
  return useMutation({
    mutationFn: async (params: GenerateDescriptionParams) => {
      const res = await api.post<{ description: string }>(
        endpoints.ai.generateDescription,
        params,
      );
      if (!res.success || !res.data)
        throw new Error(res.error || "Failed to generate description");
      return res.data.description;
    },
  });
}

interface ChatParams {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
  onChunk: (text: string) => void;
  onDone: () => void;
}

export function useAIChat() {
  return useMutation({
    mutationFn: async ({ message, history, onChunk, onDone }: ChatParams) => {
      const BASE_URL =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const res = await fetch(`${BASE_URL}${endpoints.ai.chat}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message, history }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Chat request failed");
      }

      const contentType = res.headers.get("content-type") || "";

      // Vercel buffered mode: server returns a single JSON response
      if (contentType.includes("application/json")) {
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "Chat request failed");
        if (json.content) onChunk(json.content);
        onDone();
        return;
      }

      // Local SSE streaming mode
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const payload = trimmed.slice(6);
          if (payload === "[DONE]") {
            onDone();
            return;
          }
          try {
            const parsed = JSON.parse(payload);
            // Backend sends { error } when Groq is unavailable
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.content) {
              onChunk(parsed.content);
            }
          } catch (parseErr) {
            // Re-throw real errors (e.g. Groq unavailable), skip JSON parse errors
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }

      onDone();
    },
  });
}

interface AnalyzeParams {
  data: unknown[];
  analysisType: "trend" | "summary" | "kpi";
}

export function useAnalyzeData() {
  return useMutation({
    mutationFn: async (params: AnalyzeParams) => {
      const res = await api.post<{ analysis: string; recordCount: number }>(
        endpoints.ai.analyze,
        params,
      );
      if (!res.success || !res.data)
        throw new Error(res.error || "Failed to analyze data");
      return res.data;
    },
  });
}

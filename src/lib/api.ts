const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data?: T; error?: string }> {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    return { success: false, error: json.error || "Request failed" };
  }

  return json;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};

export const endpoints = {
  items: {
    list: (params?: string) => `/api/items${params ? `?${params}` : ""}`,
    byId: (id: string) => `/api/items/${id}`,
    my: "/api/items/my",
    create: "/api/items",
    update: (id: string) => `/api/items/${id}`,
    delete: (id: string) => `/api/items/${id}`,
  },
  ai: {
    generateDescription: "/api/ai/generate-description",
    chat: "/api/ai/chat",
    analyze: "/api/ai/analyze",
  },
  contact: {
    submit: "/api/contact",
  },
  health: "/api/health",
};

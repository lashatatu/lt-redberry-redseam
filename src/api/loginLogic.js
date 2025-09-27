import { useMutation } from "@tanstack/react-query";

export const loginMutation = async (data) => {
  const response = await fetch(import.meta.env.VITE_LOG_IN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message || "Login failed.");
  }
  return response.json();
};

export function useLoginMutation({ onSuccess, onError }) {
  return useMutation({
    mutationFn: loginMutation,
    onSuccess,
    onError,
  });
}


import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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


export function useUser() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("local-storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("local-storage", handleStorage);
    };
  }, []);
  return user;
}


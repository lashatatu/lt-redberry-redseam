export const fetchCart = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_CART_ENDPOINT}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const patchCartItem = async ({ token, id, color, size, quantity }) => {
  const response = await fetch(`${import.meta.env.VITE_CART_ENDPOINT}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ color, size, quantity })
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const deleteCartItem = async ({ token, id, color, size }) => {
  const response = await fetch(
    `${import.meta.env.VITE_CART_ENDPOINT}/products/${id}?color=${encodeURIComponent(color)}&size=${encodeURIComponent(size)}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return id;
};

export const checkoutCart = async ({ token, data }) => {
  const res = await fetch(`${import.meta.env.VITE_CART_ENDPOINT}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
};

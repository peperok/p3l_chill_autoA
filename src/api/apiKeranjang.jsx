import useAxios from ".";

// Dapatkan semua item keranjang user
export const GetCartItems = async () => {
  try {
    const response = await useAxios.get("/cart", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data; // Asumsi data ada di response.data.data
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Tambah item baru ke keranjang
export const AddCartItem = async (item) => {
  try {
    const response = await useAxios.post("/cart", item, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update quantity atau data item keranjang
export const UpdateCartItem = async (id, updates) => {
  try {
    const response = await useAxios.put(`/cart/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Hapus item keranjang berdasarkan id
export const DeleteCartItem = async (id) => {
  try {
    const response = await useAxios.delete(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Apply kode promo ke keranjang
export const ApplyPromoCode = async (code) => {
  try {
    const response = await useAxios.post(
      "/cart/apply-promo",
      { code },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

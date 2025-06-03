import useAxios from ".";

// Dapatkan semua transaksi gudang
export const GetAllTransactions = async () => {
  try {
    const response = await useAxios.get("/gudang/transactions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data; // asumsikan data ada di data.data
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Tambah jadwal pengiriman atau pengambilan
export const CreateTransaction = async (data) => {
  // data harus mengandung customer, jadwal, dan kurir (optional)
  try {
    const response = await useAxios.post("/gudang/transactions", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update status konfirmasi diterima
export const ConfirmReceived = async (id) => {
  try {
    const response = await useAxios.put(`/gudang/transactions/${id}/confirm`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// (Optional) Hapus transaksi (kalau backend support)
export const DeleteTransaction = async (id) => {
  try {
    const response = await useAxios.delete(`/gudang/transactions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

import useAxios from ".";


export const GetAllTransactions = async () => {
  try {
    const response = await useAxios.get("/penitipan", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data; 
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const CreateTransaction = async (data) => {
  
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

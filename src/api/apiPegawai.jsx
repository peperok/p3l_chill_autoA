import useAxios from ".";

//index (showAll)
export const GetAllPegawais = async () => {
  try {
    const response = await useAxios.get("/pegawai", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

//search
export const GetPegawais = async () => {
  const id = JSON.parse(sessionStorage.getItem("pegawai")).id;
  try {
    const response = await useAxios.get(`/pegawai/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

//store
export const CreatePegawai = async (data) => {
  try {
    const response = await useAxios.post("/pegawai", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//update
export const UpdatePegawai = async (values) => {
  try {
    const response = await useAxios.put(`/pegawai/${values.id}`, values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeletePegawai = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.delete(`/pegawai/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

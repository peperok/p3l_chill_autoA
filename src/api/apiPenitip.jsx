import useAxios from ".";

//index (showAll)
export const GetAllPenitips = async () => {
  try {
    const response = await useAxios.get("/penitip", {
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
export const GetPenitips = async () => {
  const id = JSON.parse(sessionStorage.getItem("penitip")).id;
  try {
    const response = await useAxios.get(`/penitip/${id}`, {
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
export const CreatePenitip = async (data) => {
  try {
    const response = await useAxios.post("/penitip", data, {
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
export const UpdatePenitip = async (values) => {
  try {
    const response = await useAxios.put(`/penitip/${values.id}`, values, {
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

export const DeletePenitip = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await useAxios.delete(`/penitip/${id}`, {
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

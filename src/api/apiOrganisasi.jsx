import useAxios from "./useAxios";

//buat dapetin semua data buat ditaro di dashboard
export const GetAllContens = async () => {
  try {
    const response = await useAxios.get("/contents", {
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

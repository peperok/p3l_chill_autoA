import { toast } from "react-toastify";
import useAxios from ".";

const SignIn = async (data) => {
  const roles = [
    {
      url: "/loginPenitip",
      role: "Penitip",
      redirectLogic: () => "/HomeAfter",
    },
    {
      url: "/loginPembeli",
      role: "Pembeli",
      redirectLogic: () => "/HomeAfter",
    },
    {
      url: "/loginPegawai",
      role: "Pegawai",
      redirectLogic: (detail) => {
        const jabatan = detail?.jabatan?.toLowerCase();
        if (!jabatan) throw new Error("Jabatan pegawai tidak ditemukan.");

        sessionStorage.setItem("jabatan", jabatan);

        switch (jabatan) {
          case "admin":
            return "/homeAdmin";
          case "cs":
            return "/homeCS";
          case "owner":
            return "/homeOwner";
          case "gudang":
            return "/homeGudang";
          default:
            throw new Error("Jabatan pegawai tidak dikenali.");
        }
      },
    },
    {
      url: "/loginOrganisasi",
      role: "Organisasi",
      redirectLogic: (detail) => {
        // Kalau nanti organisasi punya tipe
        const tipe = detail?.tipe?.toLowerCase?.();
        sessionStorage.setItem("tipeOrganisasi", tipe || "default");
        return "/homeOrganisasi"; // bisa dibuat dinamis kalau ada tipe
      },
    },
  ];

  for (const role of roles) {
    try {

      const requestData =
        role.role === "Pegawai" ? { ...data, jabatan: data.jabatan } : data;

      const response = await useAxios.post(role.url, requestData);

      const token = response.data.token;
      const detail = response.data.detail;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role.role);
      sessionStorage.setItem("user", JSON.stringify(detail));


      const redirectUrl = role.redirectLogic(detail);

      toast.success(`Berhasil login sebagai ${role.role}`);
      window.location.href = redirectUrl;

      return response.data;
    } catch (error) {
      console.warn(
        `Gagal login sebagai ${role.role}:`,
        error.response?.data || error.message
      );
    }
  }

  toast.error("Email atau password tidak ditemukan di semua akun.");
  throw new Error("Email atau password salah");
};

const SignUpOrganisasi = async (data) => {
  try {
    const response = await useAxios.post("/registerOrganisasi", data);
    toast.success("Pendaftaran Organisasi berhasil!");
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Gagal mendaftar sebagai Organisasi"
    );
    throw (
      error.response?.data ||
      "Terjadi kesalahan saat mendaftar sebagai Organisasi."
    );
  }
};

const SignUpPembeli = async (data) => {
  try {
    const response = await useAxios.post("/registerPembeli", data);
    toast.success("Pendaftaran Pembeli berhasil!");
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Gagal mendaftar sebagai Pembeli"
    );
    throw (
      error.response?.data ||
      "Terjadi kesalahan saat mendaftar sebagai Pembeli."
    );
  }
};

export { SignIn, SignUpOrganisasi, SignUpPembeli };

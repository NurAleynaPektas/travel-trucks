import axios from "axios";

const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});


export const getCampers = async (params) => {
  const config = params ? { params } : undefined;
  const response = await api.get("/campers", config);

  const raw = response.data;

  if (Array.isArray(raw)) {
    return raw;
  }


  if (raw && typeof raw === "object") {
    if (Array.isArray(raw.items)) return raw.items;
    if (Array.isArray(raw.data)) return raw.data;
    return Object.values(raw);
  }
  return [];
};


export const getCamperById = async (id) => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};

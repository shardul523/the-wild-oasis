import axios from "axios";
import { URL, BASE } from "../config";

export async function getAllCabins() {
  try {
    const res = (await axios.get(`${URL}/${BASE}/cabins`)).data;
    return res.data.cabins;
  } catch (err) {
    console.error(err);
    throw new Error("Cabins could not be loaded");
  }
}

export async function deleteCabin(id) {
  try {
    const response = (await axios.delete(`${URL}/${BASE}/cabins/${id}`)).data;
    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Cabin could not be deleted!");
  }
}

export async function createNewCabin(newCabin) {
  try {
    await axios.post(`${URL}/${BASE}/cabins`, {
      ...newCabin,
      name: newCabin.cabinName,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Cabin could not be created");
  }
}

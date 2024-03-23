import axios from "axios";
import { BASE } from "../config";

export async function getAllCabins() {
  try {
    const res = (await axios.get(`/${BASE}/cabins`)).data;
    return res.data.cabins;
  } catch (err) {
    console.error(err);
    throw new Error("Cabins could not be loaded");
  }
}

export async function deleteCabin(id) {
  try {
    const response = (await axios.delete(`/${BASE}/cabins/${id}`)).data;
    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Cabin could not be deleted!");
  }
}

export async function createNewCabin(newCabin) {
  try {
    const form = new FormData();
    form.set("name", newCabin.cabinName);
    form.set("cabinImage", newCabin.cabinImage);
    form.set("cabinName", newCabin.cabinName);
    form.set("maxCapacity", newCabin.maxCapacity);
    form.set("regularPrice", newCabin.regularPrice);
    form.set("discount", newCabin.discount);
    form.set("description", newCabin.description);

    await axios.post(`/${BASE}/cabins`, form);
  } catch (err) {
    console.error(err);
    throw new Error("Cabin could not be created");
  }
}

export async function updateCabin(cabinId, cabinDetails) {
  try {
    const form = new FormData();
    form.set("name", cabinDetails.cabinName);
    form.set("cabinImage", cabinDetails.cabinImage);
    form.set("cabinName", cabinDetails.cabinName);
    form.set("maxCapacity", cabinDetails.maxCapacity);
    form.set("regularPrice", cabinDetails.regularPrice);
    form.set("discount", cabinDetails.discount);
    form.set("description", cabinDetails.description);

    await axios.patch(`/${BASE}/cabins/${cabinId}`, form);
  } catch (err) {
    console.error(err);
    throw new Error("Cabin could not be updated");
  }
}

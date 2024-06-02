import axios from "axios";
import { FormFields, FormFieldsLogin, NimType } from "../types";

const API_URL: string = "http://localhost:8000/api";

export const register = async (data: FormFields) => {
  const response = await axios.post(`${API_URL}/public/register`, data);

  return response.data;
};

export const login = async (data: FormFieldsLogin) => {
  const response = await axios.post(`${API_URL}/public/login`, data, {
    withCredentials: true,
  });
  const userId = response.data;
  const nimResponse = await axios.get(`${API_URL}/secured/nim`, {
    withCredentials: true,
  });
  const newNim = nimResponse.data;
  const filterNim = newNim.filter(
    (data: NimType) => data.userId === userId.userId
  );

  if (filterNim.length > 0) {
    window.location.href = "/";
  } else {
    window.location.href = "/nim";
  }

  return userId;
};

export const verifyNim = async (data: NimType) => {
  const response = await axios.post(`${API_URL}/secured/nim`, data, {
    withCredentials: true,
  });

  if (!response) {
    throw new Error("Error fetching Data");
  } else {
    window.location.href = "/";
  }

  return response.data;
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/secured/logout`, null, {
      withCredentials: true,
    });

    window.location.reload();

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  const response = await axios.get(`${API_URL}/secured/user`, {
    withCredentials: true,
  });

  if (!response) {
    throw new Error("Error fetching Data");
  }

  return response.data;
};

export const getAllCourse = async () => {
  const response = await axios.get(`${API_URL}/secured/getAllCourse`, {
    withCredentials: true,
  });

  if (!response) {
    throw new Error("Error fetching Data");
  }

  return response.data;
};

export const getOneCourse = async (id?: string) => {
  const response = await axios.get(`${API_URL}/secured/getOneCourse/${id}`, {
    withCredentials: true,
  });

  if (!response) {
    throw new Error("Error fetching Data");
  }

  return response.data;
};

export const addMemberCourse = async (id?: string) => {
  const response = await axios.post(
    `${API_URL}/secured/addMemberCourse/${id}`,
    null,
    {
      withCredentials: true,
    }
  );

  if (!response) {
    throw new Error("Error fetching Data");
  }

  return response.data;
};

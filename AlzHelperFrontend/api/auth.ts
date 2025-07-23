import axios from 'axios';

const BASE_URL = 'https://0edc3cf12e4c.ngrok-free.app/api';

export async function loginCaregiver(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/caregiver/login`, { email, password });
    return { token: response.data.token, caregiver: response.data.caregiver };
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Caregiver login failed');
  }
}

export async function loginDoctor(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/doctor/login`, { email, password });
    return { token: response.data.token, doctorId: response.data.doctorId, name: response.data.name };
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Doctor login failed');
  }
}

export async function registerCaregiver(first_name: string, last_name: string, email: string, phone: string, password: string) {
  try {
    await axios.post(`${BASE_URL}/caregiver/register`, { first_name, last_name, email, phone, password });
    return true;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Caregiver registration failed');
  }
}

export async function registerDoctor(name: string, email: string, phone: string, password: string) {
  try {
    await axios.post(`${BASE_URL}/doctor/register`, { name, email, phone, password });
    return true;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Doctor registration failed');
  }
} 
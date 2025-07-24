import axios from 'axios';

const BASE_URL = 'https://0edc3cf12e4c.ngrok-free.app/api';

export async function getAllPatients() {
  try {
    const response = await axios.get(`${BASE_URL}/patient`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch patients');
  }
}

export async function getPatientReports(patientId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/patient/${patientId}/reports`);
    return response.data.reports;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch patient reports');
  }
}

export async function deletePatient(patientId: string) {
  try {
    await axios.delete(`${BASE_URL}/patient/${patientId}`);
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to delete patient');
  }
} 
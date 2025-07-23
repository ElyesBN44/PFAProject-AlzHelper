import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

const BASE_URL = 'https://0edc3cf12e4c.ngrok-free.app/api';

export async function createReport(symptoms: Array<{ name: string; severity: string }>) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(`${BASE_URL}/report`, { symptoms }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to create report');
  }
}

export async function getDoctorReports() {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${BASE_URL}/doctor/reports`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch reports');
  }
}

export async function addNoteToReport(reportId: string, comment: string) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(`${BASE_URL}/doctor/note`, { 
      reportId, 
      comment 
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to add note');
  }
} 
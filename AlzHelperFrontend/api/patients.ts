import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

const BASE_URL = 'https://46762baa0d86.ngrok-free.app/api';

export async function getAllPatients() {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${BASE_URL}/patient`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch patients');
  }
}

export async function createPatient(patientData: any) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(`${BASE_URL}/patient`, patientData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to add patient');
  }
}

export async function getPatientReports(patientId: string) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${BASE_URL}/reports/patient/${patientId}`;
    console.log('Calling API:', url);
    console.log('With token:', token.substring(0, 20) + '...');

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data);
    return response.data.reports; // Return the reports array from the response
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to fetch patient reports');
  }
}

export async function deletePatient(patientId: string) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.delete(`${BASE_URL}/patient/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to delete patient');
  }
}

// Patient notes functions
export async function addPatientNote(patientId: string, comment: string) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(`${BASE_URL}/doctor/patient-note`, {
      patientId,
      comment
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to add patient note');
  }
}

export async function getPatientNotes(patientId: string) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${BASE_URL}/doctor/patient-notes/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch patient notes');
  }
} 
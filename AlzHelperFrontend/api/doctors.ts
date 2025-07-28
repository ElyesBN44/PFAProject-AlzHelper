import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

const BASE_URL = 'https://46762baa0d86.ngrok-free.app/api';

export async function getAllDoctors() {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${BASE_URL}/doctors`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch doctors');
  }
} 
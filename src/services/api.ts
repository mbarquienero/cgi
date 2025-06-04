import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GenerateVideoParams {
  filename: string;
  effect: string;
  duration?: number;
}

export interface VideoResponse {
  video_id: string;
  output_path: string;
  download_url: string;
  message: string;
}

export const uploadProductImage = async (file: File): Promise<{ filename: string; file_path: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const generateVideo = async (params: GenerateVideoParams): Promise<VideoResponse> => {
  const formData = new FormData();
  formData.append('filename', params.filename);
  formData.append('effect', params.effect);
  
  if (params.duration) {
    formData.append('duration', params.duration.toString());
  }
  
  try {
    const response = await api.post('/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
};

export const getVideoById = async (videoId: string): Promise<string> => {
  return `${API_URL}/video/${videoId}`;
};
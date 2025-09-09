import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 4000; // 서버 주소

const instance = axios.create({
  baseURL: API_URL, // 이 주소로 요청을 보내도록 설정
});

export default instance;
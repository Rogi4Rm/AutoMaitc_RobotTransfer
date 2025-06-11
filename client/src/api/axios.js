import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,  // 요청 제한 시간 (필요 시 설정)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 20, duration: '30s' };

export default function () {
  const respuesta = http.get(__ENV.APP_URL || 'http://localhost:3000/');
  check(respuesta, { 'status 200': res => res.status === 200 });
  sleep(1);
}

import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10,  // Virtual Users
  duration: '30s', // Duration of test
};

export default function () {
  let res = http.get('http://localhost:3000');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

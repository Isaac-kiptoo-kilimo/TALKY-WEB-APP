import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 200 },
    { duration: "5s", target: 2 },
    { duration: "50s", target: 500 },
    { duration: "1s", target: 2 },
  ],
  thresholds: {
    http_req_failed: ["rate < 0.2"],
    http_req_duration: ["p(90)<300"],
  },
};

export default function () {
  const body = JSON.stringify({
    followingUserID: "33f9de61-d6b8-4d61-b1f4-b8fec2e4052f",
    followedUserID: "04947279-d765-4eac-b6f6-96beed409ba9",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post("http://localhost:5000/follow", body, params);
  sleep(1); 
}

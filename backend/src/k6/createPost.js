import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  const body = JSON.stringify({
    caption:
      "Enjoy it #ChristmasMagic #JoyfulMoments",
    postImage: [
      "https://cdn.pixabay.com/photo/2019/02/04/07/36/new-year-3974099_640.jpg",
    ],
    userID: "0cb03fa5-9ad4-4b18-a693-32a92befedf2",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post("http://localhost:3700/posts/create", body, params);
  sleep(1);
}

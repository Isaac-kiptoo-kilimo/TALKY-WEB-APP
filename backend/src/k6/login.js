import {sleep, check} from "k6";

export const options = {
    vus: 1,
    duration: "10s"
};


export default function () {
    const body = JSON.stringify({
        email: "isaackilimok2@gmail.com",
        password: "12345678@Ik"
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    let response = http.post("http://localhost:3700/user/login", body, params);

    check(response, {
        "is status 200?": (res) => res.status == 200,
        "is successfully logged in?": (res) =>
          res.body.includes("Logged in successfully"),
      });

      sleep(1);

}

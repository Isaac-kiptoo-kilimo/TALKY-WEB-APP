import http from "k6/http";

import { sleep, check } from "k6";
// import { response } from "express";

export const options = {
  vus: 20,
  duration: "1s",
};

export default function () {
  const body = JSON.stringify({
    username: "QA Stephen",
    email: "stephen@gmail.com",
    password: "@Emmanuel123",
    fullName: "Emmanuel Kipsang"
  });

  const params = {
    headers: {
      "Content-Type": "application/json"
    },
  };

 const res= http.post("http://localhost:3700/users/register/", body, params);
  sleep(1);

//   check(res,{
//     'is status 201': (res)=>res.body===201,
//     // 'contains"User Registered Successfully"':(response)=>r
//   })
}

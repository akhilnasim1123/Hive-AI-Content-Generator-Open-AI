const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/router/users/register", async (req, res) => {
  const { first_name, last_name,phone_number, email, password } = req.body;
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaammmmmmm')
  console.log(email,first_name,last_name,phone_number,password);
  const body = JSON.stringify({
    first_name,
    last_name,
    phone_number,
    email,
    password,
  });
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',body);
  try {
    const res = await fetch(`/api/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbb')
    const data = await res.json();
    console.log(data)
    return res.status(apiRes.status).json(data);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: "Something went wrong when registering account",
    });
  }
});

module.exports = router;

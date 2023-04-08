const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/api/users/register", async (req, res) => {
  const { first_name, last_name,phone_number, email, password } = req.body;
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaammmmmmm')
  const body = JSON.stringify({
    first_name,
    last_name,
    phone_number,
    email,
    password,
  });
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    const data = await apiRes.json();
    // console.log(data)

    return res.status(apiRes.status).json(data);
  } catch (err) {
    Swal.fire({
      text: err.response.data,
      icon: "error",
    });
    return res.status(500).json({
      error: "Something went wrong when registering account",
    });
  }
});

module.exports = router;

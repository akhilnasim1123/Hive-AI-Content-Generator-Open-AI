const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/router/users/register", async (req, res) => {
  const { first_name, last_name,phone_number, email, password } = req.body;
  const body = JSON.stringify({
    first_name,
    last_name,
    phone_number,
    email,
    password,
  });
  try {
    const apiRes = await fetch(`http://64.227.168.207/api/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
  
    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when registering account",
    });
  }
});

module.exports = router;

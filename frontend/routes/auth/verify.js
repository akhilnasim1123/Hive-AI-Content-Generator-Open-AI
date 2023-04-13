const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get("/api/users/verify", async (req, res) => {
  // console.log('jjsdhfksasfkaskjfhskjfhkjfshkjfhn')
  const { access } = req.cookies;
  // console.log(access)
  const body = JSON.stringify({
    token: access,
  });

  try {
    const apiRes = await fetch(`http://127.0.0.1:8000/api/token/verify/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    // console.log(apiRes)
    const data = await apiRes.json();
    // console.log(data)
    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to verify login status",
    });
  }
});

module.exports = router;

const express = require("express");
const cookie = require("cookie");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/router/users/login", async (req, res) => {

  const { email, password } = req.body;
  console.log(req)

  const body = JSON.stringify({ email, password });

  try {
    // const apiRes = await fetch(`http://192.168.48.111:80/api/token/`, {
      const apiRes = await fetch(`${process.env.API_URL}/api/token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    
    const data = await apiRes.json();
    console.log(data,'adsfasfdasfasddfssssssssssssssssssssssa')
    if (apiRes.status === 200) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("access", data.access, {
          httpOnly: true,
          maxAge: 60 * 30*30,
          path: "/router/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
        cookie.serialize("refresh", data.refresh, {
          httpOnly: true,
          maxAge: 60 * 60 * 30,
          path: "/router/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
      ]);

      return res.status(200).json({success: "Logged in successfully" });
    } else {
      return res.status(apiRes.status).json(data);
    }
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when logging in",
    });
  }
});

module.exports = router;

const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get("/router/users/me", async (req, res) => {
  const { access } = req.cookies;
  console.log(access,'alkdsfjasjflasflaslfsd')

  try {
    const apiRes = await fetch(`http://64.227.168.207/api/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      }
    });

    const data = await apiRes.json();
    console.log(data)
    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to retrieve user",
    });
  }
});

module.exports = router;

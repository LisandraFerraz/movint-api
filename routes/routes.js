const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/register", async (req, resp) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  resp.send(await user.save());
});

module.exports = router;

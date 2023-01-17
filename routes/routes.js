const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", async (req, resp) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  const reqResp = await user.save();

  const { password, ...data } = await reqResp.toJSON();

  resp.send(data);
});

router.post("/login", async (req, resp) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return resp.status(404).send({
      message: "User does not exist or was not found.",
    });
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    return resp.status(400).send({
      message: "Password incorrect.",
    });
  }

  const token = jwt.sign({ _id: user._id }, "secret");

  resp.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  resp.send({
    message: "Login was succesfully made.",
  });
});

router.get("/user", async (req, resp) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return resp.status(401).send({
        message:
          "User is not authenticated. Please complete the authentication first.",
      });
    }

    const user = await User.findOne({ id: claims.id });

    const { password, ...data } = user.toJSON();

    resp.send(data);
  } catch {
    return resp.status(401).send({
      message:
        "User is not authenticated. Please complete the authentication first.",
    });
  }
});

router.post("/logout", (req, resp) => {
  try {
    resp.cookie("jwt", "", { maxAge: 0 });
    resp.send({
      message: "Succesfully logout.",
    });
  } catch {
    resp.send({
      message: "No logged user was found. Please log in first.",
    });
  }
});

module.exports = router;

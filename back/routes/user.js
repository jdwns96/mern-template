const express = require("express");

const { User } = require("../models");

const router = express.Router();

router.get("/user/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const exUser = await User.findOne({ where: { user_id } });

    if (!exUser) {
      return res.status(404).json({
        message: "존재하지 않는 사용자입니다.",
      });
    }

    return res.status(200).json({
      id: exUser.id,
      user_id: exUser.user_id,
      name: exUser.name,
      introduction: exUser.introduction,
      profile_image: exUser.profile_image,
      background_image: exUser.background_image,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

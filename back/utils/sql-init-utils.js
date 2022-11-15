const { User } = require("../models");
const bcrypt = require("bcrypt");

async function sqlInitUtils() {
  try {
    // set default users
    console.log("sql init utils");

    const hash = await bcrypt.hash("123", 12);
    // const hash = "123";

    console.log(hash);
    await User.create({
      user_id: "foo",
      password: hash,
      name: "john doe",
    });
    await User.create({
      user_id: "bar",
      password: hash,
      name: "kane william",
    });

    const user = await User.findOne({ where: { id: 1 } });
    await user.addFollowee(2);
  } catch (e) {
    console.log(e);
  }
}

// router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
//   try {
//     const user = await User.findOne({ where: { id: req.params.userId }});
//     if (!user) {
//       res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
//     }
//     await user.addFollowers(req.user.id);
//     res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

module.exports = sqlInitUtils;

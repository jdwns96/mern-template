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
    await User.create({
      user_id: " baz",
      password: hash,
      name: " park jimin",
    });
    await User.create({
      user_id: " qux",
      password: hash,
      name: " kim taehyung",
    });
    await User.create({
      user_id: " quux",
      password: hash,
      name: " jeon jungkook",
    });
    await User.create({
      user_id: " corge",
      password: hash,
      name: " jeon jeongguk",
    });
    await User.create({
      user_id: " grault",
      password: hash,
      name: " min yoongi",
    });
    await User.create({
      user_id: " garply",
      password: hash,
      name: "  jung hoseok",
    });
    await User.create({
      user_id: " waldo",
      password: hash,
      name: " jeon jeongguk",
    });
    await User.create({
      user_id: "  waldo",
      password: hash,
      name: "  kim namjoon",
    });
    await User.create({
      user_id: " fred",
      password: hash,
      name: " kim seokjin",
    });
    await User.create({
      user_id: " plugh",
      password: hash,
      name: " park jimin",
    });

    const user = await User.findOne({ where: { id: 1 } });
    await user.addFollowee(2);
    await user.addFollowee(3);
    await user.addFollowee(4);
    await user.addFollowee(5);
    await user.addFollowee(6);
    await user.addFollowee(7);
    await user.addFollowee(8);
    await user.addFollowee(9);
    await user.addFollowee(10);
    await user.addFollowee(11);
    await user.addFollowee(12);
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

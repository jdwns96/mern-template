const express = require("express");
const bcrypt = require("bcrypt");

const {
  TOKEN_VERIFY,
  TOKEN_EXPIRED,
  TOKEN_INVALID,
  accessSign,
  accessVerify,
  refreshSign,
  refreshVerify,
} = require("../utils/jwt-util");

const { User } = require("../models");

const router = express.Router();

// @ 로그인, 엑세스 토큰, 리프레시 토큰 발급 후 전달
router.post("/login", async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const exUser = await User.findOne({ where: { user_id } });

    if (!exUser) {
      return res.status(401).json({
        message: "아이디가 존재하지 않습니다.",
      });
    }
    const result = await bcrypt.compare(password, exUser.password);
    if (!result) {
      return res.status(401).json({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    const accessToken = accessSign({
      id: exUser.id,
      user_id: exUser.user_id,
      name: exUser.name,
    });
    const refreshToken = refreshSign();

    // DB user table 에 값 추가
    await User.update(
      { refresh_token: refreshToken },
      { where: { user_id: exUser.user_id } }
    );
    // const userIndex = userTable.findIndex((v, _) => v.id === value.id);
    // userTable[userIndex].refresh_token = refreshToken;

    return res.status(200).json({
      token: {
        accessToken: `bearer ${accessToken}`,
        refreshToken,
      },
      user: {
        id: exUser.id,
        user_id: exUser.user_id,
        name: exUser.name,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

// @ 새로고침 검사 및 로그인 상태 확인
router.get("/login-check", async (req, res) => {
  try {
    // refresh 토큰을 활용해서 access token 재발급을 허용할지 말지 선택한다.
    // 로그인 상태 검증 & 새로고침
    const { refresh } = req.headers;
    console.log(refresh);

    // if there is no refresh value in req.headers
    if (!refresh) {
      return res.status(403).json({
        message: "access denied (login-check)",
      });
    }
    // check refresh-token
    const result = refreshVerify(refresh);

    if (result._status === TOKEN_VERIFY) {
      console.log("_status", TOKEN_VERIFY);

      const exUser = await User.findOne({ where: { refresh_token: refresh } });

      // if there is no refresh_token in db, get logout
      if (!exUser) {
        return res.status(403).json({
          message: "access denied ()",
        });
      }
      // success
      const accessToken = accessSign(exUser);
      return res.status(200).json({
        token: {
          accessToken: `bearer ${accessToken}`,
          refreshToken: refresh,
        },
        user: {
          id: exUser.id,
          user_id: exUser.user_id,
          name: exUser.name,
        },
      });
    }

    // 실패, 기간 만료!! , 리프레시 재발급 혹은 로그아웃
    if (result._status === TOKEN_EXPIRED) {
      const exUser = await User.findOne({ where: { refresh_token: refresh } });
      if (!exUser) {
        return res.status(403).json({
          message: "access denied (DB)",
        });
      }

      const accessToken = accessSign({
        id: exUser.id,
        user_id: exUser.user_id,
        name: exUser.name,
      });
      const refreshToken = refreshSign();

      //DB
      await User.update(
        { refresh_token: refreshToken },
        { where: { user_id: exUser.user_id } }
      );

      return res.status(200).json({
        token: {
          accessToken: `bearer ${accessToken}`,
          refreshToken: refreshToken,
        },
        user: {
          id: exUser.id,
          user_id: exUser.user_id,
          name: exUser.name,
        },
      });
    }
    // 실패, 유효하지 않음, 로그아웃
    if (result._status === TOKEN_INVALID) {
      return res.status(403).json({
        message: "access denied (TOKEN 이 유효하지 않음)",
      });
    }

    return res.status(403).json({
      message: "access denied (Default)",
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", (req, res) => {
  // 그냥 로그인 하세요
});

module.exports = router;

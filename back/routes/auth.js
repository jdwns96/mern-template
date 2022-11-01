const express = require("express");
const bcrypt = require("bcrypt");

const {
  accessSign,
  accessVerify,
  refreshSign,
  refreshVerify,
} = require("../utils/jwt-util");

const userTable = require("../db/user");

const router = express.Router();

const TOKEN_VERIFY = 0; // 로그인 상태
const TOKEN_EXPIRED = 1; // (기간 만료)로그인 상태 하지만 시간이 지나서 재발급이 필요함
const TOKEN_INVALID = 2; // (유효하지 않음)잘못된 토큰이거나 로그인 상태가 아님

// @ 로그인, 엑세스 토큰, 리프레시 토큰 발급 후 전달
router.post("/login", async (req, res) => {
  const { user_id, password } = req.body;

  const value = userTable.find(
    (elem, index) => elem.user_id === user_id && elem.password === password
  );
  if (!value) {
    return res.status(403).json({
      massage: "the ID or password does not correspond.",
    });
  }

  const accessToken = accessSign(value);
  const refreshToken = refreshSign();

  // DB user table 에 값 추가
  const userIndex = userTable.findIndex((v, _) => v.id === value.id);
  userTable[userIndex].refresh_token = refreshToken;

  return res.status(200).json({
    token: {
      accessToken: `bearer ${accessToken}`,
      refreshToken,
    },
    user: {
      id: value.id,
      user_id: value.user_id,
      name: value.name,
    },
  });
});

// @ 새로고침 검사 및 로그인 상태 확인
router.get("/login-check", (req, res) => {
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
    const exUser = userTable.find((v, i) => v.refresh_token === refresh);
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
    const exUser = userTable.find((v, i) => v.refresh_token === refresh);
    if (!exUser) {
      return res.status(403).json({
        message: "access denied (DB)",
      });
    }

    const accessToken = accessSign(exUser);
    const refreshToken = refreshSign();

    //DB
    const userIndex = userTable.findIndex((v, _) => v.id === exUser.id);
    userTable[userIndex].refresh_token = refreshToken;

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
});

router.get("/logout", (req, res) => {
  // 그냥 로그인 하세요
});

module.exports = router;

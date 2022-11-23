import { Button, Input, Paper, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignTemplate from "src/components/layout/templates/SignTemplate";

import cn from "classnames";
import client from "src/libs/axios";
import { useAppDispatch } from "src/store";
import { setAuth } from "src/store/auth";
import toast, { Toaster } from "react-hot-toast";
import { EggAlt, GitHub } from "@mui/icons-material";
import { useSigninMutation } from "src/query/signin";
import { SubmitHandler, useForm } from "react-hook-form";

import singinImages from "src/assets/signin-images";
import Carousel from "react-material-ui-carousel";

type Inputs = { user_id: string; password: string };

export default function SigninPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // prettier-ignore
  const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm<Inputs>();

  // query
  const { isLoading, isSuccess, isError, mutateAsync } = useSigninMutation();

  /*

  const [inputs, setInputs] = useState({
    user_id: "foo",
    password: "123",
  });

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((ps) => {
      return {
        ...ps,
        [name]: value,
      };
    });
  };
  */

  const onSignin: SubmitHandler<Inputs> = async (data) => {
    try {
      const { user_id, password } = data;
      console.log(user_id, password);

      const response = await mutateAsync({ user_id, password });
      console.log(response);

      dispatch(setAuth({ ...response.user })); // store
      client.defaults.headers.authorization = `${response.token.accessToken}`; // access
      localStorage.setItem("refresh", response.token.refreshToken); // refresh
      navigate("/"); // redirect
    } catch (e) {
      console.dir(e);
      toast("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    // set default value in inputs
    setValue("user_id", "foo");
    setValue("password", "123");
  }, []);

  return (
    <main className="w-full h-screen bg-[#fefefe] overflow-hidden">
      <div className="flex h-full">
        <div className="w-full h-full relative hidden lg:flex  flex-col grow ">
          <Carousel className="relative h-full w-full " indicators={false} stopAutoPlayOnHover={false} swipe={false} height={"100%"} interval={7000}>
            {singinImages.map((v) => (
              // @TODO image resize
              <div className="w-full h-full min-h-screen relative ">
                <img className="w-full h-full min-h-screen object-cover" src={v} alt="snack" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="right-component w-full h-full min-h-screen  overflow-auto">
          <div className="px-[5vw] py-[3.5vw] min-h-screen flex flex-col">
            <div className="mb-0 lg:mb-0">
              <div className="py-0 ">
                <div className=" flex items-center">
                  <p className="text-snack-sky">
                    <EggAlt style={{ width: 48, height: 48 }} />
                  </p>
                  <p className="font-extrabold ml-2 text-3xl text-snack-sky">SNACK</p>
                </div>
              </div>
            </div>
            <article className="grow flex justify-center items-center">
              <div className="flex flex-col w-full sm:w-[600px]">
                <div className="px-1 pt-10 pb-12 sm:px-8  w-full ">
                  <header className="mb-12">
                    <h1 className="font-bold text-3xl mb-4">로그인</h1>
                    <div className="m">
                      <div className="flex mb-8 flex-wrap">
                        <p className="text-[12px] mr-2">아이디 혹은 패스워드를 잊어버리셨나요?</p>
                        <p
                          className="text-[12px] cursor-pointer text-snack-sky "
                          onClick={() => {
                            // navigate("/join");
                          }}
                        >
                          아이디 / 비밀번호 찾기
                        </p>
                      </div>
                    </div>
                  </header>
                  <form onSubmit={handleSubmit(onSignin)}>
                    <div className="mb-12">
                      <label htmlFor="user_id" className="text-[0.75rem] text-[#354052] cursor-pointer relative">
                        아이디
                      </label>

                      <div className="flex items-center border-b border-gray-300 py-1 border-solid">
                        <input
                          id="user_id"
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1  leading-tight focus:outline-none"
                          type="text"
                          placeholder="아이디를 입력해주세요."
                          aria-label="Full name"
                          {...register("user_id", { required: true })}
                        />
                      </div>
                      {errors.user_id && <p className="text-red-500 text-[12px] text-left mt-2">아이디를 입력해주세요</p>}
                    </div>
                    <div className="mb-12">
                      <label htmlFor="password" className="text-[0.75rem] text-[#354052] cursor-pointer">
                        비밀번호
                      </label>
                      <div className="flex items-center border-b border-gray-300 py-1 border-solid">
                        <input
                          id="password"
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1  leading-tight focus:outline-none"
                          type="password"
                          placeholder="비밀번호를 입력해주세요."
                          aria-label="Full name"
                          {...register("password", {
                            required: true,
                            // pattern: passwordRegExp,
                          })}
                        />
                        {/* <EEyeIcon /> */}
                      </div>
                      {errors.password && <p className="text-red-500 text-[12px] text-left mt-2">비밀번호를 입력해주세요</p>}
                    </div>
                    <div className="text-[12px] text-[#A0A0A9] cursor-pointer mb-5">
                      {isError && <p className="text-red-500 text-[12px]  my-8 text-center">아이디 또는 비밀번호가 일치하지 않습니다.</p>}
                    </div>
                    <div className="mb-12">
                      <div className="mb-4">
                        <button
                          type="submit"
                          className={cn(
                            "bg-transparent  text-snack-sky font-semibold  py-3 px-4 border border-snack-sky  rounded flex  justify-center w-full",
                            "dark:border-snack-bronze dark:text-snack-bronze",
                            false && "opacity-50 cursor-not-allowed hover:text-snack-sky hover:border-snack-sky",
                          )}
                        >
                          로그인
                        </button>
                      </div>
                      <div className="mb-6">
                        <button
                          type="button"
                          className={cn(
                            "cursor-not-allowed",
                            " bg-snack-sky text-white font-semibold  py-3 px-4 border border-snack-sky  rounded flex  justify-center w-full",
                            false && "opacity-50 cursor-not-allowed hover:text-snack-sky hover:border-snack-sky",
                          )}
                        >
                          회원가입
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </article>
            <footer className=" w-full h-[28px] text-snack-blue flex justify-between">
              <div className="flex items-center">
                <div className="flex items-center  ">
                  <a href="https://github.com/jdwns96" target="_blank" className="cursor-pointer">
                    <GitHub />
                  </a>
                </div>
              </div>
              <div>
                <div className="w-full h-full  flex  justify-center items-center text-xs ">© Copyright 2022 jdwns96. All rights reserved.</div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

// <SignTemplate>
// <section className="flex h-full min-h-screen items-center">
//   <div>asd</div>
//   <div className="mx-auto w-96">
//     <Paper className="p-8">
//       <form action="" onSubmit={onSignin}>
//         <div>
//           <div className="py-0 ">
//             <div className="py-4 px-4 flex justify-center items-center mb-4 bg-snack-blue rounded-md">
//               <p className="text-snack-sky">
//                 <EggAlt style={{ width: 48, height: 48 }} />
//               </p>
//               <p className="font-extrabold ml-2 text-3xl text-snack-sky">SNACK</p>
//             </div>
//           </div>
//         </div>
//         <div className="mb-6">
//           <div className="mb-2">
//             {/* <label htmlFor="" className="block text-gray-500 font-semibold  mb-1  pr-4 mt-3 text-sm">
//               아이디 혹은 이메일
//             </label> */}
//             <input className="snack-input" name="user_id" value={inputs.user_id} onChange={onChangeInputs} placeholder="아이디 혹은 이메일" />
//           </div>
//           <div>
//             {/* <label htmlFor="" className="block text-gray-500 font-semibold  mb-1  pr-4 mt-3 text-sm">
//               비밀번호
//             </label> */}
//             <input className="snack-input" type="password" name="password" value={inputs.password} onChange={onChangeInputs} placeholder="비밀번호" />
//           </div>
//         </div>
//         <div className="flex">
//           <div className="w-full mr-1">
//             {isLoading === true ? (
//               <button className="snack-btn w-full flex justify-center items-center" disabled onClick={onSignin}>
//                 <span>signin</span>
//               </button>
//             ) : (
//               <button className="snack-btn w-full flex justify-center items-center " onClick={onSignin} type="submit">
//                 <span>signin</span>
//               </button>
//             )}
//           </div>
//           <div className="w-full ml-1">
//             <button className="snack-btn  w-full flex justify-center items-center bg-snack-sky text-white" type="button">
//               <span>signup</span>
//             </button>
//           </div>
//         </div>
//       </form>
//     </Paper>
//   </div>
// </section>
// <Toaster position="bottom-center" />
// </SignTemplate>

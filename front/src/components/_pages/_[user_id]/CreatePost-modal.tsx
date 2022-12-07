import { Image } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "src/components/common/modal";

import Editor from "src/components/common/editor";

export default function CreatePostModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qsValue = searchParams.get("modal"); /* ?modal=post */

  const [step, setStep] = useState<"imageStep" | "contentStep">("imageStep");

  const [isToggle, setIsToggle] = useState<boolean>(false);
  const onClose = () => {
    console.log("close evt");
    setStep("imageStep");
    setIsToggle(false);
    searchParams.delete("modal");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (qsValue === "post") {
      setIsToggle(true);
    }
  }, [searchParams]);

  const editorRef = React.createRef();

  return (
    <Modal open={isToggle} onClose={onClose}>
      <div
        className=" w-full max-w-[500px] mx-auto bg-white rounded-md z-50 dark:bg-[#3D3D3D]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {step === "imageStep" && (
          <>
            <header className="p-2 flex justify-center choco-border-b relative w-full whitespace-nowrap">
              <div className="absolute top-0 left-0 translate-y-1/2"></div>
              <div className="w-full px-12">
                <h1 className="font-semibold flex justify-center">이미지 등록</h1>
              </div>
              <div className="absolute top-0 right-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span
                  className="text-choco-sky cursor-pointer text-sm px-3"
                  onClick={() => {
                    setStep("contentStep");
                  }}
                >
                  다음
                </span>
              </div>
            </header>
            <main className="w-full p-4 h-96 flex flex-col justify-center">
              <div className="choco-border border-dashed rounded-lg h-full  ">
                <label htmlFor="file" className="w-full h-full p-2 flex flex-col items-center justify-center cursor-pointer">
                  <div className="flex justify-center mb-4">
                    <span className="text-choco-gold-300">
                      <Image style={{ width: 96, height: 96 }} />
                    </span>
                  </div>
                  <p className="text-xl mb-4">이미지를 등록 해주세요.</p>
                  {/* <button className="choco-btn">사진 등록</button> */}
                  <input id="file" type="file" className="hidden" multiple />
                </label>
              </div>
            </main>
          </>
        )}
        {step === "contentStep" && (
          <>
            <header className="p-2 flex justify-center choco-border-b relative w-full whitespace-nowrap">
              <div className="absolute top-0 left-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span
                  className="text-choco-sky cursor-pointer text-sm px-3 "
                  onClick={() => {
                    setStep("imageStep");
                  }}
                >
                  이전
                </span>
              </div>
              <div className="w-full px-12">
                <h1 className="font-semibold flex justify-center">글 작성</h1>
              </div>
              <div className="absolute top-0 right-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span className="text-choco-sky cursor-pointer text-sm px-3">업로드</span>
              </div>
            </header>
            <main className="w-full choco-border-b">
              <Editor ref={editorRef} />
            </main>
            <footer className="p-1">
              <div className="flex "></div>
            </footer>
          </>
        )}
      </div>
    </Modal>
  );
}

import { Delete, DeleteOutline, Image } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "src/components/common/modal";
import cn from "classnames";

import Editor from "src/components/common/editor";
import useUpdate from "src/hooks/useUpdate";
import { v4 as uuid } from "uuid";

type Images = {
  id: string;
  imageFile: File;
  imageBase64: string;
};

export default function CreatePostModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qsValue = searchParams.get("modal"); /* ?modal=post */

  const [step, setStep] = useState<"imageStep" | "imageListStep" | "contentStep">("imageStep");

  const [isToggle, setIsToggle] = useState<boolean>(false);

  const [images, setImages] = useState<Images[]>([]);
  const [image, setImage] = useState<Images | null>(null);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const length = files.length;

      // length must under 10
      if (length > 10) {
        alert("사진은 10장까지만 등록 가능합니다.");
        return null;
      }

      for (let i = 0; i < length; i++) {
        const file: File = files[i];
        var pattern = /image-*/;
        if (!file.type.match(pattern)) {
          alert("Invalid format");
          continue;
        }
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          setImages((prev) => [...prev, { id: uuid(), imageFile: files[i], imageBase64: reader.result as string }]);
        };
      }
    }
  };

  const onClose = () => {
    if (!window.confirm("작성중이던 포스트가 제거됩니다. 정말 나가시겠습니까?")) return null;

    setIsToggle(false);
    searchParams.delete("modal");
    setSearchParams(searchParams);

    setStep("imageStep");
    setImages([]);
  };

  useUpdate(() => {
    if (images.length === 0) {
      setStep("imageStep");
      return undefined;
    }
    setImage(images[0]);
    setStep("imageListStep");
  }, [images]);

  useEffect(() => {
    if (qsValue === "post") {
      setIsToggle(true);
    } else {
      setIsToggle(false);
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
            <header className="p-2 flex justify-center snack-border-b relative w-full whitespace-nowrap">
              <div className="absolute top-0 left-0 translate-y-1/2"></div>
              <div className="w-full px-12">
                <h1
                  className="font-semibold flex justify-center"
                  onClick={() => {
                    console.log(images);
                  }}
                >
                  이미지 등록
                </h1>
              </div>
              <div className="absolute top-0 right-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span
                  className={cn("text-snack-sky cursor-pointer text-sm px-3", images.length === 0 && "hidden")}
                  onClick={() => {
                    setStep("imageListStep");
                  }}
                >
                  다음
                </span>
              </div>
            </header>
            <main className="w-full p-4 h-96 flex flex-col justify-center">
              <div className="snack-border border-dashed rounded-lg h-full  ">
                <label htmlFor="file" className="w-full h-full p-2 flex flex-col items-center justify-center cursor-pointer">
                  <div className="flex justify-center mb-4">
                    <span className="">
                      <Image style={{ width: 96, height: 96 }} />
                    </span>
                  </div>
                  <p className="text-xl mb-4">이미지를 등록 해주세요.</p>
                  <p className="text-xs text-orange-500">사진은 10장 까지 등록 가능합니다.</p>
                  {/* <button className="snack-btn">사진 등록</button> */}
                  <input id="file" type="file" className="hidden" multiple onChange={onImageUpload} accept="image/*" />
                </label>
              </div>
            </main>
          </>
        )}
        {step === "imageListStep" && (
          <>
            <header className="p-2 flex justify-center snack-border-b relative w-full whitespace-nowrap">
              <div className="absolute top-0 left-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span
                  className="text-snack-sky cursor-pointer text-sm px-3"
                  onClick={() => {
                    setStep("imageStep");
                  }}
                >
                  이전
                </span>
              </div>
              <div className="w-full px-12">
                <h1
                  className="font-semibold flex justify-center"
                  onClick={() => {
                    console.log(images);
                  }}
                >
                  이미지 목록
                </h1>
              </div>
              <div className="absolute top-0 right-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span
                  className="text-snack-sky cursor-pointer text-sm px-3"
                  onClick={() => {
                    setStep("contentStep");
                  }}
                >
                  다음
                </span>
              </div>
            </header>
            <main className="w-full  flex flex-col justify-center snack-border-b">
              <div className="w-full pb-[100%] bg-gray-50 relative">
                <img src={image === null ? "" : image.imageBase64} alt="" className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover" />
                <span
                  className="absolute right-2 top-1 cursor-pointer text-red-500 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  onClick={() => {
                    const returnImages = images.filter((img) => img.id !== image?.id);
                    console.log(returnImages);
                    if (returnImages.length === 0) {
                      setImages([]);
                      setImage(null);
                      return null;
                    }
                    setImages(returnImages);
                    setImage(returnImages[0]);
                  }}
                >
                  <DeleteOutline />
                </span>
              </div>
            </main>
            <ul className="w-full flex bg-black overflow-x-auto">
              {images.length > 1 &&
                images.map((img, index) => (
                  <li
                    key={index}
                    className={cn("relative  bg-gray-50 cursor-pointer")}
                    onClick={() => {
                      setImage(img);
                    }}
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28">
                      <img src={img.imageBase64} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className={cn("absolute top-0 bottom-0 left-0 right-0", images[index].id === image?.id && "border-2 border-solid border-snack-default")}></div>
                  </li>
                ))}
            </ul>
            <nav className="p-1"></nav>
          </>
        )}
        {step === "contentStep" && (
          <>
            <header className="p-2 flex justify-center snack-border-b relative w-full whitespace-nowrap">
              <div className="absolute top-0 left-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span
                  className="text-snack-sky cursor-pointer text-sm px-3 "
                  onClick={() => {
                    setStep("imageListStep");
                  }}
                >
                  이전
                </span>
              </div>
              <div className="w-full px-12">
                <h1 className="font-semibold flex justify-center">글 작성</h1>
              </div>
              <div className="absolute top-0 right-0 translate-y-1/2 bottom-1/2 flex items-center">
                <span className="text-snack-sky cursor-pointer text-sm px-3">업로드</span>
              </div>
            </header>
            <main className="w-full snack-border-b">
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

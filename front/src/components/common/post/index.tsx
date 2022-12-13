import React, { useEffect, useState } from "react";
import Modal from "src/components/common/modal";
import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import Carousel from "src/components/common/carousel";

import img from "src/assets/images/image-test.jpg";
import { IconButton } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

interface PostProps {}

export default function PostModal(props: PostProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const qsValue = searchParams.get("post"); /* ?post=1 */

  const [isToggle, setIsToggle] = useState<boolean>(false);

  // react query 로 값을 가져와야함

  const onClose = () => {
    setIsToggle(false);
    searchParams.delete("post");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (qsValue) {
      setIsToggle(true);
    } else {
      setIsToggle(false);
    }
  }, [searchParams]);

  return (
    <Modal open={isToggle} onClose={onClose}>
      <div
        className=" w-full max-w-[1024px] mx-auto bg-white rounded-md z-50 dark:bg-[#3D3D3D] overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full h-full flex">
          <div className=" bg-red-50 grow-[3] shrink-0">
            <Carousel images={[img, img]} />
          </div>
          <div className="grow-[2] ">
            <header className="">
              <div className="w-full h-full flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full snack-border"></div>
                  <div className="ml-3 text-md font-semibold">
                    <p>아이디</p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="text-snack-bronze-300 dark:text-snack-text-dark">
                      <IconButton style={{ color: "inherit" }}>
                        <MoreHoriz />
                      </IconButton>
                    </span>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
    </Modal>
  );
}

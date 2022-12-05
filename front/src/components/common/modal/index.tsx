import React, { useEffect } from "react";
import cn from "classnames";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const { children, open, onClose } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // @TODO modal 처리 미흡
  return (
    <div
      className={cn("fixed w-screen h-screen top-0 left-0 right-0 bottom-0 z-30 bg-black bg-opacity-50 flex flex-col justify-center items-center overflow-hidden", open === false && "hidden")}
      onClick={onClose}
    >
      <div
        className="z-50 overflow-y-auto w-full "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="p-2 ">{children}</div>
      </div>
    </div>
  );
}

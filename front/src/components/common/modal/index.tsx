import React from "react";
import cn from "classnames";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const { children, open, onClose } = props;

  return (
    <div className={cn("fixed w-screen h-screen top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex flex-col justify-center items-center", open === false && "hidden")} onClick={onClose}>
      <div
        className="bg-white overflow-y-auto rounded-lg z-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

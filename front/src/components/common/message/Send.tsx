import React from "react";

interface Props {
  value:
    | {
        id: string;
        text: string;
      }
    | any;
}

export default function Send(props: Props) {
  const { id, text } = props.value;

  return (
    <div className="w-full mb-2">
      <div className="pl-16 md:pl-32 flex justify-end">
        <div className="p-2 px-4 choco-border rounded-md">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

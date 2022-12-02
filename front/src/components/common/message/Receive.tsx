import React from "react";

interface Props {
  value:
    | {
        id: string;
        text: string;
        image?: string | null;
      }
    | any;
}

export default function Receive(props: Props) {
  const { id, text, image } = props.value;

  return (
    <div className="w-full mb-2">
      <div className="pr-16 md:pr-36 flex justify-start">
        {image ? (
          <div className="flex items-end shrink">
            <div className="w-10 h-10 choco-border rounded-full overflow-hidden">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <div className="w-10 shrink-0"></div>
        )}

        <div className="ml-4 p-2 px-4 choco-border rounded-md">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

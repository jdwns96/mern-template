import React from "react";

interface Props {
  time: Date;
}

export default function TimeLine(props: Props) {
  return (
    <div className="my-2">
      <div className="p-2 flex justify-center items-center">
        <p className="text-xs ">2021년 5월 8일 오후 3:33</p>
      </div>
    </div>
  );
}

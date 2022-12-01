import { useState } from "react";

interface Props {
  text: string;
}

export default function MoreContent({ text }: Props) {
  const [isMore, setIsMore] = useState(false);

  if (isMore === false) {
    return (
      <span>
        <span>{text.slice(0, 100)}</span>
        <span className="text-sm cursor-pointer ml-1 whitespace-nowrap text-choco-sky" onClick={() => setIsMore(true)}>
          ...더보기
        </span>
      </span>
    );
  }

  return <span>{text}</span>;
}

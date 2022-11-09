import React from "react";

interface AppProps {
  children: React.ReactNode;
}
export default function SignTemplate({ children }: AppProps) {
  return (
    <>
      <div className="w-full h-full min-h-screen">
        <div className="w-full h-full min-h-screen">{children}</div>
      </div>
    </>
  );
}

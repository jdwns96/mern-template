import React from "react";
import AppBottomNav from "../bottom-nav/AppBottomNav";
import AppHeader from "../headers/AppHeader";

interface AppProps {
  children: React.ReactNode;
}
export default function AppTemplate({ children }: AppProps) {
  return (
    <>
      <div className="w-full h-screen">
        <AppHeader />
        <div className="pt-12 pb-14 md:pb-0 h-full">{children}</div>
        <AppBottomNav />
      </div>
    </>
  );
}

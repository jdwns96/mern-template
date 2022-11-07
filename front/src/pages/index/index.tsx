import AppFooter from "src/components/layout/footers/AppFooter";
import AppHeader from "src/components/layout/headers/AppHeader";
import { useAppDispatch, useAppSelector } from "src/store";

export default function Home() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  return (
    <div className="w-full h-screen">
      <AppHeader />
      <div>HOME</div>
      <ul>
        <li>{id ?? "null"}</li>
        <li>{user_id ?? "null"}</li>
        <li>{name ?? "null"}</li>
      </ul>
      {/* <AppFooter /> */}
    </div>
  );
}

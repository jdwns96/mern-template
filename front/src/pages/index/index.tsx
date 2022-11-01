import { useAppDispatch, useAppSelector } from "src/store";

export default function Home() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  return (
    <div>
      <div>HOME</div>
      <ul>
        <li>{id ?? "null"}</li>
        <li>{user_id ?? "null"}</li>
        <li>{name ?? "null"}</li>
      </ul>
    </div>
  );
}

import AppFooter from "src/components/layout/footers/AppFooter";
import AppHeader from "src/components/layout/headers/AppHeader";
import { useAppDispatch, useAppSelector } from "src/store";

import AppTemplate from "src/components/layout/templates/AppTemplate";

export default function Home() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  return (
    <AppTemplate>
      <section className="w-full h-full">
        <section className="w-full h-full max-w-2xl mx-auto px-3">
          <main>
            <div>HOME</div>
            <ul>
              <li>{id ?? "null"}</li>
              <li>{user_id ?? "null"}</li>
              <li>{name ?? "null"}</li>
            </ul>
          </main>
        </section>
      </section>
    </AppTemplate>
  );
}

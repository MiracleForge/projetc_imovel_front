import { auth } from "@/auth";
import Navbar from "@/src/components/layouts/headers/Navbar";
import Provider from "../../context/client-provider";

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <>
      <Navbar user={session?.user} />
      <Provider session={session}>
        {children}
      </Provider>
    </>
  );
}

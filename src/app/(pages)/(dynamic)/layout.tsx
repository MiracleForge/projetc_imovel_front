import Footer from "@/src/components/layouts/footer/Footer.layout";
import Navbar from "@/src/components/layouts/headers/Navbar";
import Provider from "@/src/components/contexts/providers/client-provider.context";
import TopPromotion from "@/src/components/layouts/banners/TopPromotional.layout";
import { getCurrentUser } from "@/src/dal/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

  return (
    <>
      <TopPromotion />
      <Navbar user={session?.user} />
      <Provider session={session}>
        <div className="px-2 md:px-6">{children}</div>
      </Provider>
      <Footer />
    </>
  );
}

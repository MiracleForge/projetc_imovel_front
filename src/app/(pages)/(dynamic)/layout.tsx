import { auth } from "@/auth";
import Navbar from "@/src/components/layouts/headers/Navbar";
import Provider from "../../context/client-provider";
import TopPromotion from "@/src/components/layouts/banners/TopPromotional.layout";
import Footer from "@/src/components/layouts/footer/Footer.layout";

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <>
      <TopPromotion />
      <Navbar user={session?.user} />
      <Provider session={session}>
        <div className="md:px-6 lg:px-12">
          {children}
        </div>
      </Provider>
      <Footer />
    </>
  );
}

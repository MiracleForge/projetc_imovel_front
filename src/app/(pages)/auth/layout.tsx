import { CartedLayout } from "@/src/components/wrappers/CartedLayout.wrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <CartedLayout
    title="Entre na Imobly"
    subtitle="Segurança, velocidade e as melhores oportunidades em um só lugar."
    bgGradientFrom="from-primary-blue"
    bgGradientTo="to-secundary-blue"
  >
    {children}
  </CartedLayout>
}

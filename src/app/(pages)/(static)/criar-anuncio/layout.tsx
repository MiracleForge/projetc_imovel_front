import PreviewButton from "@/src/components/ui/buttons/PreviewButton.ui";
import { CartedLayout } from "@/src/components/wrappers/CartedLayout.wrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <CartedLayout
    title="Publique na Imobily"
    subtitle="Faça parte da maior da comunidade"
    bgGradientFrom="from-primary-blue"
    bgGradientTo="to-secundary-blue"
  >
    {children}
    <PreviewButton />
  </CartedLayout>
}

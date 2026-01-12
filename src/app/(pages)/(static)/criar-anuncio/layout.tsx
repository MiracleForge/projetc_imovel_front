import PreviewButton from "@/src/components/ui/buttons/PreviewButton.ui";
import { BlueLayout } from "@/src/components/wrappers/BlueBackground.layout.wrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <BlueLayout
    title="Publique na Imobily"
    subtitle="Faça parte da maior da comunidade"
    bgGradientFrom="from-primary-blue"
    bgGradientTo="to-secundary-blue"
  >
    {children}
    <PreviewButton />
  </BlueLayout>
}

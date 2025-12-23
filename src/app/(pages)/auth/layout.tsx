import "../../globals.css";
import { BlueLayout } from "@/src/components/wrappers/BlueBackground.layout.wrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <BlueLayout
    title="Entre na Imobly"
    subtitle="Segurança, velocidade e as melhores oportunidades em um só lugar."
    bgGradientFrom="from-primary-blue"
    bgGradientTo="to-secundary-blue"
  >
    {children}
  </BlueLayout>
}

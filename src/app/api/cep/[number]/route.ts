import { NextRequest, NextResponse } from "next/server";
import { cepServerSchema } from "@/src/contracts/DTOs/advertisement/cep.validation";
import { ViaCepResponse } from "@/src/contracts/DTOs/localization/localizationCep.response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  // No Next.js 15, precisamos dar await no params
  const { number } = await params;

  // 1. Validação e limpeza
  const cleanCep = number.replace(/\D/g, "");
  const validatedCep = cepServerSchema.safeParse(cleanCep);

  if (!validatedCep.success) {
    return NextResponse.json(
      { success: false, error: "CEP inválido" },
      { status: 400 }
    );
  }

  try {
    console.log("-----------------------------------------");
    console.log("🔍 Processando CEP:", cleanCep);

    // 2. FETCH NATIVO (Essencial para o cache funcionar no Next.js)
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
      method: "GET",
      next: { revalidate: 2592000 }, // 30 dias no Data Cache do servidor
    });

    if (!response.ok) {
      throw new Error("Falha na rede ou ViaCEP indisponível");
    }

    const data: ViaCepResponse = await response.json();

    if ("erro" in data && data.erro === "true") {
      console.log("❌ CEP não encontrado na base do ViaCEP");
      return NextResponse.json(
        { success: false, error: "CEP não encontrado" },
        { status: 404 }
      );
    }

    console.log("✅ Sucesso ao obter dados do CEP");

    // 3. Resposta com Cache de Navegador (Browser Cache)
    return NextResponse.json(
      { success: true, data },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=2592000, stale-while-revalidate=86400",
        },
      }
    );

  } catch (error) {
    console.error("❌ Erro interno na API de CEP:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

// app/api/cep/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cepServerSchema } from "@/src/contracts/DTOs/advertisement/cep.validation";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const cep = url.searchParams.get("cep");

  if (!cep) return NextResponse.json({ success: false, error: "CEP obrigatório" }, { status: 400 });

  const cleanCep = cep.replace(/\D/g, '');
  const validatedCep = cepServerSchema.safeParse(cleanCep);

  if (!validatedCep.success) {
    return NextResponse.json({ success: false, error: "CEP inválido" }, { status: 400 });
  }

  try {
    // ESTE É O PONTO CHAVE:
    // Ao usar o fetch nativo com 'next: { revalidate }', o Next.js salva o JSON 
    // em uma pasta chamada '.next/cache'. Nas próximas vezes, ele lê do arquivo
    // e NÃO vai na internet (não gasta o ViaCEP).
    const response = await fetch(`https://viacep.com.br/ws/${validatedCep.data}/json/`, {
      method: "GET",
      next: {
        revalidate: 2592000, // 30 dias em segundos
        tags: ['cep-cache']
      }
    });

    const data = await response.json();

    if (data.erro === 'true') {
      return NextResponse.json({ success: false, error: "CEP não encontrado" }, { status: 404 });
    }

    // Retorno simples para o seu componente
    return NextResponse.json({ success: true, data });

  } catch (err) {
    return NextResponse.json({ success: false, error: "Erro ao buscar CEP" }, { status: 500 });
  }
}

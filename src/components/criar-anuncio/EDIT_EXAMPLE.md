# Exemplo de Implementação - Edição de Anúncios

Este documento fornece um exemplo completo de como implementar a funcionalidade de edição de anúncios existentes usando rotas dinâmicas.

## 📁 Estrutura de Arquivos para Edição

```
client/src/app/(pages)/(static)/criar-anuncio/
├── categoria/
│   ├── page.tsx                    # Criar novo
│   └── [id]/
│       └── page.tsx                # Editar existente
├── informacoes/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── localizacao/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── detalhes/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── caracteristicas/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
└── revisao/
    ├── page.tsx
    └── [id]/
        └── page.tsx
```

## 🔧 1. Criar Server Action para Buscar Anúncio

```typescript
// src/app/actions/adversetiment.actions.ts

export async function getAdversetimentByIdAction(
  id: string
): Promise<actionResponse<adversetimentEntityDTO>> {
  try {
    const path = `public-get-adversetiment/${id}`;
    const fetchAdversetiment = createPrivateFecher<null, adversetimentEntityDTO>(
      path,
      { method: "GET" }
    );

    const result = await fetchAdversetiment(null);

    if (result.error) {
      return result;
    }

    return {
      message: "Anúncio carregado com sucesso",
      data: result.data,
    };
  } catch (error) {
    return {
      message: "Erro ao carregar anúncio",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function updateAdversetimentAction(
  id: string,
  _prevState: actionResponse,
  formData: FormData
): Promise<actionResponse<undefined>> {
  // Similar ao createAdversetimentAction, mas usando PUT
  const rawData = formDataToObject(formData);
  const nestedData = unflatten(rawData);
  const payloadValidated = adversetimentCreateSchema.safeParse(nestedData);

  if (!payloadValidated.success) {
    return payloadValidated.error;
  }

  const path = `public-update-adversetiment/${id}`;
  const fetchAdversetiment = createPrivateFecher<adversetimentCreateDTO, undefined>(
    path,
    { method: "PUT" }
  );

  const result = await fetchAdversetiment(payloadValidated.data);

  if (result.error) {
    return result;
  }

  redirect(`/anuncio/${id}`);
}
```

## 🎯 2. Criar Componente para Inicializar Store

```typescript
// src/components/criar-anuncio/InitializeStore.tsx
"use client";

import { useEffect } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { adversetimentEntityDTO } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";

interface InitializeStoreProps {
  data: adversetimentEntityDTO;
  children: React.ReactNode;
}

export function InitializeStore({ data, children }: InitializeStoreProps) {
  const { setFormData } = useAdvertisementFormStore();

  useEffect(() => {
    // Converter dados da entidade para o formato do formulário
    setFormData({
      category: data.category,
      title: data.title,
      subTitle: data.subTitle,
      description: data.description,
      price: data.price,
      transactionMode: data.transactionMode,
      phone: data.phone,
      whatsapp: data.whatsapp,
      imagesFiles: [], // Arquivos não podem ser reconstruídos
      options: data.options,
      address: data.address,
    });
  }, [data, setFormData]);

  return <>{children}</>;
}
```

## 📄 3. Exemplo de Página de Edição

```typescript
// src/app/(pages)/(static)/criar-anuncio/categoria/[id]/page.tsx
import { CategoryStep } from "@/src/components/criar-anuncio/CategoryStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import { InitializeStore } from "@/src/components/criar-anuncio/InitializeStore";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import { getAdversetimentByIdAction } from "@/src/app/actions/adversetiment.actions";
import { redirect } from "next/navigation";

interface EditCategoriaPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoriaPage({ params }: EditCategoriaPageProps) {
  const { id } = await params;
  
  // Buscar dados do anúncio
  const result = await getAdversetimentByIdAction(id);

  if (result.error || !result.data) {
    redirect("/criar-anuncio/categoria");
  }

  return (
    <InitializeStore data={result.data}>
      <div className="space-y-3">
        <MultiStepIndicator totalSteps={6} currentStep={0} />

        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            ✏️ Editando anúncio: <strong>{result.data.title}</strong>
          </p>
        </div>

        <Form
          currentStep={0}
          totalSteps={6}
          nextRoute={`/criar-anuncio/informacoes/${id}`}
        >
          <CategoryStep />
        </Form>
      </div>
    </InitializeStore>
  );
}
```

## 🔄 4. Atualizar Página de Revisão para Suportar Edição

```typescript
// src/app/(pages)/(static)/criar-anuncio/revisao/[id]/page.tsx
import { SubmitPage } from "../SubmitPage";
import { updateAdversetimentAction, getAdversetimentByIdAction } from "@/src/app/actions/adversetiment.actions";
import { InitializeStore } from "@/src/components/criar-anuncio/InitializeStore";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";
import { redirect } from "next/navigation";

interface EditRevisaoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRevisaoPage({ params }: EditRevisaoPageProps) {
  const { id } = await params;
  
  const result = await getAdversetimentByIdAction(id);

  if (result.error || !result.data) {
    redirect("/criar-anuncio/revisao");
  }

  // Criar action parcialmente aplicada com o ID
  const updateAction = updateAdversetimentAction.bind(null, id);

  return (
    <InitializeStore data={result.data}>
      <div className="space-y-3">
        <MultiStepIndicator totalSteps={6} currentStep={5} />
        
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            ⚠️ Você está editando um anúncio existente. As alterações substituirão os dados atuais.
          </p>
        </div>

        <SubmitPage submitAction={updateAction} isEdit={true} />
      </div>
    </InitializeStore>
  );
}
```

## 🎨 5. Atualizar SubmitPage para Modo Edição

```typescript
// src/app/(pages)/(static)/criar-anuncio/revisao/SubmitPage.tsx
interface SubmitPageProps {
  submitAction: (prevState: actionResponse, formData: FormData) => Promise<actionResponse<undefined>>;
  isEdit?: boolean; // Nova prop
}

export function SubmitPage({ submitAction, isEdit = false }: SubmitPageProps) {
  // ... código existente ...

  return (
    <div>
      <form ref={formRef} action={formAction}>
        <ReviewStep />

        {/* Avisos específicos para edição */}
        {isEdit && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              📸 <strong>Nota:</strong> As imagens antigas serão substituídas pelas novas.
              Se não adicionar novas imagens, as antigas serão mantidas.
            </p>
          </div>
        )}

        {state.error && (
          <ul className="text-red-500 text-sm pt-0.5 list-disc list-inside mt-4">
            {state.message?.split("\n").map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/criar-anuncio/caracteristicas")}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={pending}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {pending ? "Enviando..." : isEdit ? "Atualizar Anúncio" : "Publicar Anúncio"}
          </button>
        </div>
      </form>
    </div>
  );
}
```

## 🔗 6. Link para Edição

```typescript
// Em qualquer componente que liste anúncios
import Link from "next/link";

export function AnuncioCard({ anuncio }) {
  return (
    <div className="border rounded-lg p-4">
      <h3>{anuncio.title}</h3>
      <p>{anuncio.price}</p>
      
      <div className="flex gap-2 mt-4">
        <Link href={`/anuncio/${anuncio.id}`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Ver Detalhes
          </button>
        </Link>
        
        <Link href={`/criar-anuncio/categoria/${anuncio.id}`}>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded">
            ✏️ Editar
          </button>
        </Link>
      </div>
    </div>
  );
}
```

## 🛡️ 7. Proteger Rotas de Edição

```typescript
// middleware.ts ou na própria página
export async function EditProtection({ id, userId }: { id: string; userId: string }) {
  const advertisement = await getAdversetimentByIdAction(id);
  
  if (!advertisement.data) {
    redirect("/criar-anuncio");
  }
  
  // Verificar se o usuário é o dono do anúncio
  if (advertisement.data.advertiser_id !== userId) {
    redirect("/acesso-negado");
  }
  
  return advertisement.data;
}

// Uso na página
export default async function EditPage({ params }: EditPageProps) {
  const session = await auth();
  const { id } = await params;
  
  const advertisement = await EditProtection({
    id,
    userId: session?.user?.id || "",
  });
  
  // ... resto do código
}
```

## 📊 8. Adicionar Campo ID ao Store (Opcional)

```typescript
// src/store/advertisement-form.store.ts
interface AdvertisementFormState {
  formData: adversetimentCreateDTO;
  currentStep: number;
  editMode: boolean;        // Novo
  advertisementId: string | null; // Novo
  // ... resto
  
  setEditMode: (isEdit: boolean, id?: string) => void; // Novo
}

export const useAdvertisementFormStore = create<AdvertisementFormState>()(
  persist(
    (set) => ({
      // ... estado existente
      editMode: false,
      advertisementId: null,
      
      setEditMode: (isEdit, id) =>
        set({
          editMode: isEdit,
          advertisementId: id || null,
        }),
      
      // Atualizar resetForm
      resetForm: () =>
        set({
          formData: getDefaultFormData(),
          currentStep: 0,
          editMode: false,
          advertisementId: null,
        }),
    }),
    {
      name: "advertisement-form-storage",
      partialize: (state) => ({
        formData: state.formData,
        editMode: state.editMode,
        advertisementId: state.advertisementId,
      }),
    }
  )
);
```

## 🧪 9. Testar Funcionalidade de Edição

```bash
# 1. Criar um novo anúncio
# Navegue para /criar-anuncio e complete o formulário

# 2. Obter ID do anúncio criado
# Após criação, copie o ID da URL ou do banco de dados

# 3. Acessar rota de edição
http://localhost:3000/criar-anuncio/categoria/[ID_DO_ANUNCIO]

# 4. Verificar se os dados foram carregados corretamente
# Todos os campos devem estar preenchidos com os dados existentes

# 5. Fazer alterações e salvar
# Verificar se as alterações foram aplicadas
```

## ✅ Checklist de Implementação

- [ ] Criar server action `getAdversetimentByIdAction`
- [ ] Criar server action `updateAdversetimentAction`
- [ ] Implementar componente `InitializeStore`
- [ ] Criar páginas `[id]/page.tsx` para cada step
- [ ] Adicionar suporte a `isEdit` no `SubmitPage`
- [ ] Implementar proteção de rotas (verificar ownership)
- [ ] Atualizar navegação para incluir ID nas URLs
- [ ] Adicionar indicador visual de modo de edição
- [ ] Testar fluxo completo de edição
- [ ] Adicionar tratamento de erros específico
- [ ] Implementar loading states durante carregamento de dados
- [ ] Adicionar confirmação antes de sair durante edição

## 🎯 Benefícios da Implementação

✅ **Reutilização de código** - Mesmos componentes para criar e editar  
✅ **Separação de rotas** - `/criar-anuncio/step` vs `/criar-anuncio/step/[id]`  
✅ **State management consistente** - Mesmo store para ambos os modos  
✅ **UX melhorada** - Usuário vê claramente se está criando ou editando  
✅ **Type-safe** - TypeScript garante consistência dos dados  

## 📝 Notas Importantes

- O modo de edição não pode reconstruir objetos `File` das imagens existentes
- Considere mostrar preview das imagens existentes usando URLs
- Implemente validação de ownership antes de permitir edição
- Use optimistic updates para melhor UX
- Considere adicionar histórico de alterações (audit log)
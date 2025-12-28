# Multi-Step Form - Criar Anúncio

Esta documentação descreve a estrutura refatorada do formulário de criação de anúncios, que agora utiliza navegação baseada em rotas e gerenciamento de estado com Zustand.

## 📁 Estrutura de Arquivos

```
client/src/
├── store/
│   └── advertisement-form.store.ts          # Zustand store para gerenciar dados do formulário
├── components/
│   └── criar-anuncio/
│       ├── Form.tsx                          # Componente wrapper reutilizável
│       ├── CategoryStep.tsx                  # Step 1: Categoria e opções
│       ├── InformationStep.tsx               # Step 2: Informações básicas
│       ├── LocationStep.tsx                  # Step 3: Localização
│       ├── DetailsStep.tsx                   # Step 4: Detalhes da transação
│       ├── CharacteristicsStep.tsx           # Step 5: Características do imóvel
│       ├── ReviewStep.tsx                    # Step 6: Revisão e imagens
│       ├── README.md                         # Documentação completa
│       ├── QUICK_START.md                    # Guia rápido
│       └── EDIT_EXAMPLE.md                   # Exemplo de edição
└── app/(pages)/(static)/criar-anuncio/
    ├── page.tsx                              # Redireciona para /categoria
    ├── categoria/page.tsx                    # Rota do step 1
    ├── informacoes/page.tsx                  # Rota do step 2
    ├── localizacao/page.tsx                  # Rota do step 3
    ├── detalhes/page.tsx                     # Rota do step 4
    ├── caracteristicas/page.tsx              # Rota do step 5
    └── revisao/
        ├── page.tsx                          # Rota do step 6 (Server Component)
        └── SubmitPage.tsx                    # Client Component com form submission
```

## 🔄 Fluxo de Navegação

1. **`/criar-anuncio`** → Redireciona automaticamente para `/criar-anuncio/categoria`
2. **`/criar-anuncio/categoria`** → Categoria, modalidade, amenities e condomínio
3. **`/criar-anuncio/informacoes`** → Título, subtítulo e descrição
4. **`/criar-anuncio/localizacao`** → Endereço completo
5. **`/criar-anuncio/detalhes`** → Preço e contatos
6. **`/criar-anuncio/caracteristicas`** → Métricas do imóvel
7. **`/criar-anuncio/revisao`** → Revisão, upload de imagens e envio

## 🗄️ Gerenciamento de Estado

### Zustand Store (`advertisement-form.store.ts`)

O store persiste os dados do formulário usando `localStorage` através do middleware `persist`.

#### Estado:
```typescript
{
  formData: adversetimentCreateDTO,  // Dados do formulário
  currentStep: number,                // Step atual (0-5)
}
```

#### Métodos:
- `setFormData(data)` - Atualiza múltiplos campos
- `setCurrentStep(step)` - Define o step atual
- `resetForm()` - Reseta o formulário
- `updateField(field, value)` - Atualiza um campo específico (suporta nested fields)
- `setCategory(category)` - Define a categoria

#### Exemplo de uso:
```tsx
const { formData, updateField } = useAdvertisementFormStore();

// Atualizar campo simples
updateField("title", "Meu Anúncio");

// Atualizar campo nested
updateField("address.city", "São Paulo");
updateField("options.propertyMetrics.area", 100);
```

## 🧩 Componentes

### Form (Componente Wrapper)

Componente reutilizável que envolve cada step e gerencia navegação.

**Props:**
- `children` - Conteúdo do step
- `onNext` - Callback antes de ir para o próximo step (validação)
- `onPrev` - Callback antes de voltar
- `currentStep` - Índice do step atual
- `totalSteps` - Total de steps
- `nextRoute` - Rota para o próximo step
- `prevRoute` - Rota para o step anterior

**Exemplo:**
```tsx
<Form
  currentStep={0}
  totalSteps={6}
  nextRoute="/criar-anuncio/informacoes"
>
  <CategoryStep />
</Form>
```

### Steps (Client Components)

Cada step é um componente client-side independente que:
- Consome dados do Zustand store
- Atualiza o store em tempo real
- Mantém a estilização original intocada

**Exemplo de um step:**
```tsx
export function InformationStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleInputChange = (e) => {
    updateField(e.target.name, e.target.value);
  };

  return (
    <div>
      <h2>Informações Básicas</h2>
      <CommumInput
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
    </div>
  );
}
```

## 📤 Submissão do Formulário

A submissão acontece no último step (`/revisao`):

1. **`page.tsx`** (Server Component) - Importa a server action
2. **`SubmitPage.tsx`** (Client Component) - Gerencia o form e useActionState
3. Os dados do Zustand store são convertidos para `FormData`
4. A server action `createAdversetimentAction` é chamada
5. Em caso de sucesso, o store é resetado e o usuário é redirecionado

```tsx
// revisao/page.tsx (Server Component)
export default function RevisaoPage() {
  return (
    <SubmitPage submitAction={createAdversetimentAction} />
  );
}

// revisao/SubmitPage.tsx (Client Component)
export function SubmitPage({ submitAction }) {
  const { formData } = useAdvertisementFormStore();
  const [state, formAction, pending] = useActionState(submitAction, initialState);
  // ... converte formData para FormData e submete
}
```

## ✅ Validação com Zod

A validação acontece em dois momentos:

1. **Client-side (opcional)** - Pode ser implementada usando os schemas existentes
2. **Server-side (obrigatória)** - Validação completa na action

### Schemas Zod Existentes

Todos os schemas Zod já estão definidos em:
- `src/contracts/DTOs/advertisement/advertisement.entity.dto.ts` - Schema completo da entidade
- `src/contracts/DTOs/advertisement/advertisement.create.dto.ts` - Schema para criação

```typescript
import { adversetimentCreateSchema } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";
import { adversetizeCategorySchema } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";
```

### Validação Client-Side (Opcional)

Você pode adicionar validação antes de avançar entre steps:

```typescript
"use client";

import { useState } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { adversetizeCategorySchema } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";

export default function CategoriaPage() {
  const { formData } = useAdvertisementFormStore();
  const [error, setError] = useState("");

  const handleNext = () => {
    // Validação customizada
    if (!formData.category) {
      setError("Por favor, selecione uma categoria");
      return false; // Impede navegação
    }

    setError("");
    return true; // Permite navegação
  };

  return (
    <Form onNext={handleNext}>
      <CategoryStep />
      {error && <div className="text-red-500">{error}</div>}
    </Form>
  );
}
```

### Validação Server-Side

```typescript
// Na server action
const payloadValidated = adversetimentCreateSchema.safeParse(nestedData);

if (!payloadValidated.success) {
  return payloadValidated.error;
}
```

## 🎨 Estilização

Toda a estilização original foi **mantida intocada**:
- Classes Tailwind preservadas
- Estrutura HTML mantida
- Componentes UI reutilizados (CommumInput, CheckMarkCategorys, etc.)

## 🔮 Recursos Futuros

### Suporte para Edição com `[...id]`

Para adicionar suporte a edição de anúncios existentes:

1. Criar rotas dinâmicas: `/criar-anuncio/categoria/[id]`, etc.
2. No carregamento da página, buscar dados do anúncio
3. Popular o store com `setFormData(advertisementData)`
4. Modificar a action para aceitar ID e fazer PUT ao invés de POST

**Exemplo:**
```tsx
// categoria/[id]/page.tsx
export default async function EditCategoriaPage({ params }) {
  const { id } = await params;
  const advertisement = await getAdvertisementById(id);
  
  return (
    <InitializeStore data={advertisement}>
      <CategoryStep />
    </InitializeStore>
  );
}
```

## 🚀 Vantagens da Nova Arquitetura

✅ **Separação de responsabilidades** - Cada step é independente  
✅ **Navegação baseada em rotas** - URL reflete o estado atual  
✅ **State persistente** - Dados salvos automaticamente no localStorage  
✅ **Código reutilizável** - Componente Form genérico  
✅ **Server Actions** - Submissão segura server-side  
✅ **Fácil manutenção** - Estrutura organizada e escalável  
✅ **SEO friendly** - Cada step tem sua própria URL  
✅ **Validação robusta** - Zod no servidor  

## 🧪 Testes e Desenvolvimento

### Testar formulário localmente

```bash
cd client
npm run dev
```

Acesse: `http://localhost:3000/criar-anuncio`

### Limpar dados persistidos

Para resetar o formulário durante desenvolvimento:

```javascript
// No console do navegador
localStorage.removeItem('advertisement-form-storage')
```

Ou use o método do store:

```typescript
const { resetForm } = useAdvertisementFormStore();
resetForm();
```

## 📝 Notas Importantes

- O componente `MultiStepIndicator` continua funcionando normalmente
- Todos os componentes UI originais foram preservados
- O store persiste apenas `formData`, não o `currentStep`
- A navegação entre steps é controlada pelas rotas do Next.js
- Arquivos temporários são mantidos no store até a submissão
- A validação client-side é opcional, use os schemas existentes em `contracts/DTOs`
- Use `onNext` no componente Form para adicionar validação customizada antes de navegar
- Os schemas Zod completos já existem no projeto, não precisa criar novos
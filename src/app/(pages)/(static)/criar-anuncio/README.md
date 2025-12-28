# 🏠 Criar Anúncio - Multi-Step Form

Sistema de criação de anúncios imobiliários com formulário multi-step baseado em rotas Next.js.

## 📋 Visão Geral

Este diretório contém um formulário de criação de anúncios dividido em 6 etapas (steps), cada uma com sua própria rota. Os dados são gerenciados globalmente com Zustand e persistidos automaticamente no localStorage.

## 🗺️ Rotas Disponíveis

| Rota | Descrição | Componente |
|------|-----------|------------|
| `/criar-anuncio` | Redireciona para `/categoria` | - |
| `/criar-anuncio/categoria` | Categoria, modalidade e opções | `CategoryStep` |
| `/criar-anuncio/informacoes` | Título, subtítulo e descrição | `InformationStep` |
| `/criar-anuncio/localizacao` | Endereço completo | `LocationStep` |
| `/criar-anuncio/detalhes` | Preço e contatos | `DetailsStep` |
| `/criar-anuncio/caracteristicas` | Métricas do imóvel | `CharacteristicsStep` |
| `/criar-anuncio/revisao` | Revisão, imagens e envio | `ReviewStep` |

## 🚀 Início Rápido

```typescript
// Link para criar novo anúncio
<Link href="/criar-anuncio">
  <button>Criar Anúncio</button>
</Link>
```

## 📦 Estrutura de Dados

```typescript
interface FormData {
  category: "apartamentos" | "casas" | "terrenos-sítios" | null;
  title: string;
  subTitle: string;
  description: string;
  price: number;
  transactionMode: "venda" | "aluguel" | "temporada";
  phone: string;
  whatsapp: string;
  imagesFiles: File[];
  
  options: {
    propertyMetrics: {
      area: number;
      rooms: number;
      bathrooms: number;
      garage: number;
    };
    amenities: {
      academy: boolean;
      balcony: boolean;
      pool: boolean;
      service_area: boolean;
      service_room: boolean;
    };
    condominion: {
      academy: boolean;
      allow_animals: boolean;
      close_condominion: boolean;
      elevator: boolean;
      gate_house: boolean;
      party_saloon: boolean;
      security: boolean;
    };
  };
  
  address: {
    state: string;
    city: string;
    neighbourhood: string;
    street: string;
    number: string;
    cep: string;
  };
}
```

## 🔧 Gerenciamento de Estado

### Usar o Store

```typescript
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

function MyComponent() {
  const { formData, updateField, setFormData, resetForm } = useAdvertisementFormStore();
  
  // Atualizar campo único
  updateField("title", "Apartamento Novo");
  
  // Atualizar campo nested
  updateField("address.city", "São Paulo");
  
  // Atualizar múltiplos campos
  setFormData({ title: "Casa", price: 500000 });
  
  // Resetar tudo
  resetForm();
}
```

### Persistência Automática

Os dados são automaticamente salvos no `localStorage` e restaurados ao recarregar a página.

## ✅ Validação

### Client-Side (Opcional)

```typescript
import { validateCategoryStep } from "@/src/components/criar-anuncio/step-validations";

const handleNext = () => {
  const validation = validateCategoryStep(formData);
  
  if (!validation.success) {
    setErrors(validation.errors?.map(e => e.message) || []);
    return false; // Impede navegação
  }
  
  return true; // Permite navegação
};
```

### Server-Side (Automático)

A validação completa com Zod acontece na server action `createAdversetimentAction`.

## 📤 Submissão

A submissão acontece automaticamente no último step (`/revisao`):

1. Dados do Zustand store são convertidos para `FormData`
2. `useActionState` envia para `createAdversetimentAction`
3. Validação Zod no servidor
4. Envio para API
5. Redirect em caso de sucesso

## 🎨 Componentes Reutilizáveis

### Form Wrapper

```typescript
<Form
  currentStep={0}
  totalSteps={6}
  nextRoute="/criar-anuncio/informacoes"
  prevRoute={undefined}
  onNext={() => {
    // Validação opcional
    return true;
  }}
>
  <YourStepComponent />
</Form>
```

### Steps

Cada step é um componente client-side independente:

- `CategoryStep.tsx` - Seleção de categoria e opções
- `InformationStep.tsx` - Informações básicas do anúncio
- `LocationStep.tsx` - Endereço completo
- `DetailsStep.tsx` - Valores e contatos
- `CharacteristicsStep.tsx` - Métricas do imóvel
- `ReviewStep.tsx` - Revisão final e upload de imagens

## 📚 Documentação Completa

- **[README.md](../../components/criar-anuncio/README.md)** - Arquitetura completa do sistema
- **[QUICK_START.md](../../components/criar-anuncio/QUICK_START.md)** - Guia rápido com exemplos práticos
- **[EDIT_EXAMPLE.md](../../components/criar-anuncio/EDIT_EXAMPLE.md)** - Como implementar edição de anúncios
- **[step-validations.ts](../../components/criar-anuncio/step-validations.ts)** - Schemas de validação Zod

## 🛠️ Desenvolvimento

### Adicionar Novo Step

1. Criar componente em `components/criar-anuncio/NewStep.tsx`
2. Criar pasta e `page.tsx` em `criar-anuncio/new-step/`
3. Adicionar schema de validação em `step-validations.ts`
4. Atualizar navegação dos steps adjacentes

### Testar com Dados Mock

```typescript
const { setFormData } = useAdvertisementFormStore();

setFormData({
  category: "apartamentos",
  title: "Apartamento Teste",
  price: 300000,
  // ... outros campos
});
```

### Limpar Dados de Desenvolvimento

```javascript
// No console do navegador
localStorage.removeItem('advertisement-form-storage');
location.reload();
```

## 🔄 Fluxo de Navegação

```
┌─────────────────┐
│  /criar-anuncio │ (redirect)
└────────┬────────┘
         ↓
┌─────────────────┐
│    /categoria   │ ─→ Categoria, modalidade, opções
└────────┬────────┘
         ↓
┌─────────────────┐
│  /informacoes   │ ─→ Título, subtítulo, descrição
└────────┬────────┘
         ↓
┌─────────────────┐
│  /localizacao   │ ─→ Endereço completo
└────────┬────────┘
         ↓
┌─────────────────┐
│   /detalhes     │ ─→ Preço, telefone, WhatsApp
└────────┬────────┘
         ↓
┌─────────────────┐
│/caracteristicas │ ─→ Área, quartos, banheiros, etc.
└────────┬────────┘
         ↓
┌─────────────────┐
│    /revisao     │ ─→ Upload imagens + submit
└─────────────────┘
```

## 📊 Arquitetura

```
┌──────────────────────────────────────────────────────────┐
│                    Browser (Client)                       │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Step Pages  │  │    Store     │  │  Components  │   │
│  │   (Routes)   │←→│   (Zustand)  │←→│   (Steps)    │   │
│  └──────────────┘  └──────┬───────┘  └──────────────┘   │
│                            ↓                               │
│                    localStorage                           │
└────────────────────────────┬─────────────────────────────┘
                             ↓
┌────────────────────────────┬─────────────────────────────┐
│                    Server (Next.js)                       │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │        Server Action                              │   │
│  │  createAdversetimentAction                        │   │
│  │                                                    │   │
│  │  1. Recebe FormData                              │   │
│  │  2. Valida com Zod                               │   │
│  │  3. Envia para API                               │   │
│  │  4. Redireciona                                  │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

## ⚡ Features

✅ Navegação baseada em rotas  
✅ State management com Zustand  
✅ Persistência automática (localStorage)  
✅ Validação client-side e server-side  
✅ TypeScript + Zod para type safety  
✅ Componentes reutilizáveis  
✅ Server Actions para submissão segura  
✅ Design responsivo preservado  
✅ SEO-friendly (cada step tem URL própria)  
✅ Preparado para edição com rotas dinâmicas  

## 🐛 Debug

```typescript
// Ver dados atuais do formulário
const { formData } = useAdvertisementFormStore();
console.log("Form Data:", formData);

// Ver step atual
const { currentStep } = useAdvertisementFormStore();
console.log("Current Step:", currentStep);

// Limpar store
const { resetForm } = useAdvertisementFormStore();
resetForm();
```

## 📞 Suporte

- **Arquitetura**: Ver `components/criar-anuncio/README.md`
- **Exemplos**: Ver `components/criar-anuncio/QUICK_START.md`
- **Edição**: Ver `components/criar-anuncio/EDIT_EXAMPLE.md`
- **Validação**: Ver `components/criar-anuncio/step-validations.ts`

---

**Versão**: 2.0.0  
**Última Atualização**: 28/12/2024  
**Status**: ✅ Produção
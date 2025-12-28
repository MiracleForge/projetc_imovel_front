# 🚀 Quick Start - Multi-Step Form

Guia rápido para começar a usar o formulário multi-step refatorado.

## ⚡ TL;DR

1. Acesse `/criar-anuncio` (redireciona automaticamente para `/criar-anuncio/categoria`)
2. Preencha os campos em cada step
3. Navegue entre steps usando os botões "Voltar" e "Próximo"
4. No último step, revise e envie o formulário
5. Dados são salvos automaticamente no localStorage

## 🎯 Uso Básico

### Acessar o Formulário

```typescript
// Link em qualquer página
<Link href="/criar-anuncio">
  <button>Criar Novo Anúncio</button>
</Link>
```

### Acessar um Step Específico

```typescript
// Ir direto para um step
<Link href="/criar-anuncio/detalhes">
  <button>Pular para Detalhes</button>
</Link>
```

## 📦 Gerenciar Estado

### Ler Dados do Store

```typescript
"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

export function MyComponent() {
  const { formData } = useAdvertisementFormStore();
  
  return (
    <div>
      <p>Categoria: {formData.category}</p>
      <p>Título: {formData.title}</p>
    </div>
  );
}
```

### Atualizar Dados

```typescript
const { updateField, setFormData } = useAdvertisementFormStore();

// Atualizar campo único
updateField("title", "Apartamento Novo");

// Atualizar campo nested
updateField("address.city", "São Paulo");
updateField("options.propertyMetrics.area", 100);

// Atualizar múltiplos campos
setFormData({
  title: "Casa Grande",
  price: 500000,
  category: "casas",
});
```

### Resetar Formulário

```typescript
const { resetForm } = useAdvertisementFormStore();

// Limpar todos os dados
resetForm();
```

## 🎨 Adicionar Validação

### Validação Simples

```typescript
// categoria/page.tsx
"use client";

import { useState } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

export default function CategoriaPage() {
  const { formData } = useAdvertisementFormStore();
  const [error, setError] = useState("");

  const handleNext = () => {
    // Validação customizada
    if (!formData.category) {
      setError("Por favor, selecione uma categoria");
      return false; // Impede navegação
    }
    
    if (!formData.transactionMode) {
      setError("Por favor, selecione a modalidade");
      return false;
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

### Validação com Zod

```typescript
import { adversetizeCategorySchema } from "@/src/contracts/DTOs/advertisement/advertisement.entity.dto";

const handleNext = () => {
  // Validação simples
  if (!formData.category) {
    setError("Selecione uma categoria");
    return false;
  }

  // Ou usar o schema Zod existente
  const validation = adversetizeCategorySchema.safeParse(formData.category);
  
  if (!validation.success) {
    setError(validation.error.issues[0].message);
    return false;
  }

  return true;
};
```

## 🔧 Criar Step Customizado

### 1. Criar o Componente

```typescript
// src/components/criar-anuncio/CustomStep.tsx
"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import CommumInput from "@/src/components/ui/inputs/Commum.inputs";

export function CustomStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.name, e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Meu Step Customizado
      </h2>

      <CommumInput
        topLabel="Campo Custom"
        type="text"
        name="customField"
        value={formData.customField || ""}
        onChange={handleChange}
        placeholder="Digite algo aqui"
      />
    </div>
  );
}
```

### 2. Criar a Página

```typescript
// src/app/(pages)/(static)/criar-anuncio/custom/page.tsx
import { CustomStep } from "@/src/components/criar-anuncio/CustomStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function CustomPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={7} currentStep={6} />

      <Form
        currentStep={6}
        totalSteps={7}
        nextRoute="/criar-anuncio/revisao"
        prevRoute="/criar-anuncio/caracteristicas"
      >
        <CustomStep />
      </Form>
    </div>
  );
}
```

### 3. Atualizar Navegação

```typescript
// Atualizar prevRoute do step seguinte
// src/app/(pages)/(static)/criar-anuncio/revisao/page.tsx
<Form
  prevRoute="/criar-anuncio/custom" // Novo step anterior
  // ...
/>
```

## 🧪 Debug e Testes

### Ver Dados no Console

```typescript
"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { useEffect } from "react";

export function DebugComponent() {
  const { formData } = useAdvertisementFormStore();

  useEffect(() => {
    console.log("📊 Form Data:", formData);
  }, [formData]);

  return null;
}
```

### Preencher Dados de Teste

```typescript
const { setFormData } = useAdvertisementFormStore();

// Preencher com dados mockados
setFormData({
  category: "apartamentos",
  title: "Apartamento Teste",
  subTitle: "Subtítulo Teste",
  description: "Descrição de teste para desenvolvimento",
  price: 300000,
  transactionMode: "venda",
  phone: "(11) 98765-4321",
  whatsapp: "(11) 98765-4321",
  address: {
    state: "SP",
    city: "São Paulo",
    neighbourhood: "Centro",
    street: "Rua Teste",
    number: "123",
    cep: "01234-567",
  },
  options: {
    propertyMetrics: {
      area: 80,
      rooms: 2,
      bathrooms: 1,
      garage: 1,
    },
    amenities: {
      pool: true,
      academy: false,
      balcony: true,
      service_area: true,
      service_room: false,
    },
    condominion: {
      academy: true,
      allow_animals: true,
      close_condominion: true,
      elevator: true,
      gate_house: true,
      party_saloon: false,
      security: true,
    },
  },
});
```

### Limpar LocalStorage

```javascript
// No console do navegador
localStorage.removeItem('advertisement-form-storage');
location.reload();
```

## 🎯 Casos de Uso Comuns

### Mostrar Progresso do Formulário

```typescript
"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";
import { adversetimentCreateSchema } from "@/src/contracts/DTOs/advertisement/advertisement.create.dto";

export function FormProgress() {
  const { formData } = useAdvertisementFormStore();

  const progress = [
    { label: "Categoria", filled: !!formData.category },
    { label: "Título", filled: !!formData.title },
    { label: "Endereço", filled: !!formData.address?.city },
    { label: "Preço", filled: formData.price > 0 },
  ];

  const completed = progress.filter(p => p.filled).length;
  const percentage = (completed / progress.length) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        {progress.map((item, idx) => (
          <div key={idx} className={item.filled ? "text-green-600" : "text-gray-400"}>
            {item.filled ? "✅" : "⭕"} {item.label}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
```

### Salvar Rascunho Automaticamente

```typescript
"use client";

import { useEffect } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

export function AutoSave() {
  const { formData } = useAdvertisementFormStore();

  useEffect(() => {
    // Store já persiste automaticamente com Zustand persist
    // Este é apenas um indicador visual
    const timer = setTimeout(() => {
      console.log("✅ Rascunho salvo automaticamente");
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <div className="text-xs text-gray-500">
      💾 Salvando automaticamente...
    </div>
  );
}
```

### Confirmação Antes de Sair

```typescript
"use client";

import { useEffect } from "react";
import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

export function UnsavedChangesWarning() {
  const { formData } = useAdvertisementFormStore();

  useEffect(() => {
    const hasData = formData.title || formData.category || formData.price > 0;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasData) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData]);

  return null;
}
```

## 📚 Recursos Adicionais

- **README.md** - Documentação completa da arquitetura
- **EDIT_EXAMPLE.md** - Exemplo de implementação de edição
- **contracts/DTOs/advertisement/** - Schemas Zod existentes

## 💡 Dicas

1. **Use o store para comunicação entre componentes** - Evite prop drilling
2. **Adicione validação no `onNext`** - Melhora a UX
3. **Persista dados importantes** - O store já faz isso automaticamente
4. **Teste com dados reais** - Use a função de preenchimento automático
5. **Limpe o localStorage durante desenvolvimento** - Evita dados obsoletos

## ⚠️ Atenções

- Arquivos (`File`) não são persistidos no localStorage
- Navegação por URL funciona, mas pode pular validações
- O store não valida tipos automaticamente - use Zod
- Imagens são mantidas apenas na sessão atual

## 🆘 Problemas Comuns

### Dados não estão sendo salvos
```typescript
// Verifique se está usando updateField corretamente
updateField("title", valor); // ✅ Correto
formData.title = valor; // ❌ Errado
```

### Navegação não funciona
```typescript
// onNext deve retornar boolean
const handleNext = () => {
  // validação...
  return true; // ✅ Permite navegação
};

const handleNext = () => {
  // validação...
  // ❌ Sem return = undefined
};
```

### Store não atualiza componente
```typescript
// Certifique-se de usar o hook
const { formData } = useAdvertisementFormStore(); // ✅ Reativo
const store = useAdvertisementFormStore.getState(); // ❌ Não reativo
```

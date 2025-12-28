# 🛠️ Comandos Úteis - Formulário Multi-Step

## 🚀 Desenvolvimento

### Iniciar servidor de desenvolvimento
```bash
cd client
npm run dev
```

### Build para produção
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 🧪 Debug e Testes

### Ver dados do formulário (Console do navegador)
```javascript
// Ver dados salvos
JSON.parse(localStorage.getItem('advertisement-form-storage'))

// Ver dados formatados
console.table(JSON.parse(localStorage.getItem('advertisement-form-storage')).state.formData)

// Limpar dados
localStorage.removeItem('advertisement-form-storage')
location.reload()
```

### Preencher dados de teste rapidamente
```javascript
// Cole no console do navegador
(function() {
  const store = JSON.parse(localStorage.getItem('advertisement-form-storage'));
  store.state.formData = {
    category: "apartamentos",
    title: "Apartamento de Teste",
    subTitle: "Localização privilegiada",
    description: "Apartamento completo para teste de desenvolvimento",
    price: 350000,
    transactionMode: "venda",
    phone: "(11) 98765-4321",
    whatsapp: "(11) 98765-4321",
    imagesFiles: [],
    options: {
      propertyMetrics: {
        area: 85,
        rooms: 3,
        bathrooms: 2,
        garage: 2
      },
      amenities: {
        academy: true,
        balcony: true,
        pool: true,
        service_area: true,
        service_room: false
      },
      condominion: {
        academy: true,
        allow_animals: true,
        close_condominion: true,
        elevator: true,
        gate_house: true,
        party_saloon: true,
        security: true
      }
    },
    address: {
      state: "SP",
      city: "São Paulo",
      neighbourhood: "Jardins",
      street: "Rua Augusta",
      number: "1500",
      cep: "01304-001"
    }
  };
  localStorage.setItem('advertisement-form-storage', JSON.stringify(store));
  console.log('✅ Dados de teste carregados!');
  location.reload();
})();
```

### Ver todas as rotas do formulário
```bash
# Linux/Mac
ls -la client/src/app/\(pages\)/\(static\)/criar-anuncio/*/page.tsx

# Windows
dir client\src\app\(pages)\(static)\criar-anuncio\*\page.tsx
```

### Contar linhas de código
```bash
# Total de linhas nos componentes de steps
find client/src/components/criar-anuncio -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Total de linhas nas páginas
find client/src/app/\(pages\)/\(static\)/criar-anuncio -name "page.tsx" | xargs wc -l

# Total de linhas de documentação
find client -name "*.md" -path "*/criar-anuncio/*" | xargs wc -l
```

## 📦 Instalação de Dependências

### Instalar Zustand
```bash
npm install zustand --legacy-peer-deps
```

### Instalar todas as dependências
```bash
npm install
```

## 🔍 Buscar no Código

### Buscar uso do store
```bash
grep -r "useAdvertisementFormStore" client/src --include="*.tsx" --include="*.ts"
```

### Buscar todas as rotas de steps
```bash
find client/src/app -type d -path "*/criar-anuncio/*" -name "page.tsx"
```

### Buscar validações
```bash
grep -r "validateStep" client/src --include="*.tsx" --include="*.ts"
```

## 📝 Git Commits Sugeridos

### Commit da refatoração
```bash
git add client/src/store/advertisement-form.store.ts
git add client/src/components/criar-anuncio/
git add client/src/app/\(pages\)/\(static\)/criar-anuncio/
git commit -m "refactor: transformar formulário em multi-step com rotas

- Adicionar Zustand store com persistência
- Criar componentes separados por step
- Implementar navegação baseada em rotas
- Adicionar validação Zod por step
- Manter design e estilização originais
- Preparar arquitetura para edição de anúncios"
```

### Commit da documentação
```bash
git add client/REFACTORING_CHANGELOG.md
git add client/RESUMO_REFATORACAO.md
git add client/COMANDOS_UTEIS.md
git add client/src/components/criar-anuncio/*.md
git commit -m "docs: adicionar documentação completa do formulário multi-step

- README com arquitetura completa
- QUICK_START com exemplos práticos
- EDIT_EXAMPLE com guia de edição
- CHANGELOG detalhado
- Comandos úteis para desenvolvimento"
```

## 🧹 Limpeza

### Limpar builds
```bash
rm -rf client/.next
rm -rf client/node_modules
npm install
```

### Limpar cache do Next.js
```bash
rm -rf client/.next/cache
```

## 📊 Análise de Código

### Ver dependências do store
```bash
npm list zustand
```

### Ver tamanho dos bundles (após build)
```bash
npm run build
ls -lh client/.next/static/chunks/
```

### Verificar tipos TypeScript
```bash
cd client
npx tsc --noEmit
```

## 🔧 Utilitários

### Criar novo step (template)
```bash
# Criar componente
cat > client/src/components/criar-anuncio/NewStep.tsx << 'EOF'
"use client";

import { useAdvertisementFormStore } from "@/src/store/advertisement-form.store";

export function NewStep() {
  const { formData, updateField } = useAdvertisementFormStore();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Novo Step
      </h2>
      {/* Seus campos aqui */}
    </div>
  );
}
EOF

# Criar diretório da página
mkdir -p client/src/app/\(pages\)/\(static\)/criar-anuncio/new-step

# Criar página
cat > client/src/app/\(pages\)/\(static\)/criar-anuncio/new-step/page.tsx << 'EOF'
import { NewStep } from "@/src/components/criar-anuncio/NewStep";
import { Form } from "@/src/components/criar-anuncio/Form";
import MultiStepIndicator from "@/src/components/ui/steps/MultiStepIndicator";

export default function NewStepPage() {
  return (
    <div className="space-y-3">
      <MultiStepIndicator totalSteps={7} currentStep={6} />
      <Form
        currentStep={6}
        totalSteps={7}
        nextRoute="/criar-anuncio/revisao"
        prevRoute="/criar-anuncio/caracteristicas"
      >
        <NewStep />
      </Form>
    </div>
  );
}
EOF

echo "✅ Novo step criado!"
```

### Resetar formulário (via Node.js)
```javascript
// Criar script: reset-form.js
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'client', 'src', 'store', 'advertisement-form.store.ts');
console.log('Store path:', storePath);
console.log('Para resetar o formulário, limpe o localStorage do navegador');
```

## 📱 URLs de Teste

```bash
# Desenvolvimento
http://localhost:3000/criar-anuncio
http://localhost:3000/criar-anuncio/categoria
http://localhost:3000/criar-anuncio/informacoes
http://localhost:3000/criar-anuncio/localizacao
http://localhost:3000/criar-anuncio/detalhes
http://localhost:3000/criar-anuncio/caracteristicas
http://localhost:3000/criar-anuncio/revisao

# Produção
https://seu-dominio.com/criar-anuncio
```

## 🐛 Debug Avançado

### Interceptar updateField
```javascript
// Console do navegador
const originalUpdateField = window.useAdvertisementFormStore?.getState?.()?.updateField;
if (originalUpdateField) {
  window.useAdvertisementFormStore.getState().updateField = function(field, value) {
    console.log(`🔄 Update: ${field} = ${value}`);
    return originalUpdateField.apply(this, arguments);
  };
}
```

### Ver histórico de mudanças do store
```javascript
// Adicionar no store para debug
import { devtools } from 'zustand/middleware';

export const useAdvertisementFormStore = create<AdvertisementFormState>()(
  devtools(
    persist(
      // ... seu store
    ),
    { name: 'AdvertisementForm' }
  )
);

// Então use Redux DevTools no navegador
```

### Simular navegação entre steps
```javascript
// Console do navegador
const steps = [
  '/criar-anuncio/categoria',
  '/criar-anuncio/informacoes',
  '/criar-anuncio/localizacao',
  '/criar-anuncio/detalhes',
  '/criar-anuncio/caracteristicas',
  '/criar-anuncio/revisao'
];

let currentIndex = 0;
function nextStep() {
  if (currentIndex < steps.length - 1) {
    currentIndex++;
    window.location.href = steps[currentIndex];
  }
}

function prevStep() {
  if (currentIndex > 0) {
    currentIndex--;
    window.location.href = steps[currentIndex];
  }
}

console.log('Use nextStep() e prevStep() para navegar');
```

## 📚 Documentação Rápida

```bash
# Ver todas as documentações
ls -la client/*.md
ls -la client/src/components/criar-anuncio/*.md
ls -la client/src/app/\(pages\)/\(static\)/criar-anuncio/*.md

# Ler documentação no terminal
cat client/RESUMO_REFATORACAO.md
cat client/src/components/criar-anuncio/QUICK_START.md
```

## 🎯 Atalhos

### Abrir VS Code nos arquivos importantes
```bash
code client/src/store/advertisement-form.store.ts
code client/src/components/criar-anuncio/Form.tsx
code client/src/app/\(pages\)/\(static\)/criar-anuncio/categoria/page.tsx
```

### Abrir documentação
```bash
# Linux/Mac
open client/RESUMO_REFATORACAO.md

# Windows
start client/RESUMO_REFATORACAO.md
```

---

**💡 Dica**: Adicione este arquivo aos seus favoritos para referência rápida durante o desenvolvimento!
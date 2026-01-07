# 🎯 Server Actions vs Data Access Layer (DAL)

## TL;DR

- **Server Actions** = Mutations (POST, PUT, DELETE, PATCH)
- **Data Access Layer (DAL)** = Queries (GET, leitura de dados)

---

## ❌ Problema Comum

Muitos desenvolvedores usam Server Actions para **buscar dados**, o que **não é recomendado** pela documentação do Next.js.

```typescript
// ❌ ERRADO - Server Action para buscar dados
"use server"

export async function getUserProfile(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  return user;
}
```

**Por que isso é errado?**
1. Server Actions são otimizadas para mutations, não queries
2. Não aproveitam o cache automático do React
3. Podem criar endpoints públicos desnecessários
4. Vão contra as best practices do Next.js

---

## ✅ Solução: Use o padrão correto

| Operação | Use | Local | Exemplo |
|----------|-----|-------|---------|
| **GET** (buscar) | Data Access Layer | `src/data/dal/` | `getUserProfile()` |
| **POST** (criar) | Server Action | `src/app/actions/` | `createUserAction()` |
| **PUT/PATCH** (atualizar) | Server Action | `src/app/actions/` | `updateUserAction()` |
| **DELETE** (deletar) | Server Action | `src/app/actions/` | `deleteUserAction()` |

---

## 📖 Exemplos Práticos

### ✅ CORRETO - DAL para Buscar Dados (GET)

```typescript
// src/data/dal/user.ts
"use server";

import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";

/**
 * Busca perfil do usuário por ID.
 * Cached por request para evitar chamadas duplicadas.
 */
export const getUserProfile = cache(async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      // Não incluir senha ou dados sensíveis!
    }
  });
  
  return user;
});

/**
 * Busca todos os usuários (paginado).
 * Cached por request.
 */
export const getAllUsers = cache(async (page: number = 1) => {
  const users = await db.user.findMany({
    take: 20,
    skip: (page - 1) * 20,
    select: {
      id: true,
      name: true,
      image: true,
    }
  });
  
  return users;
});
```

**Uso em Server Component:**
```typescript
// app/profile/[id]/page.tsx
import { getUserProfile } from "@/src/data/dal/user";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id);
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

---

### ✅ CORRETO - Server Action para Mutations (POST/PUT/DELETE)

```typescript
// src/app/actions/user.actions.ts
"use server";

import { verifyAuthentication } from "@/src/data/dal/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Atualiza perfil do usuário.
 * Server Action porque é uma MUTATION (altera dados).
 */
export async function updateUserProfileAction(formData: FormData) {
  // 1. Verificar autenticação
  const session = await verifyAuthentication();
  
  // 2. Validar dados
  const name = formData.get("name") as string;
  if (!name || name.length < 3) {
    return {
      error: "VALIDATION_ERROR",
      message: "Nome deve ter no mínimo 3 caracteres",
      data: undefined,
    };
  }
  
  // 3. Atualizar no banco
  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { name }
    });
    
    // 4. Revalidar cache
    revalidatePath("/profile");
    
    return {
      error: undefined,
      message: "Perfil atualizado com sucesso!",
      data: undefined,
    };
  } catch (error) {
    return {
      error: "UPDATE_ERROR",
      message: "Erro ao atualizar perfil",
      data: undefined,
    };
  }
}

/**
 * Deleta usuário.
 * Server Action porque é uma MUTATION (DELETE).
 */
export async function deleteUserAction(userId: string) {
  const session = await verifyAuthentication();
  
  // Verificar se pode deletar
  if (session.user.id !== userId && !session.user.isAdmin) {
    throw new Error("Não autorizado");
  }
  
  await db.user.delete({ where: { id: userId } });
  revalidatePath("/users");
  
  return { success: true };
}
```

**Uso em Client Component:**
```typescript
// components/EditProfileForm.tsx
"use client";

import { updateUserProfileAction } from "@/src/app/actions/user.actions";
import { useActionState } from "react";

export function EditProfileForm() {
  const [state, formAction] = useActionState(updateUserProfileAction, {
    error: undefined,
    message: "",
    data: undefined,
  });
  
  return (
    <form action={formAction}>
      <input name="name" required />
      
      {state.message && <p>{state.message}</p>}
      
      <button type="submit">Salvar</button>
    </form>
  );
}
```

---

## 🔄 Casos Especiais

### 1. Busca de CEP (API Externa)

```typescript
// ✅ CORRETO - DAL
// src/data/dal/localization.ts
"use server";

import "server-only";
import { cache } from "react";

export const getAddressByCEP = cache(async (cep: string) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    next: { revalidate: 3600 }, // Cache por 1 hora
  });
  
  const data = await response.json();
  return data;
});
```

### 2. Subscriptions/Inscrições do Usuário

```typescript
// ✅ CORRETO - DAL para GET
// src/data/dal/subscription.ts
"use server";

import "server-only";
import { cache } from "react";
import { verifyAuthentication } from "./auth";

export const getUserSubscriptions = cache(async () => {
  const session = await verifyAuthentication();
  
  const subscriptions = await db.subscription.findMany({
    where: { userId: session.user.id }
  });
  
  return subscriptions;
});
```

```typescript
// ✅ CORRETO - Server Action para POST/DELETE
// src/app/actions/subscription.actions.ts
"use server";

import { verifyAuthentication } from "@/src/data/dal/auth";
import { db } from "@/lib/db";

export async function createSubscriptionAction(planId: string) {
  const session = await verifyAuthentication();
  
  const subscription = await db.subscription.create({
    data: {
      userId: session.user.id,
      planId: planId,
    }
  });
  
  return { success: true, data: subscription };
}

export async function cancelSubscriptionAction(subscriptionId: string) {
  const session = await verifyAuthentication();
  
  await db.subscription.delete({
    where: {
      id: subscriptionId,
      userId: session.user.id, // Garantir que é do usuário
    }
  });
  
  return { success: true };
}
```

---

## 🎨 Estrutura de Pastas Recomendada

```
src/
├── app/
│   └── actions/           # Server Actions (MUTATIONS)
│       ├── user.actions.ts
│       ├── advertisement.actions.ts
│       └── subscription.actions.ts
│
├── data/
│   └── dal/               # Data Access Layer (QUERIES)
│       ├── auth.ts
│       ├── user.ts
│       ├── advertisement.ts
│       ├── subscription.ts
│       └── localization.ts
```

---

## 📋 Checklist: Está usando corretamente?

### Para operações GET (buscar dados):
- [ ] Está em `src/data/dal/`?
- [ ] Tem `"use server"` no topo?
- [ ] Tem `import "server-only"`?
- [ ] Usa `cache()` do React?
- [ ] Retorna apenas DTOs seguros?
- [ ] Verifica autorização quando necessário?

### Para operações POST/PUT/DELETE (mutations):
- [ ] Está em `src/app/actions/`?
- [ ] Tem `"use server"` no topo?
- [ ] Verifica autenticação com `verifyAuthentication()`?
- [ ] Valida inputs com Zod ou similar?
- [ ] Usa `revalidatePath()` ou `revalidateTag()` quando necessário?
- [ ] Retorna `actionResponse` padronizado?

---

## 🚫 Anti-Patterns (Evite!)

### ❌ Server Action para GET
```typescript
// ❌ NÃO FAÇA ISSO
"use server"
export async function getUsers() {
  return await db.user.findMany();
}
```

### ❌ DAL para POST/PUT/DELETE
```typescript
// ❌ NÃO FAÇA ISSO
"use server"
import "server-only";
import { cache } from "react";

export const createUser = cache(async (data: any) => {
  return await db.user.create({ data });
});
```

### ❌ Sem `cache()` na DAL
```typescript
// ❌ NÃO FAÇA ISSO
"use server"
import "server-only";

// Falta o cache()! Vai fazer múltiplas chamadas desnecessárias
export async function getUser(id: string) {
  return await db.user.findUnique({ where: { id } });
}
```

---

## 🎯 Benefícios de Seguir Este Padrão

### Data Access Layer (DAL):
✅ Cache automático por request  
✅ Compartilhamento de dados entre componentes  
✅ Melhor performance  
✅ Type-safe  
✅ Centralização de queries  
✅ Fácil de auditar  

### Server Actions:
✅ Progressive Enhancement  
✅ Validação no servidor  
✅ Revalidação automática de cache  
✅ Type-safe  
✅ Integração com formulários  
✅ Não precisa criar API routes  

---

## 📚 Referências Oficiais

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Data Security Guide](https://nextjs.org/docs/app/guides/data-security)
- [React Cache](https://react.dev/reference/react/cache)

---

## 💡 Resumo Final

| Você quer... | Use... | Arquivo em... |
|-------------|--------|---------------|
| Buscar dados | DAL com `cache()` | `src/data/dal/` |
| Criar algo | Server Action | `src/app/actions/` |
| Atualizar algo | Server Action | `src/app/actions/` |
| Deletar algo | Server Action | `src/app/actions/` |
| Submeter formulário | Server Action | `src/app/actions/` |

**Regra de ouro:** Se é GET, é DAL. Se muda dados, é Server Action! 🎯
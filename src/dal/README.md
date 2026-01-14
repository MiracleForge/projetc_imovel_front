# Data Access Layer (DAL)

Este diretório contém a **Data Access Layer** do projeto, seguindo as [recomendações oficiais do Next.js](https://nextjs.org/docs/app/guides/data-security) para segurança de dados.

## 📋 Visão Geral

A Data Access Layer (DAL) é uma camada interna que controla:
- **Como e quando** os dados são buscados
- **O que** é passado para o contexto de renderização
- **Verificações de autorização** centralizadas
- **Retorno de DTOs seguros e mínimos**

## 🎯 Princípios

A DAL segue estes princípios fundamentais:

1. **Server-Only**: Todos os arquivos devem ter `"use server"` e `import "server-only"`
2. **Cache**: Utiliza `cache()` do React para compartilhar dados dentro de um request
3. **Authorization**: Realiza verificações de autorização antes de retornar dados
4. **DTOs**: Retorna apenas dados seguros e necessários (Data Transfer Objects)
5. **Centralização**: Todo acesso a dados sensíveis passa pela DAL

## 🎯 Server Actions vs Data Access Layer

### ✅ Use DAL (Data Access Layer) para:
- **Buscar dados (GET)** - Ler informações do banco/API
- **Queries** - Consultas que não modificam dados
- **Leitura de recursos** - Perfis, listagens, detalhes

### ✅ Use Server Actions para:
- **Mutations (POST/PUT/PATCH/DELETE)** - Criar, atualizar, deletar
- **Submissão de formulários** - Login, registro, criar anúncio
- **Alteração de estado** - Curtir, favoritar, seguir

### Exemplo Prático:

```typescript
// ❌ ERRADO - Server Action para GET
"use server"
export async function getUserProfile(id: string) {
  return await db.user.findUnique({ where: { id } });
}

// ✅ CORRETO - DAL para GET
"use server"
import "server-only";
import { cache } from "react";

export const getUserProfile = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } });
});

// ✅ CORRETO - Server Action para POST/PUT/DELETE
"use server"
export async function updateUserProfile(formData: FormData) {
  const session = await verifyAuthentication();
  // ... validação e atualização
}
```

## 📁 Estrutura

```
src/data/dal/
├── README.md           # Este arquivo
├── auth.ts            # Autenticação e autorização
├── localization.ts    # Busca de CEP e localização
├── subscription.ts    # Busca de inscrições do usuário
└── [outras-entidades] # Futuras camadas de acesso a dados
```

## 🔐 auth.ts

Contém funções relacionadas à autenticação e autorização:

### `getCurrentUser()`

```typescript
const user = await getCurrentUser();
```

- Retorna a sessão do usuário autenticado
- **Cached**: Múltiplas chamadas no mesmo request retornam o mesmo valor
- Retorna `null` se não autenticado

### `verifyAuthentication()`

```typescript
const session = await verifyAuthentication();
```

- Verifica se o usuário está autenticado
- **Lança erro** se não autenticado
- Use em Server Actions que **exigem** autenticação

### `isAuthenticated()`

```typescript
const isAuth = await isAuthenticated();
```

- Verifica se o usuário está autenticado
- Retorna `boolean` sem lançar erro
- Use para lógica condicional

## 🚀 Uso em Server Actions

### ✅ Correto - Com verificação de autenticação

```typescript
"use server";

import { verifyAuthentication } from "@/src/data/dal/auth";

export async function deleteUserAction(userId: string) {
  // Verifica autenticação
  const session = await verifyAuthentication();
  
  // Lógica da action
  // ...
}
```

### ✅ Correto - Com tratamento de erro

```typescript
"use server";

import { verifyAuthentication } from "@/src/data/dal/auth";

export async function updateProfileAction(data: FormData) {
  try {
    await verifyAuthentication();
  } catch (error) {
    return {
      error: "UNAUTHORIZED",
      message: "Você precisa estar autenticado",
      data: undefined,
    };
  }
  
  // Lógica da action
  // ...
}
```

### ❌ Incorreto - Sem verificação

```typescript
"use server";

export async function deleteUserAction(userId: string) {
  // VULNERÁVEL: Qualquer um pode chamar esta action!
  await deleteFromDatabase(userId);
}
```

## 🔄 Vantagens do Cache

O uso de `cache()` do React traz benefícios importantes:

```typescript
// Múltiplas chamadas no mesmo request
const user1 = await getCurrentUser(); // Busca do banco/sessão
const user2 = await getCurrentUser(); // Retorna do cache ✅
const user3 = await getCurrentUser(); // Retorna do cache ✅
```

Isso:
- ✅ Reduz chamadas desnecessárias
- ✅ Melhora performance
- ✅ Evita passar sessão manualmente entre componentes
- ✅ Minimiza risco de expor dados sensíveis

## 🛡️ Segurança

### ✅ Boas Práticas

1. **Sempre use a DAL para acessar dados sensíveis**
2. **Nunca exponha `process.env` fora da DAL**
3. **Sempre verifique autorização antes de retornar dados**
4. **Retorne apenas dados necessários (princípio do menor privilégio)**
5. **Use DTOs para sanitizar dados**

### ❌ Evite

1. ❌ Acessar `process.env` diretamente em componentes
2. ❌ Passar objetos completos de usuário para Client Components
3. ❌ Confiar em dados do cliente (searchParams, headers, cookies)
4. ❌ Fazer queries diretas ao banco fora da DAL
5. ❌ Expor secrets ou tokens

## 📚 Referências

- [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security)
- [React Cache Documentation](https://react.dev/reference/react/cache)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [Server Actions vs Server Functions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#when-to-use-server-actions)

## 🔜 Próximos Passos

Para expandir a DAL, considere criar:

- `dal/user.ts` - Acesso a dados de usuários
- `dal/advertisement.ts` - Acesso a dados de anúncios
- `dal/subscription.ts` - Acesso a dados de inscrições
- `dal/permissions.ts` - Verificações de permissões específicas

Cada arquivo deve seguir o mesmo padrão:
1. `"use server"` + `import "server-only"`
2. Usar `cache()` quando apropriado
3. Verificar autorização
4. Retornar DTOs mínimos e seguros
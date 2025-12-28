// src/lib/formDataToObject.ts
export function formDataToObject(formData: FormData): Record<string, unknown> {
  const object: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    // Ignora campos internos do React/Next.js
    if (key.startsWith("$ACTION")) {
      return;
    }

    // Divide a chave por pontos (ex: "address.city" -> ["address", "city"])
    const keys = key.split(".");

    // Se não tem ponto, é um campo simples
    if (keys.length === 1) {
      // Se já existe e é um array, adiciona ao array
      if (Array.isArray(object[key])) {
        (object[key] as unknown[]).push(convertValue(value));
      }
      // Se já existe mas não é array, converte para array
      else if (object[key] !== undefined) {
        object[key] = [object[key], convertValue(value)];
      }
      // Se não existe, adiciona normalmente
      else {
        object[key] = convertValue(value);
      }
      return;
    }

    // Se tem ponto, cria o objeto aninhado
    let current: Record<string, unknown> = object;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k] || typeof current[k] !== "object") {
        current[k] = {};
      }
      current = current[k] as Record<string, unknown>;
    }

    // Define o valor no último nível
    const lastKey = keys[keys.length - 1];
    const convertedValue = convertValue(value);

    // Se já existe e é um array, adiciona ao array
    if (Array.isArray(current[lastKey])) {
      (current[lastKey] as unknown[]).push(convertedValue);
    }
    // Se já existe mas não é array, converte para array
    else if (current[lastKey] !== undefined) {
      current[lastKey] = [current[lastKey], convertedValue];
    }
    // Se não existe, adiciona normalmente
    else {
      current[lastKey] = convertedValue;
    }
  });

  return object;
}

// Helper para converter valores
function convertValue(value: FormDataEntryValue): unknown {
  // Se é File, retorna o File
  if (value instanceof File) {
    return value;
  }

  // Converte checkboxes "on" para boolean true
  // Converte strings "true"/"false" para booleans
  if (value === "on" || value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  }

  return value;
}

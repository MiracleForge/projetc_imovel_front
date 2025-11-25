// src/lib/formDataToObject.ts
export function formDataToObject(formData: FormData): Record<string, any> {
  const object: Record<string, any> = {};

  formData.forEach((value, key) => {
    // Ignora campos internos do React/Next.js
    if (key.startsWith('$ACTION')) {
      return;
    }

    // Divide a chave por pontos (ex: "address.city" -> ["address", "city"])
    const keys = key.split('.');

    // Se não tem ponto, é um campo simples
    if (keys.length === 1) {
      // Converte checkboxes "on" para boolean true
      object[key] = value === 'on' ? true : value;
      return;
    }

    // Se tem ponto, cria o objeto aninhado
    let current = object;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k] || typeof current[k] !== 'object') {
        current[k] = {};
      }
      current = current[k];
    }

    // Define o valor no último nível
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value === 'on' ? true : value;
  });

  return object;
}

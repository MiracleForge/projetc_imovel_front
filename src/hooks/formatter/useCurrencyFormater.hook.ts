const useFormatCurrency = (value: string): string => {
  const number = Number(
    value
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^\d.-]/g, '')
  );

  if (isNaN(number)) return '';

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'EUR',
  });
};


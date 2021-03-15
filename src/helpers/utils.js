export const formatCurrency = (price = 0) => {
  return new Intl.NumberFormat('es-CO').format(price);
};

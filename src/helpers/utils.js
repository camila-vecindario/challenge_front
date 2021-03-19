export const formatCurrency = (price = 0) => {
  return new Intl.NumberFormat('es-CO').format(price);
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

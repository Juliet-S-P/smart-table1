import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    const el = elements[elementName];
    if (!el) return; // элемент может отсутствовать
    const options = Object.values(indexes[elementName]).map((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      return option;
    });
    el.append(...options);
  });

  // @todo: #4.3 — настроить компаратор
  const compare = createComparison(defaultRules);

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const field = action.dataset.field;
      const parent = action.parentElement;
      if (parent) {
        const input = parent.querySelector("input, select");
        if (input) {
          input.value = "";
          state[field] = "";
        }
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}

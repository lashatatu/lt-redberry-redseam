export function getPagination(current, total) {
  const pagesSet = new Set();
  pagesSet.add(1);
  if (total >= 2) {
    pagesSet.add(2);
  }
  if (total >= 3) {
    pagesSet.add(total - 1);
  }
  if (total >= 2) {
    pagesSet.add(total);
  }
  if (current - 1 > 2 && current - 1 < total - 1) {
    pagesSet.add(current - 1);
  }
  if (current > 2 && current < total - 1) {
    pagesSet.add(current);
  }
  if (current + 1 < total && current + 1 > 2) {
    pagesSet.add(current + 1);
  }

  const pages = Array.from(pagesSet).filter((p) => p >= 1 && p <= total);
  pages.sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < pages.length; i++) {
    result.push(pages[i]);
    if (i < pages.length - 1 && pages[i + 1] - pages[i] > 1) {
      result.push("...");
    }
  }
  return result;
}


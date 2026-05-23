export const getChartData = (transactions) => {
  const categoryMap = {};

  transactions.forEach((t) => {
    const amt = Number(t.amount);

    if (categoryMap[t.category]) {
      categoryMap[t.category] += amt;
    } else {
      categoryMap[t.category] = amt;
    }
  });

  return Object.keys(categoryMap).map((key) => ({
    category: key,
    value: categoryMap[key],
  }));
};
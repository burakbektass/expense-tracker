import { formatMoney } from "@/lib/formatUtils";

export function CategoryTable({
  categories,
  currency,
  convertAmount,
  onDelete,
  onEdit,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-right pr-14">Budget</th>
            <th className="p-4 text-right">Income</th>
            <th className="p-4 text-right">Expenses</th>
            <th className="p-4 text-right">Balance</th>
            <th className="p-4 text-center w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b border-border hover:bg-foreground/5"
            >
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </div>
              </td>
              <td className="p-4 text-right text-gray-500">
                <div className="flex items-center justify-end gap-2 min-w-[200px]">
                  <div className="flex-1 text-right pr-1">
                    <span className="tabular-nums">
                      {category.budget
                        ? `${currency.symbol}${formatMoney(
                            convertAmount(category.budget)
                          )}`
                        : "No budget"}
                    </span>
                  </div>
                  <div className="w-6 flex justify-center">
                    {category.budget && category.budgetWarning && (
                      <div className="relative group">
                        <span className="text-yellow-500 animate-pulse cursor-pointer">⚠️</span>
                        <div className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                          {`Warning: Expenses have reached ${(
                            (Math.abs(
                              convertAmount(category.totalExpense) -
                              convertAmount(category.totalIncome)
                            ) /
                              convertAmount(category.budget || 1)) *
                            100
                          ).toFixed(0)}% of budget`}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-4 text-right text-green-500">
                {currency.symbol}
                {formatMoney(convertAmount(category.totalIncome))}
              </td>
              <td className="p-4 text-right text-red-500">
                {currency.symbol}
                {formatMoney(convertAmount(category.totalExpense))}
              </td>
              <td className="p-4 text-right font-medium">
                {currency.symbol}
                {formatMoney(
                  convertAmount(category.totalIncome - category.totalExpense)
                )}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TrendTable({ data, currency, formatMoney }) {
    return (
      <div className="overflow-auto max-h-[400px]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Month</th>
              <th className="text-right p-2">Income</th>
              <th className="text-right p-2">Expenses</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.month} className="border-t border-border">
                <td className="p-2">{item.month}</td>
                <td className="text-right text-green-500 p-2">
                  {currency.symbol}{formatMoney(item.Income)}
                </td>
                <td className="text-right text-red-500 p-2">
                  {currency.symbol}{formatMoney(item.Expenses)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
import { useLanguage } from '@/context/LanguageContext';

export function ExpenseTable({ data, currency, formatMoney }) {
  const { t } = useLanguage();
  
  return (
    <div className="overflow-auto max-h-[400px]">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">{t('dashboard.category')}</th>
            <th className="text-right p-2">{t('dashboard.amount')}</th>
            <th className="text-right p-2">{t('dashboard.percentage')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name} className="border-t border-border">
              <td className="p-2">{item.name}</td>
              <td className="text-right p-2">
                {currency.symbol}{formatMoney(item.value)}
              </td>
              <td className="text-right p-2">
                {((item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}
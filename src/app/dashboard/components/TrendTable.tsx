import { useLanguage } from '@/context/LanguageContext';

export function TrendTable({ data, currency, formatMoney }) {
  const { t } = useLanguage();
  
  return (
    <div className="overflow-auto max-h-[400px]">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">{t('dashboard.month')}</th>
            <th className="text-right p-2">{t('dashboard.income')}</th>
            <th className="text-right p-2">{t('dashboard.expenses')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.month} className="border-t border-border">
              <td className="p-2">{item.month}</td>
              <td className="text-right text-green-500 p-2">
                {currency.symbol}{formatMoney(item.income)}
              </td>
              <td className="text-right text-red-500 p-2">
                {currency.symbol}{formatMoney(item.expense)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
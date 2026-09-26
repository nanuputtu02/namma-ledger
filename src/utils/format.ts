export const formatINR = (paise: number) => new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2}).format((paise || 0) / 100);
export const formatINRWhole = (paise: number) => new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 0}).format((paise || 0) / 100);
export const parsePaise = (value: string) => {
  if (!value.trim()) return 0;
  if (!/^\d+(\.\d{0,2})?$/.test(value.trim())) return null;
  const [rupees, decimals = ''] = value.trim().split('.');
  return Number(rupees) * 100 + Number((decimals + '00').slice(0, 2));
};
export const percent = (value: number, target: number) => target > 0 ? Math.min(100, Math.max(0, Math.round(value / target * 10000) / 100)) : 0;
export const monthlyTotal = (amounts: Record<string, number>) => Object.values(amounts).reduce((sum, value) => sum + (Number(value) || 0), 0);

import type {AppData, FinancialYear, MonthlyLedger, UserId, GoalSnapshot} from '../types';
import {CATEGORIES} from '../types';

export const STORAGE_KEY = 'namma-ledger';
export const STORAGE_VERSION = 2;

export const USERS = [
  {id: 'akka', name: 'Akka', initial: 'A'},
  {id: 'puttu', name: 'Puttu', initial: 'P'},
] as const;

export const MONTHS = [
  {key: '2026-09', label: 'September 2026', short: 'Sep'},
  {key: '2026-10', label: 'October 2026', short: 'Oct'},
  {key: '2026-11', label: 'November 2026', short: 'Nov'},
  {key: '2026-12', label: 'December 2026', short: 'Dec'},
  {key: '2027-01', label: 'January 2027', short: 'Jan'},
  {key: '2027-02', label: 'February 2027', short: 'Feb'},
  {key: '2027-03', label: 'March 2027', short: 'Mar'},
  {key: '2027-04', label: 'April 2027', short: 'Apr'},
  {key: '2027-05', label: 'May 2027', short: 'May'},
  {key: '2027-06', label: 'June 2027', short: 'Jun'},
  {key: '2027-07', label: 'July 2027', short: 'Jul'},
  {key: '2027-08', label: 'August 2027', short: 'Aug'},
];

const defaultAmounts = () => Object.fromEntries(CATEGORIES.map(c => [c, 0])) as MonthlyLedger['amounts'];

const defaultData = (): AppData => ({
  version: STORAGE_VERSION,
  session: null,
  users: [...USERS],
  financialYears: [{
    id: 'fy-2026-27', name: 'Sep 2026 – Aug 2027', startDate: '2026-09-01', endDate: '2027-08-31', status: 'active'
  }],
  monthlyLedgers: [],
  goals: {
    houseFundTarget: 50000000,
    grandmaKaiUnguraTarget: 0,
    grandmaKaiUnguraAccumulated: 0,
    houseFundHistory: [],
    grandmaHistory: [],
  },
  settings: {currency: 'INR', selectedFinancialYearId: 'fy-2026-27', selectedMonthKey: '2026-09'},
});

export const getData = (): AppData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw) as AppData;
    if (parsed.version !== STORAGE_VERSION) return defaultData();
    return parsed;
  } catch {
    return defaultData();
  }
};

export const saveData = (data: AppData) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const getSession = () => getData().session;
export const setSession = (userId: UserId) => { const d = getData(); d.session = {userId}; saveData(d); };
export const clearSession = () => { const d = getData(); d.session = null; saveData(d); };
export const getCurrentUser = () => getData().session?.userId ?? 'akka';

export const getFinancialYears = () => getData().financialYears;
export const createFinancialYear = (year: FinancialYear) => { const d = getData(); d.financialYears.push(year); d.settings.selectedFinancialYearId = year.id; saveData(d); };
export const setSelectedPeriod = (financialYearId: string, monthKey: string) => { const d = getData(); d.settings.selectedFinancialYearId = financialYearId; d.settings.selectedMonthKey = monthKey; saveData(d); };

export const getMonthlyLedger = (financialYearId: string, monthKey: string) => getData().monthlyLedgers.find(x => x.financialYearId === financialYearId && x.monthKey === monthKey && x.ownerId === 'puttu');

export const blankAmounts = () => defaultAmounts();
export const saveMonthlyLedger = (ledger: MonthlyLedger) => {
  const d = getData();
  const index = d.monthlyLedgers.findIndex(x => x.financialYearId === ledger.financialYearId && x.monthKey === ledger.monthKey && x.ownerId === 'puttu');
  if (index >= 0) d.monthlyLedgers[index] = {...ledger, ownerId: 'puttu', updatedAt: new Date().toISOString()};
  else d.monthlyLedgers.push({...ledger, ownerId: 'puttu', updatedAt: new Date().toISOString()});
  saveData(d);
};
export const clearMonthlyLedger = (financialYearId: string, monthKey: string) => {
  const d = getData();
  d.monthlyLedgers = d.monthlyLedgers.filter(x => !(x.financialYearId === financialYearId && x.monthKey === monthKey && x.ownerId === 'puttu'));
  saveData(d);
};

export const getHouseFundAccumulated = () => getData().monthlyLedgers.reduce((sum, l) => sum + (l.amounts.CHITS || 0), 0);
export const getHouseFundProgress = () => {
  const d = getData(); const target = d.goals.houseFundTarget; return target > 0 ? Math.min(100, getHouseFundAccumulated() / target * 100) : 0;
};

export const saveGoalTargets = (next: GoalSnapshot) => { const d = getData(); d.goals.houseFundTarget = next.houseFundTarget; d.goals.grandmaKaiUnguraTarget = next.grandmaKaiUnguraTarget; saveData(d); };
export const saveGrandmaTarget = (target: number) => { const d = getData(); d.goals.grandmaKaiUnguraTarget = target; saveData(d); };
export const setGrandmaAccumulated = (amount: number) => { const d = getData(); d.goals.grandmaKaiUnguraAccumulated = amount; saveData(d); };

export const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
export const resetLocalData = () => localStorage.removeItem(STORAGE_KEY);

export const CATEGORIES = ['PG', 'CHITS', 'PPF', 'CHINNU', 'EXPENSE', 'PUTTU'] as const;
export type Category = typeof CATEGORIES[number];
export type UserId = 'akka' | 'puttu';
export type Money = number; // integer paise

export interface User {
  id: UserId;
  name: 'Akka' | 'Puttu';
  initial: 'A' | 'P';
}

export interface FinancialYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'closed';
}

export interface MonthlyLedger {
  id: string;
  financialYearId: string;
  monthKey: string;
  monthLabel: string;
  ownerId: UserId;
  amounts: Record<Category, Money>;
  updatedAt: string;
}

export interface GoalsState {
  houseFundTarget: Money;
  grandmaKaiUnguraTarget: Money;
  grandmaKaiUnguraAccumulated: Money;
  houseFundHistory: Money[];
  grandmaHistory: Money[];
}

export interface Settings {
  currency: 'INR';
  selectedFinancialYearId: string;
  selectedMonthKey: string;
}

export interface AppData {
  version: number;
  session: { userId: UserId } | null;
  users: User[];
  financialYears: FinancialYear[];
  monthlyLedgers: MonthlyLedger[];
  goals: GoalsState;
  settings: Settings;
}

export interface GoalSnapshot {
  houseFundTarget: Money;
  grandmaKaiUnguraTarget: Money;
}

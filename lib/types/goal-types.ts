
export type Goal = {
    id: string;
    name: string;
    description: string;
    category: string;
    targetAmount: number;
    currentAmount: number;
    investmentAmount: number;
    linkedAccountId: string[];
    targetDate: Date;
    progress: number;
}
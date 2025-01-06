
export type Budget = {
    id: string;
    name: string;
    description: string;
    category: string;
    period: string;
    startDay: Date;
    endDay: Date;
    budgetAmount: number;
    currentAmount: number;
    spentPercentage: number;

}
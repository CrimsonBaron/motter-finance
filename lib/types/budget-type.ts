
export type DtoBudgetIn = {
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

export type DtoBudgetOut = {
    name: string
    description: string,
    category: "Monthly Expenses"| "Project Budget"| "Travel Budget"| "Holiday Budget"| "Special Occasion",
    period: "monthly" | "yearly" | "daily",
    budgetAmount: number,
    startDay: Date,
    endDay: Date,
}

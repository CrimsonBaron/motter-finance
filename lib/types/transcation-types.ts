export type DtoTransactionIn = {
    id: string,
    account: string,
    amount: number,
    isIncoming: boolean,
    isOutgoing: boolean,
    description: string,
    category: string,
    budget: string | undefined,
    goal: string | undefined,
    inAccount: string| undefined,
    notes: string,
    date: Date,
}

export type DtoTransactionOut = {
    account: string,
    amount: number,
    isIncoming: boolean,
    isOutgoing: boolean,
    description: string,
    category: string,
    budget: string,
    goal: string,
    inAccount: string,
    notes: string
}
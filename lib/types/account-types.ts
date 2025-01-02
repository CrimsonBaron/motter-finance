export type Account = {
    id: string;
    name: string;
    description: string;
    type: "checking" | "savings";
    currency: string;
    balance: number;
}
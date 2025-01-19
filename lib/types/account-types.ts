export type Account = {
    id: string;
    name: string;
    description: string;
    type: "checking" | "saving";
    currency: string;
    balance: number;
}
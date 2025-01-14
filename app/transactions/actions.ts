"use server"

import { DtoTransactionIn, DtoTransactionOut } from "@/lib/types/transcation-types";
import { cookies } from "next/headers";
import Pocketbase from "pocketbase";


export async function createTransaction(transaction: DtoTransactionOut) {
    const pb = new Pocketbase();
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
        const o = {
            ...transaction,
            user: pb.authStore.record!.id,
        }

        const newTransaction:DtoTransactionIn = await pb.collection("transactions").create(o);
        await updateAttributesByTransaction(newTransaction);
        return newTransaction;


    } catch (e) {
        console.error(e);
        return;
    }

}

export async function updateAttributesByTransaction(transaction:DtoTransactionIn) {
    const pb = new Pocketbase();
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
       if(transaction.isOutgoing) {
            const account = await pb.collection("accounts").getOne(transaction.account);
            account.currentAmount -= transaction.amount;
            await pb.collection("accounts").update(account.id, account);
       }

       if(transaction.budget) {
            const budget = await pb.collection("budgets").getOne(transaction.budget);
            budget.currentAmount += transaction.amount;
            await pb.collection("budgets").update(budget.id, budget);
       }

       if(transaction.goal) {
            const goal = await pb.collection("goals").getOne(transaction.goal);
            goal.currentAmount += transaction.amount;
            await pb.collection("goals").update(goal.id, goal);
       }

       if(transaction.inAccount) {
            const inAccount = await pb.collection("accounts").getOne(transaction.inAccount);
            inAccount.currentAmount += transaction.amount;
            await pb.collection("accounts").update(inAccount.id, inAccount);
       }

    } catch (e) {
        console.error(e);
        return;
    }
}

export async function getTransactions(): Promise<DtoTransactionIn[]> {
    const pb = new Pocketbase();
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
        const transactions = await pb.collection("transactions").getFullList();
        return transactions.map((transaction) => {
            const dtoTransaction: DtoTransactionIn = {
                id: transaction.id,
                account: transaction.account,
                amount: transaction.amount,
                isOutgoing: transaction.isOutgoing,
                description: transaction.description,
                category: transaction.category,
                budget: transaction.budget,
                goal: transaction.goal,
                inAccount: transaction.inAccount,
                notes: transaction.notes,
                date: new Date(transaction.date),
            };
            return dtoTransaction;
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}
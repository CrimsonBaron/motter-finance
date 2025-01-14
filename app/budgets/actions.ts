"use server"

import { DtoBudgetIn, DtoBudgetOut } from "@/lib/types/budget-type";
import { cookies } from "next/headers";
import PocketBase from "PocketBase"

export async function createBudget(budget:DtoBudgetOut) {

    if (budget === undefined) {
        console.error("Missing required fields");
        return;
    }

    const pb = new PocketBase(process.env.POCKETBASE_URL);
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
        const o = {
            ...budget,
            user: pb.authStore.record!.id
        }
        const newBudget = await pb.collection("budgets").create(o)
        return newBudget;
    } catch (error) {
        console.error(error);
        return;
    }
    
}

export async function getBudgets(): Promise<DtoBudgetIn[]> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
        const budgets = await pb.collection("budgets").getFullList();
        console.log(budgets);
        return budgets.map((budget) => {
            const dtoBudget: DtoBudgetIn = {
                id: budget.id,
                name: budget.name,
                description: budget.description,
                category: budget.category,
                period: budget.period,
                startDay: new Date(budget.startDay),
                endDay: new Date(budget.endDay),
                budgetAmount: budget.budgetAmount,
                currentAmount: budget.currentAmount,
                spentPercentage: budget.spentPercentage
            };
            return dtoBudget;
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}
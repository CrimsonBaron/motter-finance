"use server"

import { Goal } from "@/lib/types/goal-types";
import { cookies } from "next/headers";
import Pocketbase from "PocketBase"


export async function createGoal(goalData: {name: string, description: string, category: string, goalAmmount: number, investmentAmmount: number, completionDate: Date}) {
    const pb = new Pocketbase(process.env.POCKETBASE_URL);
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
        await pb.collection("goals").create({
            name: goalData.name,
            description: goalData.description,
            goalAmmount: goalData.goalAmmount,
            currentAmmount: 0,
            investmentAmmount: goalData.investmentAmmount,
            completionDate: goalData.completionDate,
            category: goalData.category,
            user: pb.authStore.record!.id
        });
    }catch(e) {
        console.error(e);
    }
}

export async function getGoals(): Promise<Goal[]> {
    const pb = new Pocketbase(process.env.POCKETBASE_URL);
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
        const goals = await pb.collection("goals").getFullList();

        return goals.map((goal) => {
            return {
                id: goal.id,
                name: goal.name,
                description: goal.description,
                goalAmmount: goal.goalAmmount,
                currentAmmount: goal.currentAmmount,
                investmentAmmount: goal.investmentAmmount,
                completionDate: goal.completionDate,
                category: goal.category,
            }
        }) 

    }catch(e) {
        console.error(e);
        return [];
    }
}
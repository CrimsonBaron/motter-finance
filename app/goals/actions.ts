"use server"
import { Goal } from "@/lib/types/goal-types";
import { cookies } from "next/headers";
import Pocketbase from "PocketBase";

export async function createGoal(goalData: {
  name: string;
  description: string;
  category: string;
  targetAmount: number;
  linkedAccounts: string[];
  targetDate: Date; 
}) {
  const pb = new Pocketbase(process.env.POCKETBASE_URL);
  pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

  try {
    await pb.collection("goals").create({
      name: goalData.name,
      description: goalData.description,
      targetAmount: goalData.targetAmount,
      currentAmount: 0, 
      linkedAccounts: goalData.linkedAccounts,
      targetDate: goalData.targetDate, 
      category: goalData.category,
      progress: 0, 
      user: pb.authStore.record!.id,
    });
  } catch (e) {
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
        category: goal.category,
        targetAmount: goal.targetAmount, 
        currentAmount: goal.currentAmount, 
        linkedAccountId: goal.linkedAccounts, 
        targetDate: new Date(goal.targetDate), 
        progress: (goal.currentAmount / goal.targetAmount) * 100 || 0, 
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}
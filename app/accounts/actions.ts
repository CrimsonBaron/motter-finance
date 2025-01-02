"use server"

import { Account } from "@/lib/types/account-types";
import { cookies } from "next/headers";
import Pocketbase from "PocketBase"

export async function getAccounts(): Promise<Account[]> {
    const pb = new Pocketbase(process.env.POCKETBASE_URL);
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    try {
        const accounts = await pb.collection("accounts").getFullList();
        return accounts.map((account) => {
            return {
                id: account.id,
                name: account.name,
                description: account.description,
                type: account.type,
                currency: account.currency,
                balance: account.balance,
            }
        })

    }catch(e) {
        console.error(e);
        return [];
    }
}

export async function createAccount(accountData : {name: string, description: string, type: string, currency: string, balance: number}) {
    const pb = new Pocketbase(process.env.POCKETBASE_URL);
    pb.authStore.loadFromCookie(cookies().toString(), "pb_auth");

    const newAccount = {
        name: accountData.name,
        description: accountData.description,
        type: accountData.type,
        currency: accountData.currency,
        balance: accountData.balance,
        user: pb.authStore.record!.id
    }

    try {
        await pb.collection("accounts").create(newAccount);
    }catch(e) {
        console.error(e);
    }
}
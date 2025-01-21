"use client"

import { getAccounts } from "@/app/accounts/actions";
import { getBudgets } from "@/app/budgets/actions";
import { getGoals } from "@/app/goals/actions";
import { createTransaction } from "@/app/transactions/actions";
import { Account } from "@/lib/types/account-types";
import { DtoBudgetIn } from "@/lib/types/budget-type";
import { Goal } from "@/lib/types/goal-types";
import { DtoTransactionOut } from "@/lib/types/transcation-types";
import { useEffect, useState } from "react";

export function useTransaction(step: number, setIsOpened: (value: boolean) => void, setStep: (value: number) => void) {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [budgets, setBudgets] = useState<DtoBudgetIn[]>([]);

    const handleSubmit = async (event: React.FormEvent) => { 
        event.preventDefault(); 
        const formData = new FormData(event.target as HTMLFormElement); 
        const amount = parseFloat(formData.get('amount') as string); 
        const notes = formData.get('notes') as string;

        switch (step) {
            case 2: // Outgoing transaction
                try {
                    const recipient = formData.get('recipient') as string;
                    const newTransaction: DtoTransactionOut = {
                        account: accounts[0].id, // You might need to get the default account ID here
                        amount: amount,
                        isOutgoing: true,
                        description: `Transfer to ${recipient}`,
                        category: 'Tech', // Or another suitable category
                        budget: ``,
                        goal: '',
                        inAccount: '',
                        notes: notes,
                        isIncoming: false
                    };

                    await createTransaction(newTransaction); 
                    console.log('Outgoing transaction created:', newTransaction);
                    setIsOpened(false); 
                    setStep(1);
                } catch (error) {
                    console.error('Error creating outgoing transaction:', error);
                }
                break;

            case 3: // Account transaction
                try {
                    const recipientAccount = formData.get('recipientAccount') as string;
                    const newTransaction: DtoTransactionOut = {
                        account: '', // Get the source account ID
                        amount: amount,
                        isOutgoing: false,
                        description: `Transfer to ${recipientAccount}`,
                        category: 'Transfer',
                        budget: '',
                        goal: '',
                        inAccount: recipientAccount,
                        notes: notes,
                        isIncoming: false
                    };

                    await createTransaction(newTransaction);
                    console.log('Account transaction created:', newTransaction);
                    setIsOpened(false); 
                } catch (error) {
                    console.error('Error creating account transaction:', error);
                }
                break;

            case 4: // Goal transaction
                try {
                    const goal = formData.get('goal') as string;
                    const newTransaction: DtoTransactionOut = {
                        account: '', // Get the source account ID
                        amount: amount,
                        isOutgoing: false,
                        description: `Contribution to goal ${goal}`,
                        category: 'Goal',
                        budget: '',
                        goal: goal,
                        inAccount: '',
                        notes: notes,
                        isIncoming: false
                    };

                    await createTransaction(newTransaction);
                    console.log('Goal transaction created:', newTransaction);
                    setIsOpened(false); 
                    setStep(1);
                } catch (error) {
                    console.error('Error creating goal transaction:', error);
                }
                break;

            case 5: // Budget transaction
                try {
                    const budget = formData.get('budget') as string;
                    const newTransaction: DtoTransactionOut = {
                        account: '', // Get the source account ID
                        amount: amount,
                        isOutgoing: false,
                        description: `Expense from budget ${budget}`,
                        category: 'Budget',
                        budget: budget,
                        goal: '',
                        inAccount: '',
                        notes: notes,
                        isIncoming: false
                    };

                    await createTransaction(newTransaction); 
                    console.log('Budget transaction created:', newTransaction);
                    setIsOpened(false);
                    setStep(1);
                    
                } catch (error) {
                    console.error('Error creating budget transaction:', error);
                }
                break;
                case 6: // incoming transaction
                try {
                    const from = formData.get('from') as string;
                    const newTransaction: DtoTransactionOut = {
                        account: '', // Get the source account ID
                        amount: amount,
                        isOutgoing: false,
                        description: `Income from ${from}`,
                        category: 'Budget',
                        budget: '',
                        goal: '',
                        inAccount: '',
                        notes: notes,
                        isIncoming: true
                    };

                    await createTransaction(newTransaction); 
                    console.log('Budget transaction created:', newTransaction);
                    setIsOpened(false);
                    setStep(1);
                    
                } catch (error) {
                    console.error('Error creating budget transaction:', error);
                }
                break;
        }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            const accounts = await getAccounts()
            setAccounts(accounts);
        }

        const fetchGoals = async () => { 
            const goals = await getGoals()
            setGoals(goals);
        }

        const fetchBudgets = async () => {
            const budgets = await getBudgets()
            setBudgets(budgets);
        }

        fetchAccounts();
        fetchGoals();
        fetchBudgets();

    }, []);

    return {
        accounts,
        goals,
        budgets,
        handleSubmit,
    };


}
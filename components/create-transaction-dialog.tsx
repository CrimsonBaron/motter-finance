"use client"

import { ArrowLeft, ArrowLeftRight, ArrowRightLeft, BadgeCent, Goal as GoalIcon, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { Separator } from "./ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Account } from "@/lib/types/account-types"
import { getAccounts } from "@/app/accounts/actions"
import { Goal } from "@/lib/types/goal-types"
import { getGoals } from "@/app/goals/actions"

export default function CreateTransactionDialog() {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const accounts = await getAccounts()
            setAccounts(accounts);
        }

        const fetchGoals = async () => { 
            const goals = await getGoals()
            setGoals(goals);
        }

        fetchAccounts();
        fetchGoals();

    }, []);


    return (
        <Dialog onOpenChange={setIsOpened} open={isOpened}>
            <DialogTrigger asChild>
                <Button className="ml-auto">
                    <Plus size={24} />
                    <span className="ml-2">Create Transaction</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                {step !== 1 && (<ArrowLeft onClick={() => setStep(1)} />)}
                <DialogHeader>
                    <DialogTitle>Create Transaction</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new transaction
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <>
                        <div className="flex flex-col gap-4">
                                <div 
                                    className="flex items-center space-x-4 rounded-md border-2 p-4"
                                    onClick={() => setStep(2)}
                                >
                                    <ArrowRightLeft />
                                    <div className="flex flex-col">
                                        <Label className="mb-1">Outgoing transaction</Label>
                                        <span className="text-sm text-slate-900/50 leading-3 ">
                                            transfer money from your account to another account not recorded in this app
                                        </span>
                                    </div>
                                </div>
                                <div 
                                    className="flex items-center space-x-4 rounded-md border-2 p-4"
                                    onClick={() => setStep(3)}
                                >
                                    <ArrowLeftRight />
                                    <div className="flex flex-col">
                                        <Label className="mb-1">Account transaction</Label>
                                        <span className="text-sm text-slate-900/50 leading-3 ">
                                            transfer money from your account to another account
                                        </span>
                                    </div>
                                </div>
                                <div 
                                    className="flex items-center space-x-4 rounded-md border-2 p-4"
                                    onClick={() => setStep(4)}
                                >
                                    <GoalIcon />
                                    <div className="flex flex-col">
                                        <Label className="mb-1">Goal transaction</Label>
                                        <span className="text-sm text-slate-900/50 leading-3 ">
                                            transfer money towards a goal
                                        </span>
                                    </div>
                                </div>
                                <div 
                                    className="flex items-center space-x-4 rounded-md border-2 p-4"
                                    onClick={() => setStep(5)}
                                >
                                    <BadgeCent />
                                    <div className="flex flex-col">
                                        <Label className="mb-1">Budget transaction</Label>
                                        <span className="text-sm text-slate-900/50 leading-3 ">
                                             Money taken from budget
                                        </span>
                                    </div>
                                </div>
                        </div>
                    </>
                )}

                {
                    step === 2 && (
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="text">Recipient</Label>
                            <Input 
                                type="text" 
                                placeholder="account123"
                            />
                            <Label htmlFor="number">Amount</Label>
                            <Input 
                                type="number" 
                                placeholder="1000"
                            />
                            <Separator />
                            <Label htmlFor="text">Notes</Label>
                            <Input 
                                type="text" 
                                placeholder="money money this account holds money"
                            />
                            <Button>Create Transaction</Button>
                        </div>
                    )
                }

                {
                    step === 3 && (
                        <div className="flex flex-col gap-4">
                            <Label>Recipient Account</Label>
                            <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a Account" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Checking</SelectLabel>
                                    {accounts.map((account) => {
                                        return account.type === 'checking' && (
                                            <SelectItem value={account.id}>{account.name}</SelectItem>
                                        )
                                    })}
                                    <SelectLabel>Savings</SelectLabel>
                                    {accounts.map((account) => {
                                        return account.type === 'saving' && (
                                            <SelectItem value={account.id}>
                                                {account.name} 
                                            </SelectItem>
                                        )
                                    })}
                                  </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Label>Amount</Label>
                            <Input type="number" placeholder="1000" />
                            <Separator />
                            <Label>Notes</Label>
                            <Input type="text" placeholder="money money this account holds money" />
                            <Button>Create Transaction</Button>
                        </div>
                    )
                }
                    
                    {
                        step === 4 && (
                            <div className="flex flex-col gap-4">
                                <Label>Select Goal</Label>
                                <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a Account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {goals.map((goal) => {
                                            return (
                                                <SelectItem key={goal.id} value={goal.id}>{goal.name}</SelectItem>
                                            )
                                        })}
                                      </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Label>Amount</Label>
                                <Input type="number" placeholder="1000" />
                                <Separator />
                                <Label>Notes</Label>
                                <Input type="text" placeholder="money money this account holds money" />
                                <Button>Create Transaction</Button>
                            </div>
                        )
                    }
    
                    {
                        step === 5 && (
                            <div className="flex flex-col gap-4">
                                
                            </div>
                        )
                    }

            </DialogContent>
        </Dialog>
    )
}
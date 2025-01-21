"use client"

import { ArrowDownUp, ArrowLeft, ArrowLeftRight, ArrowRightLeft, BadgeCent, Goal as GoalIcon, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useState } from "react"
import { Separator } from "./ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useTransaction } from "@/hooks/use-transaction"


export default function CreateTransactionDialog() {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    const { accounts, goals, budgets, handleSubmit } = useTransaction(step, setIsOpened, setStep);

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

                {/* Step 1: Transaction Type Selection */}
                {step === 1 && (
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
                            onClick={() => setStep(6)}
                        >
                            <ArrowDownUp />
                            <div className="flex flex-col">
                                <Label className="mb-1">Incoming transaction</Label>
                                <span className="text-sm text-slate-900/50 leading-3 ">
                                    log your incoming transactions
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
                )}

                {/* Step 2: Outgoing Transaction Form */}
                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="recipient">Recipient</Label> 
                            <Input 
                                type="text" 
                                placeholder="account123"
                                name="recipient"
                            />
                            <Label htmlFor="amount">Amount</Label>
                            <Input 
                                type="number" 
                                placeholder="1000"
                                name="amount"
                            />
                            <Separator />
                            <Label htmlFor="notes">Notes</Label>
                            <Input 
                                type="text" 
                                placeholder="money money this account holds money"
                                name="notes"
                            />
                            <Button type="submit">Create Transaction</Button> 
                        </div>
                    </form>
                )}

                {/* Step 3: Account Transaction Form */}
                {step === 3 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <Label>Recipient Account</Label>
                            <Select name="recipientAccount"> {/* Add name attribute to Select */}
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a Account" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Checking</SelectLabel>
                                    {accounts.map((account) => {
                                        return account.type === 'checking' && (
                                            <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                                        )
                                    }
                                    )}
                                    <SelectLabel>Savings</SelectLabel>
                                    {accounts.map((account) => {
                                        return account.type === 'saving' && (
                                            <SelectItem key={account.id} value={account.id}>
                                                {account.name} 
                                            </SelectItem>
                                        )
                                    })}
                                  </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Label htmlFor="amount">Amount</Label>
                            <Input type="number" placeholder="1000" name="amount" />
                            <Separator />
                            <Label htmlFor="notes">Notes</Label>
                            <Input type="text" placeholder="money money this account holds money" name="notes" />
                            <Button type="submit">Create Transaction</Button>
                        </div>
                    </form>
                )}
                    
                {/* Step 4: Goal Transaction Form */}
                {step === 4 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <Label>Select Goal</Label>
                            <Select name="goal"> {/* Add name attribute to Select */}
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a goal" />
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
                            <Label htmlFor="amount">Amount</Label>
                            <Input type="number" placeholder="1000" name="amount" />
                            <Separator />
                            <Label htmlFor="notes">Notes</Label>
                            <Input type="text" placeholder="money money this account holds money" name="notes" />
                            <Button type="submit">Create Transaction</Button>
                        </div>
                    </form>
                )}

                {/* Step 5: Budget Transaction Form */}
                {step === 5 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <Label>Select Budget</Label>
                            <Select name="budget"> {/* Add name attribute to Select */}
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a budget" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {budgets.map((budget) => {
                                        return (
                                            <SelectItem key={budget.id} value={budget.id}>{budget.name}</SelectItem>
                                        )
                                    })}
                                  </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Label htmlFor="amount">Amount</Label>
                            <Input type="number" placeholder="1000" name="amount" />
                            <Separator />
                            <Label htmlFor="notes">Notes</Label>
                            <Input type="text" placeholder="money money this account holds money" name="notes" />
                            <Button type="submit">Create Transaction</Button>
                        </div>
                    </form>
                )}

                {/* Step 2: Outgoing Transaction Form */}
                {step === 6 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="from">From</Label> 
                            <Input 
                                type="text" 
                                placeholder="account123"
                                name="from"
                            />
                            <Label htmlFor="amount">Amount</Label>
                            <Input 
                                type="number" 
                                placeholder="1000"
                                name="amount"
                            />
                            <Separator />
                            <Label htmlFor="notes">Notes</Label>
                            <Input 
                                type="text" 
                                placeholder="money money this account holds money"
                                name="notes"
                            />
                            <Button type="submit">Create Transaction</Button> 
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )}
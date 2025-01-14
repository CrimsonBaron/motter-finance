"use client"

import { ArrowLeftRight, ArrowRightLeft, BadgeCent, Goal, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useState } from "react"

export default function CreateTransactionDialog() {
    const [step, setStep] = useState<number>(1);


    return (
        <Dialog>
            <DialogTrigger>
                <Button className="w-full">
                    <Plus size={24} />
                    <span className="ml-2">Create Transaction</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
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
                                >
                                    <Goal />
                                    <div className="flex flex-col">
                                        <Label className="mb-1">Goal transaction</Label>
                                        <span className="text-sm text-slate-900/50 leading-3 ">
                                            transfer money towards a goal
                                        </span>
                                    </div>
                                </div>
                                <div 
                                    className="flex items-center space-x-4 rounded-md border-2 p-4"
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

            </DialogContent>
        </Dialog>
    )
}
"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react";
import { CalendarIcon, Plus } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { useRouter } from "next/navigation";
import { createBudget } from "@/app/budgets/actions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DtoBudgetOut } from "@/lib/types/budget-type";



  
export default function CreateBudgetDialog() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<"Monthly Expenses"| "Project Budget"| "Travel Budget"| "Holiday Budget"| "Special Occasion">("Monthly Expenses");
    const [period, setPeriod] = useState<"monthly" | "yearly" | "daily">("monthly");
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [amount, setAmount] = useState<number>(0);

  

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {isMobile} = useSidebar();
    const router = useRouter();

    const closeDialog = () => setIsOpen(false);

    const handleSubmit = async () => {
        if (!name || !category || !period || !startDate || !endDate || !amount) {
            console.error("missing required fields");
            return;
        }

        const budget: DtoBudgetOut = {
            name: name,
            description: description,
            category: category,
            period: period,
            budgetAmount: amount,
            startDay: startDate,
            endDay: endDate,
        }

        try {
            await createBudget(budget);
            closeDialog();

            setName("");
            setDescription("");
            setCategory("Monthly Expenses");
            setPeriod("monthly");
            setStartDate(undefined);
            setEndDate(undefined);
            setAmount(0);

            router.refresh();
        }catch(e) {
            console.error(e);
        }

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="ml-auto" size={isMobile? "icon" : "default"}>
                    <Plus />
                    {isMobile ? null : "Set Budget"}
                </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set new Budget</DialogTitle>
                <DialogDescription>
                  Set a new budget to track your expenses
                </DialogDescription>
                <Separator/>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="text">Name</Label>
                  <Input 
                    type="text" 
                    placeholder="budget123"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Label htmlFor="text">Description</Label>
                  <Textarea 
                    placeholder="i want a new ..... so i need to save"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Separator />
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-1 flex-col gap-4">
                        <Label htmlFor="text">Category</Label>
                        <Select 
                            defaultValue={category}
                            value={category}
                            onValueChange={(e) => setCategory(e as "Monthly Expenses" | "Project Budget" | "Travel Budget" | "Holiday Budget" | "Special Occasion")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monthly Expenses">Monthly Expenses</SelectItem>
                            <SelectItem value="Project Budget"> Project Budget</SelectItem>
                            <SelectItem value="Travel Budget"> Travel Budget</SelectItem>
                            <SelectItem value="Holiday Budget">Holiday Budget</SelectItem>
                            <SelectItem value="Special Occasion">Special Occasion</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex flex-1 flex-col gap-4">
                        <Label htmlFor="text">Period</Label>
                        <Select 
                            defaultValue={period}
                            onValueChange={(e) => setPeriod(e as "monthly" | "yearly" | "daily")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">monthly</SelectItem>
                            <SelectItem value="yearly">yearly</SelectItem>
                            <SelectItem value="daily">daily</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>                
                  </div>
                  <Separator />
                   <Label htmlFor="number">Amount</Label>
                    <Input 
                        type="number" 
                        placeholder="1000"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <Separator />
                    <div className="flex flex-row gap-4">
                    <div className="flex flex-1 flex-col gap-4 w-fit">
                        <Label htmlFor="text">Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal rounded-md",
                                !startDate && "text-muted-foreground"
                              )}        
                            >
                              {startDate ? (startDate.toLocaleDateString()) : (<span>Pick a date</span>)}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"  
                                selected={startDate}
                                onSelect={setStartDate}     
                              />
                          </PopoverContent>
                        </Popover>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex flex-1 flex-col gap-4">
                        <Label htmlFor="text">End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal rounded-md",
                                !endDate && "text-muted-foreground"
                              )}        
                            >
                              {endDate ? (endDate.toLocaleDateString()) : (<span>Pick a date</span>)}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"  
                                selected={endDate}
                                onSelect={setEndDate}     
                              />
                          </PopoverContent>
                        </Popover>
                    </div>                
                  </div>
                  <Button onClick={handleSubmit}>Set Budget</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
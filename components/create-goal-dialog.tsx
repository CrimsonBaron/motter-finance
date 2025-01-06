"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { createGoal } from "@/app/goals/actions";
import { useRouter } from "next/navigation";

export default function CreateGoalDialog() {
  const [goalName, setGoalName] = useState<string>("");
  const [goalDescription, setGoalDescription] = useState<string>("");
  const [goalCategory, setGoalCategory] = useState<string>("Emergency Fund");
  const [targetAmount, setTargetAmount] = useState<number>(1);
  const [investmentAmount, setInvestmentAmount] = useState<number>(1);
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>([]); 
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isMobile } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    const calculateTargetDate = () => {
      const monthsToReachGoal = ((targetAmount / investmentAmount) | 0);
      const newTargetDate = new Date();
      newTargetDate.setMonth(newTargetDate.getMonth() + monthsToReachGoal);
      return newTargetDate;
    };

    const date = calculateTargetDate();
    setTargetDate(date);
  }, [targetAmount, investmentAmount]); 



  const closeDialog = () => setIsOpen(false);

  const handleSubmit = async () => {
    if (!goalName || !goalCategory || !targetAmount) {
      console.error("Missing required fields");
      return;
    }

    const newGoal = {
      name: goalName,
      description: goalDescription,
      category: goalCategory,
      targetAmount: targetAmount,
      linkedAccounts: linkedAccounts, 
      targetDate: targetDate,
    };

    try {
      await createGoal(newGoal);
      // Reset form fields after successful submission
      setGoalName("");
      setGoalDescription("");
      setGoalCategory("Emergency Fund");
      setTargetAmount(0);
      setLinkedAccounts([]);
      setTargetDate(new Date());

      closeDialog();
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto" size={isMobile ? "icon" : "default"}>
          <Plus />
          {isMobile ? null : "Set a Goal"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set a new Goal</DialogTitle>
          <DialogDescription>Set a new savings goal.</DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label htmlFor="text">Goal name</Label>
          <Input
            type="text"
            placeholder="new macbook...."
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
          <Label htmlFor="text">Description</Label>
          <Textarea
            placeholder="budget for my new macbook pro"
            value={goalDescription}
            onChange={(e) => setGoalDescription(e.target.value)}
          />
          <Separator />
          <Label htmlFor="text">Goal type</Label>
          <Select
            defaultValue={goalCategory}
            value={goalCategory}
            onValueChange={(e) => setGoalCategory(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Emergency Fund">Emergency Fund</SelectItem>
              <SelectItem value="Major Purchases">Major Purchases</SelectItem>
              <SelectItem value="Travel and Leisure">
                Travel and Leisure
              </SelectItem>
              <SelectItem value="Investments">Investments</SelectItem>
              <SelectItem value="Life Event">Life Event</SelectItem>
            </SelectContent>
          </Select>
          <Separator />
          <div className="flex flex-1 flex-row gap-4">
            <div className="flex flex-col gap-4">
            <Label htmlFor="text">Target Amount</Label>
            <Input
              type="number"
              placeholder="1000"
              value={targetAmount}
              onChange={(e) => {
                setTargetAmount(parseInt(e.target.value));
              }}
            />
            </div>
            <Separator orientation="vertical"/>
            <div className="flex flex-col gap-4">
            <Label htmlFor="text">Investment Amount</Label>
            <Input
              type="number"
              placeholder="1000"
              value={investmentAmount}
              onChange={(e) => {
                setInvestmentAmount(parseInt(e.target.value));
              }}
            />
            </div>
          </div>
          <Separator />
          <Label htmlFor="number">Estimated Target Date</Label>
          <div className="p-2 rounded-md border">
            {targetDate.toDateString()}
          </div>
          <Button onClick={handleSubmit}>Set Goal</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
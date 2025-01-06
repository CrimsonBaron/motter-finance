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
import { createAccount } from "@/app/accounts/actions";
import { Plus } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { useRouter } from "next/navigation";



  
export default function CreateAccountDialog() {
    const [accountName, setAccountName] = useState<string>("");
    const [accountDescription, setAccountDescription] = useState<string>("");
    const [accountType, setAccountType] = useState<string>("checking");
    const [currencyType, setCurrencyType] = useState<string>("czk");
    const [initialBalance, setInitialBalance] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {isMobile} = useSidebar();
    const router = useRouter();

    const closeDialog = () => setIsOpen(false);

    const handleSubmit = async () => {
        if (!accountName || !accountDescription || !accountType || !currencyType || !initialBalance) {
            console.error("missing required fields");
            return;
        }

        const newAccout = {
            name: accountName,
            description: accountDescription,
            type: accountType,
            currency: currencyType,
            balance: initialBalance,
        }

        try {
            await createAccount(newAccout);
            closeDialog();
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
                    {isMobile ? null : "Add Account"}
                </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new Account</DialogTitle>
                <DialogDescription>
                  Create a new checkings or savings acount.
                </DialogDescription>
                <Separator/>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="text">Account name</Label>
                  <Input 
                    type="text" 
                    placeholder="account123"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                  <Label htmlFor="text">Description</Label>
                  <Textarea 
                    placeholder="money money this account holds money"
                    value={accountDescription}
                    onChange={(e) => setAccountDescription(e.target.value)}
                  />
                  <Separator />
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-1 flex-col gap-4">
                        <Label htmlFor="text">Account type</Label>
                        <Select 
                            defaultValue={accountType}
                            value={accountType}
                            onValueChange={(e) => setAccountType(e)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">checking</SelectItem>
                            <SelectItem value="saving">saving</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex flex-1 flex-col gap-4">
                        <Label htmlFor="text">Currency type</Label>
                        <Select 
                            defaultValue={currencyType}
                            onValueChange={(e) => setCurrencyType(e)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CZK">Kč</SelectItem>
                            <SelectItem value="EUR">€</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>                
                  </div>
                  <Separator />
                   <Label htmlFor="number">Initial balance</Label>
                    <Input 
                        type="number" 
                        placeholder="1000"
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(parseInt(e.target.value))}
                    />
                  <Button onClick={handleSubmit}>Create Account</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
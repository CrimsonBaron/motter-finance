"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Goal } from "@/lib/types/goal-types";

export const columns: ColumnDef<Goal>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category");
      const className = `${
        category === "Major Purchases"
          ? "bg-blue-100 text-blue-800"
          : category === "Emergency Fund"
          ? "bg-red-100 text-red-800"
          : category === "Travel and Leisure"
          ? "bg-green-100 text-green-800"
          : category === "Education"
          ? "bg-yellow-100 text-yellow-800"
          : category === "Investments"
          ? "bg-purple-100 text-purple-800"
          : category === "Life Event"
          ? "bg-pink-100 text-pink-800"
          : ""
      }`;
      return (
        <Badge className={className}>{row.getValue("category")}</Badge>
      );
    },
  },
  {
    accessorKey: "targetAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Target Amount
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("targetAmount");
      const currency = "CZK";
      const locale = "cs-CZ";

      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(amount as number);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "currentAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Amount
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("currentAmount");
      const currency = "CZK";
      const locale = "cs-CZ";

      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(amount as number);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "targetDate",
    header: "Target Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("targetDate");

      if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
        const locale = "cs-CZ";
        const formatted = new Intl.DateTimeFormat(locale).format(dateValue);
        return <div>{formatted}</div>;
      } else {
        return <div>Invalid Date</div>;
      }
    },
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy goal ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View goal</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
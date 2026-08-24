"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type DataTableFeatures } from "@/components/mocules/data-table/features";

export type Category = {
  id: string;
  name: string;
  slug: string;
  template: string;
  isActive: boolean;
};

export const columns: ColumnDef<DataTableFeatures, Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "slug",
    header: "Slug",
  },

  {
    accessorKey: "template",
    header: "Template",
  },

  {
    accessorKey: "isActive",
    header: "Status",

    cell: ({ row }) => {
      const isActive = row.getValue<boolean>("isActive");

      return (
        <span className={isActive ? "text-green-600" : "text-gray-400"}>
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
];

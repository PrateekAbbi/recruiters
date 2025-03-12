"use client";

import { ColumnDef } from "@tanstack/react-table";

interface SentEmail {
  _id: string;
  name: string;
  email: string;
  sentAt: string; // Use Date if it's an actual Date object
}

export const columns: ColumnDef<SentEmail>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => row.original._id,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "sentAt",
    header: "Sent At",
    cell: ({ row }) => {
      const date = new Date(row.original.sentAt);
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Enables AM/PM format
      });
    },
  },
];

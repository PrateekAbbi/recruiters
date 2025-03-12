"use client";

import { useEffect, useState } from "react";
import {
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";

import { columns } from "@/components/Column";

export function DataTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [recruiters, setRecruiters] = useState([]);

  const getData = async () => {
    try {
      // Check if cached data exists
      const cachedData = localStorage.getItem("recruiters");
      console.log(cachedData);
      if (cachedData) {
        console.log("Using cached data");
        setRecruiters(JSON.parse(cachedData!));
        return;
      }

      // If no cache, fetch from API
      console.log("Fetching from API...");
      const res = await fetch(`/api/storeEmail`);
      const data = await res.json();

      // Update state & cache
      setRecruiters(data.recruiters);
      localStorage.setItem("recruiters", JSON.stringify(data.recruiters));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data only when component mounts
  }, []);

  const table = useReactTable({
    data: recruiters,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnIds, filterValue) => {
      if (!filterValue) return true; // If no search input, return all rows

      const search = filterValue.toString().toLowerCase();

      const name = row.getValue("name")?.toString().toLowerCase() || "";
      const email = row.getValue("email")?.toString().toLowerCase() || "";

      return name.includes(search) || email.includes(search);
    },
  });

  const showEmptyState = table.getRowModel().rows?.length === 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#1e1e1e] rounded-2xl shadow-lg border border-gray-700 z-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mb-4">
        {/* Search Input */}
        <div className="w-full">
          <Input
            placeholder="Search by name or email..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="p-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {showEmptyState ? (
        <div className="flex h-80 flex-col items-center justify-center gap-8 rounded-lg border border-slate-6 p-6">
          No Recruiter found with the given email or name
        </div>
      ) : (
        <>
          {/* Table Container */}
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-700">
            <Table className="w-full text-left border-collapse">
              {/* Table Header */}
              <TableHeader className="bg-[#121212] text-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-gray-700"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="p-4 text-xs font-bold text-gray-300 tracking-wider bg-[#1a1a1a]"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              {/* Table Body */}
              <TableBody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      className={`border-b border-gray-700 transition ${
                        index % 2 === 0 ? "bg-[#1e1e1e]" : "bg-[#2a2a2a]"
                      } hover:bg-[#383838]`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="p-4 text-gray-300 text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className="p-4 text-center text-gray-400"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between w-full py-4">
            <span className="text-gray-400 font-medium text-sm">
              Page {pagination.pageIndex + 1} of {table.getPageCount()}
            </span>

            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 text-sm font-semibold border border-gray-600 bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a] transition rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!table.getCanPreviousPage()}
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }))
                }
              >
                Prev
              </button>

              <button
                className="px-4 py-2 text-sm font-semibold border border-gray-600 bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a] transition rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!table.getCanNextPage()}
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

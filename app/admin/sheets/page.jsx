"use client";

import AdminNavbar from "@/components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";

import { Label } from "@/components/ui/label";

export default function Page() {
  const [sheets, setSheets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [newSheetData, setNewSheetData] = useState({
    title: "",
    description: "",
  });

  const sheetDataChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewSheetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createSheet = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/create-sheet`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newSheetData),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        console.log("Error creating sheet", err);
        alert("Unable to create sheet");
        return;
      }

      const response = await res.json();

      // ⭐ instantly show new sheet
      setSheets((prev) => [response.data, ...prev]);

      // reset form
      setNewSheetData({ title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-sheets`,
          { credentials: "include" },
        );

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSheets(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSheets();
  }, []);

  // SEARCH
  const filteredSheets = sheets.filter((sheet) =>
    sheet.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNavbar />

      <div className="mx-auto max-w-6xl px-6 pt-12">
        <h1 className="text-2xl font-semibold tracking-tight">Sheets</h1>
        <p className="text-neutral-400 text-sm mt-1">
          Structured problem solving roadmap
        </p>

        {/* Search */}
        <div className="flex justify-between pl-10 pr-20 items-center">
          <div className="flex gap-3 mt-6">
            <Input
              placeholder="Search sheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs bg-neutral-950 border-neutral-800 overflow-hidden"
            />
            <Button className="cursor-pointer">Search</Button>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-neutral-100 hover:bg-neutral-300">
                  Add Sheet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Sheet Information</DialogTitle>
                  <DialogDescription>
                    Provide problem information here.. Click save once done
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newSheetData.title}
                      onChange={sheetDataChangeHandler}
                      placeholder="DSA Sheet"
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      value={newSheetData.description}
                      onChange={sheetDataChangeHandler}
                      className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm"
                      placeholder="Sheet description goes here"
                    />
                  </Field>
                </FieldGroup>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={createSheet}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="h-px bg-neutral-800 mt-8 mb-8" />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* LOADING SKELETON */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 animate-pulse space-y-4"
              >
                <div className="h-4 w-2/3 bg-neutral-800 rounded" />
                <div className="h-3 w-1/3 bg-neutral-800 rounded" />
                <div className="h-2 w-full bg-neutral-800 rounded" />
                <div className="h-8 w-full bg-neutral-800 rounded" />
              </div>
            ))}

          {/* CARDS */}
          {!loading &&
            filteredSheets.map((sheet) => {
              const progress = "28%";

              return (
                <Card
                  key={sheet.id}
                  className="border-neutral-800 bg-neutral-950 flex flex-col justify-between"
                >
                  <CardHeader className="space-y-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{sheet.title}</CardTitle>

                      <Badge
                        variant="outline"
                        className="text-xs border-neutral-700 text-neutral-300"
                      >
                        Beginner
                      </Badge>
                    </div>

                    <CardDescription className="text-xs text-neutral-400 line-clamp-2">
                      {sheet.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full">
                      <div
                        className="h-1.5 bg-white rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-neutral-500 text-right">
                      {progress}%
                    </p>
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant="outline"
                      className=" cursor-pointer w-full border-neutral-700 hover:bg-neutral-800 text-xs"
                    >
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}

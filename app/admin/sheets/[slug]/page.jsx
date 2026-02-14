"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Plus, ChevronDown, GripVertical, Pencil, Trash2 } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";

export default function SectionManagement() {
  const [openSectionId, setOpenSectionId] = useState(null);
  const [sheetData, setSheetData] = useState(null);
  const { slug } = useParams();
  console.log("Slug is :", slug);

  // ───────────────── FETCH SHEET ─────────────────
  useEffect(() => {
    if (!slug) return;
    fetchSheet();
  }, [slug]);

  const fetchSheet = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sheet/${slug}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        const error = await res.json();
        console.log("Error while fetching sheet data", error);
        alert("Unable to fetch sheet data at the moment");
        return;
      }

      const response = await res.json();
      setSheetData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ───────────────── UI BEHAVIOUR ─────────────────
  const toggleSection = (id) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  // Prevent crash before fetch finishes
  if (!sheetData) {
    return (
      <div className="min-h-screen bg-black text-neutral-400">
        <AdminNavbar />
        <div className="p-10">Loading sheet...</div>
      </div>
    );
  }

  // ───────────────── UI ─────────────────
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <AdminNavbar />

      <main className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 pt-10 pb-24">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {sheetData.title}
            </h1>
            <p className="mt-1.5 text-sm text-neutral-400">
              {sheetData.description}
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black shadow-sm transition hover:bg-neutral-200 active:bg-neutral-300">
            <Plus size={16} strokeWidth={2.4} />
            Add Section
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sheetData.sections?.map((section) => {
            const isOpen = openSectionId === section.id;

            return (
              <div
                key={section.id}
                className={`group relative rounded-xl border border-neutral-800 bg-neutral-950/70 transition-all duration-200 ${
                  isOpen
                    ? "shadow-lg shadow-black/40"
                    : "hover:border-neutral-700"
                }`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`flex w-full items-center gap-4 px-5 py-4 text-left transition ${
                    isOpen ? "bg-neutral-900/60" : "hover:bg-neutral-900/40"
                  }`}
                >
                  <GripVertical
                    size={18}
                    className="hidden text-neutral-600 group-hover:block sm:block"
                  />

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-sm font-medium text-neutral-300">
                    {section.order}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium leading-tight">
                      {section.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-neutral-500">
                      {section.problems?.length || 0} problems
                    </p>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`ml-2 text-neutral-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Problems */}
                {isOpen && (
                  <div className="border-t border-neutral-800 bg-black/40 px-5 pb-5 pt-4">
                    {section.problems?.length > 0 ? (
                      <div className="space-y-1.5">
                        {section.problems.map((sp) => (
                          <div
                            key={sp.id}
                            className="group/prob flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition hover:bg-neutral-900/70"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <Link href={`${sp.problem.link}`}>
                                <span className="truncate">
                                  {sp.problem.title}
                                </span>
                              </Link>
                            </div>

                            <button className="invisible flex items-center gap-1.5 text-xs text-neutral-500 group-hover/prob:visible hover:text-neutral-300">
                              <Pencil size={13} />
                              Edit
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-sm text-neutral-500">
                          No problems in this section yet
                        </p>
                        <button className="mt-3 text-xs text-neutral-400 hover:text-neutral-200">
                          + Add first problem
                        </button>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-5 flex items-center justify-between border-t border-neutral-800/60 pt-4 text-xs">
                      <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-200">
                        <Plus size={14} />
                        Add Problem
                      </button>

                      <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-neutral-500 hover:bg-neutral-950 hover:text-red-400/90">
                        <Trash2 size={14} />
                        Delete Section
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

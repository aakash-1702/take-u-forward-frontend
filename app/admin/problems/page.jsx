"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState , useEffect} from "react";
import { Plus, Edit3 } from "lucide-react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    link: "",
    companies: [],
    tags: [],
  });

  const [companyInput, setCompanyInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Stop scrolling the whole page
      document.body.style.overflow = "hidden";
    } else {
      // Allow scrolling again when popup closes
      document.body.style.overflow = "";
    }

    // Very important: clean up when component disappears
    return () => {
      document.body.style.overflow = "";  
    };
  }, [isOpen]);

  const handleCompanyKeyDown = (e) => {
    if (e.key === "Enter" && companyInput.trim() !== "") {
      e.preventDefault();
      if (!formData.companies.includes(companyInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          companies: [...prev.companies, companyInput.trim()],
        }));
      }
      setCompanyInput("");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeCompany = (company) => {
    setFormData((prev) => ({
      ...prev,
      companies: prev.companies.filter((c) => c !== company),
    }));
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const body = {
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      link: formData.link,
      tags: formData.tags,
      companies: formData.companies,
    };

    console.log("Submitting:", body);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/create-problem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        },
      );

      if (!res.ok) {
        const error = await res.json();
        console.error("Create failed:", error);
        alert("Failed to create problem.");
        return;
      }

      const data = await res.json();
      console.log("Created:", data);
      alert("Problem created successfully!");
      setIsOpen(false);

      // Optional: reset form
      setFormData({
        title: "",
        description: "",
        difficulty: "",
        link: "",
        companies: [],
        tags: [],
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 px-10">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            placeholder="e.g. Two Sum"
            className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm outline-none focus:border-neutral-600 placeholder:text-neutral-500"
          />
          <Button
            size="sm"
            variant="secondary"
            className="hover:bg-neutral-400 cursor-pointer hover:text-neutral-900 bg-neutral-300 text-neutral-950"
          >
            Search
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Problems
          </Button>

          {/* Uncomment when you implement edit */}
          {/* <Button variant="outline" className="border-neutral-700 hover:bg-neutral-900">
            <Edit3 className="w-4 h-4 mr-2" /> Edit Problem
          </Button> */}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="relative z-10 w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl bg-neutral-950 ... animate-pop max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="px-7 pt-6 pb-4 border-b border-neutral-800">
                <h2 className="text-xl font-semibold">Create Problem</h2>
              </div>

              {/* Body */}
              <div className="px-7 py-6 space-y-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-400">Title</label>
                  <input
                    className="input"
                    placeholder="Two Sum"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-400">Link</label>
                  <input
                    className="input"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://leetcode.com/problems/two-sum"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-400">Difficulty</label>
                  <select
                    className="input"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select difficulty
                    </option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-400">
                    Description
                  </label>
                  <textarea
                    className="input h-28 resize-none"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Short explanation..."
                  />
                </div>

                {/* Companies */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-400">Companies</label>
                  <input
                    className="input"
                    placeholder="Type company name and press Enter (e.g. Google)"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onKeyDown={handleCompanyKeyDown}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.companies.map((company) => (
                      <span
                        key={company}
                        className="px-3 py-1 text-sm rounded-full bg-neutral-800 flex items-center gap-2"
                      >
                        {company}
                        <button
                          onClick={() => removeCompany(company)}
                          className="text-neutral-400 hover:text-red-400"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-400">Tags</label>
                  <input
                    className="input"
                    placeholder="Type tag and press Enter (e.g. array)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-neutral-800 flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-neutral-400 hover:text-red-400"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-7 py-4 border-t border-neutral-800 bg-neutral-950/60">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm"
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 text-sm font-medium"
                  onClick={handleSubmit}
                >
                  Create Problem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

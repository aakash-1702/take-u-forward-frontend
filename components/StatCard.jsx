import React from "react";

const StatCard = ({ value, label }) => {
  return (
    <div
      className="
      group relative overflow-hidden
      rounded-xl border border-neutral-200/70 dark:border-neutral-800
      bg-white/70 dark:bg-neutral-900/70
      backdrop-blur-md
      px-8 py-7 text-center
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl
    "
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-1 rounded-xl bg-amber-600/80 blur-xl" />
      </div>

      {/* content */}
      <div className="relative">
        <p className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {value}
        </p>

        <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
      </div>
    </div>
  );
};

export default StatCard;

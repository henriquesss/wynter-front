import React, { memo, useState } from "react";

interface NoteTableProps {
  // filterData: (search: string, sortBy: 'asc' | 'desc', priority?: 'low' | 'medium' | 'high') => void;
  setFilterParams: (params: {
    search: string;
    sortBy: "asc" | "desc";
    priority?: "low" | "medium" | "high";
  }) => void;
}

const NoteFilter: React.FC<NoteTableProps> = ({ setFilterParams }) => {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<"all" | "low" | "medium" | "high">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  return (
    <div>
      <section
        className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20"
        style={{ flexWrap: "wrap" }}
      >
        <input
          data-testid="filter-input"
          type="text"
          placeholder="Search"
          value={search}
          className="mr-10"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          data-testid="filter-select"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "all" | "low" | "medium" | "high")
          }
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          data-testid="filter-sort"
          className={`${sortBy === "asc" ? "outlined" : ""} ml-10`}
          onClick={() => setSortBy(sortBy === "asc" ? "desc" : "asc")}
        >
          sort by desc
        </button>
      </section>
      <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
        <button
          data-testid="filter-getData"
          onClick={() =>
            setFilterParams({
              search,
              sortBy,
              priority: priority === "all" ? undefined : priority,
            })
          }
        >
          Filter
        </button>
        <button
          data-testid="filter-reset"
          className="ml-10"
          onClick={() => {
            setSearch("");
            setPriority("all");
            setSortBy("asc");
            setFilterParams({ search: "", sortBy: "asc" });
          }}
        >
          Reset
        </button>
      </section>
    </div>
  );
};

export default memo(NoteFilter);

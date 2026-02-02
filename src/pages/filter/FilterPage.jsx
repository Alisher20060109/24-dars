import React, { useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const FilterPage = () => {
  const { data, isLoading } = useFetch({
    url: "/products",
    key: ["products"],
  });

  const products = data?.data || [];

  const allCategories = useMemo(() => {
    const cats = products.map((p) => p?.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p?.category === selectedCategory);
  }, [products, selectedCategory]);

  if (isLoading) return <div className="p-6">Loading...</div>;

  const [activeSize, setActiveSize] = useState("Large");

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* LEFT FILTERS */}
          <aside className="rounded-2xl border border-black/10 bg-white p-5 h-fit">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black">Filters</h3>
              <button
                type="button"
                className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
                aria-label="filter-icon"
              >
                {/* sliders icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-black/70">
                  <path
                    d="M4 6h10M18 6h2M14 6c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3ZM4 12h2M10 12h10M10 12c0 1.657-1.343 3-3 3S4 13.657 4 12s1.343-3 3-3 3 1.343 3 3ZM4 18h10M18 18h2M14 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="my-5 h-px bg-black/10" />

            {/* Categories (REAL WORKING) */}
            <div>
              <p className="text-sm font-semibold text-black">Categories</p>
              <div className="mt-3 space-y-2">
                {allCategories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={[
                        "w-full flex items-center justify-between text-left text-sm px-3 py-2 rounded-xl transition",
                        active ? "bg-black text-white" : "hover:bg-black/5 text-black/70",
                      ].join(" ")}
                    >
                      <span className="capitalize">{cat}</span>
                      <span className={active ? "text-white/80" : "text-black/30"}>›</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="my-5 h-px bg-black/10" />


            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-black">Price</p>
                <span className="text-xs text-black/40">$50 - $200</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-black/10 relative">
                <span className="absolute left-[12%] right-[18%] top-0 bottom-0 rounded-full bg-black" />
                <span className="absolute left-[12%] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-black" />
                <span className="absolute right-[18%] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-black" />
              </div>
            </div>

            <div className="my-5 h-px bg-black/10" />

            <div>
              <p className="text-sm font-semibold text-black">Colors</p>
              <div className="mt-4 grid grid-cols-6 gap-3">
                {["#00C853", "#FF1744", "#FFEA00", "#FF9100", "#00B0FF", "#0D47A1", "#7C4DFF", "#E040FB", "#FF4081", "#FFFFFF", "#000000"].map(
                  (c, i) => (
                    <button
                      key={i}
                      type="button"
                      className="h-7 w-7 rounded-full ring-1 ring-black/10 hover:ring-black/30 transition grid place-items-center"
                      style={{ backgroundColor: c }}
                      aria-label="color"
                    >
                      {i === 5 ? (
                        <span className="h-4 w-4 rounded-full bg-white grid place-items-center text-[10px] font-bold text-black">
                          ✓
                        </span>
                      ) : null}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="my-5 h-px bg-black/10" />

            <div>
              <p className="text-sm font-semibold text-black">Size</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => {
                  const active = activeSize === s;

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setActiveSize(s)}
                      className={[
                        "h-9 px-4 rounded-full text-xs font-medium transition",
                        active
                          ? "bg-black text-white shadow-sm"
                          : "bg-black/5 text-black/60 hover:bg-black/10",
                      ].join(" ")}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="my-6" />

            <button
              type="button"
              className="h-11 w-full rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition"
            >
              Apply Filter
            </button>
          </aside>

          {/* RIGHT PRODUCTS */}
          <div>
            {/* top row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-2xl font-bold text-black capitalize">{selectedCategory === "All" ? "Casual" : selectedCategory}</h2>
              <div className="flex items-center gap-3 text-xs text-black/50">
                <span>
                  Showing 1-{Math.min(10, filteredProducts.length)} of {filteredProducts.length} Products
                </span>
                <span className="hidden sm:inline-block">Sort by:</span>
                <button className="text-black text-xs font-semibold flex items-center gap-1">
                  Most Popular
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* products grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}   // ⚠️ route nomini tekshiring
                  className="group block"
                >
                  <div className="rounded-2xl bg-black/4 overflow-hidden">
                    <div className="h-55 flex items-center justify-center p-6">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-contain group-hover:scale-[1.03] transition duration-300"
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-[15px] font-semibold text-black line-clamp-1">
                    {p.title}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[#F6C343] text-sm">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalfAlt />
                    </div>
                    <span className="text-xs text-black/50">
                      {Number(p?.rating?.rate || 0).toFixed(1)}/5
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-black text-black">${p.price}</span>
                    <span className="text-base font-bold text-black/30 line-through">
                      ${Math.round(Number(p.price) / 0.8)}
                    </span>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-500">
                      -20%
                    </span>
                  </div>
                </Link>
              ))}
            </div>


            {/* empty state */}
            {filteredProducts.length === 0 ? (
              <div className="mt-10 text-center text-black/50">
                No products found for this category.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterPage;

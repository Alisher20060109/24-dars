import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";

function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const full = Math.floor(v);
  const hasHalf = v - full >= 0.5;

  return (
    <div className="flex items-center gap-1 text-[#F6C343]">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <FaStar key={i} />;
        if (i === full && hasHalf) return <FaStarHalfAlt key={i} />;
        return <FaStar key={i} className="opacity-20" />;
      })}
    </div>
  );
}

export default function SinglPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch({
    url: `products/${id}`,
    key: ["product", id],
  });

  const SingleProduct = data?.data;
  

  // UI states (logikani buzmaydi)
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const colors = [
    { name: "Olive", hex: "#4B4736" },
    { name: "Green", hex: "#234D45" },
    { name: "Navy", hex: "#2B2F49" },
  ];

  const [activeSize, setActiveSize] = useState("Large");
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);

  const price = Number(SingleProduct?.price || 0);
  const discount = 40;

  // -40% bo‘lsa eski narxni hisoblab beradi (designdagi ko‘rinishga mos)
  const oldPrice = useMemo(() => {
    if (!price) return 300;
    return Math.round(price / (1 - discount / 100));
  }, [price]);

  const { data: relData } = useFetch({
    url: `products?category=${encodeURIComponent(SingleProduct?.category || "")}`,
    key: ["related", SingleProduct?.category],
  });

  const related = (relData?.data || [])
    .filter((p) => p?.id !== SingleProduct?.id)
    .slice(0, 4);


  if (isLoading) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-20 rounded bg-black/10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              <div className="lg:order-2">
                <div className="rounded-[28px] bg-black/10 min-h-80 sm:min-h-105 lg:min-h-130" />
              </div>
              <div className="space-y-4">
                <div className="h-10 w-3/4 rounded bg-black/10" />
                <div className="h-5 w-40 rounded bg-black/10" />
                <div className="h-10 w-56 rounded bg-black/10" />
                <div className="h-20 w-full rounded bg-black/10" />
                <div className="h-12 w-full rounded bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) return <div className="p-6 text-red-500">Error: {String(error)}</div>;
  if (!SingleProduct) return <div className="p-6">Product not found</div>;


  const CART_KEY = "cart_items_v1";

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const setCart = (items) => localStorage.setItem(CART_KEY, JSON.stringify(items));

const addToCartLS = (product, { qty, size, color }) => {
  const cart = getCart();

  // bir xil product + size + color bo'lsa qty qo'shib boramiz
  const matchIndex = cart.findIndex(
    (x) => x.productId === product.id && x.size === size && x.color === color
  );

  if (matchIndex >= 0) {
    const updated = [...cart];
    updated[matchIndex] = { ...updated[matchIndex], qty: updated[matchIndex].qty + qty };
    setCart(updated);
    return;
  }

  const item = {
    id: `${product.id}_${size}_${color}`, // row id
    productId: product.id,
    title: product.title,
    image: product.image,
    price: Number(product.price || 0),
    qty,
    size,
    color,
    category: product.category,
  };

  setCart([...cart, item]);
};


  function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const full = Math.floor(v);
  const hasHalf = v - full >= 0.5;

  return (
    <div className="flex items-center gap-1 text-[#F6C343]">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && hasHalf) return <span key={i}>☆</span>;
        return <span key={i} className="opacity-20">★</span>;
      })}
    </div>
  );
}


  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
  {/* Back */}
  <div className="mb-6">
    <Link to="/home" className="text-black/70 hover:text-black duration-200">
      ← Back
    </Link>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
    {/* Left Image */}
    <div className="order-1 lg:order-2">
      <div className="rounded-[28px] bg-[#e0dddf] overflow-hidden flex items-center justify-center min-h-80 sm:min-h-105 lg:min-h-130">
        <img
          src={SingleProduct?.image}
          alt={SingleProduct?.title}
          className="w-[320px] h-80 sm:w-150 sm:h-150 object-contain p-8"
        />
      </div>
    </div>

    {/* Right Info */}
    <div className="order-3">
      {/* Title */}
      <h1 className="text-[28px] sm:text-[36px] font-black uppercase tracking-tight text-black leading-tight">
        {SingleProduct?.title}
      </h1>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-3">
        <Stars value={SingleProduct?.rating?.rate} />
        <span className="text-sm text-black/60">
          {Number(SingleProduct?.rating?.rate || 0).toFixed(1)}/5
        </span>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <p className="text-3xl font-black text-black">
          ${price || SingleProduct?.price}
        </p>
        <p className="text-2xl font-bold text-black/30 line-through">
          ${oldPrice}
        </p>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-500">
          -{discount}%
        </span>
      </div>

      {/* Desc */}
      <p className="mt-4 text-sm leading-relaxed text-black/60 max-w-xl">
        {SingleProduct?.description ||
          "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}
      </p>

      <div className="my-7 h-px w-full bg-black/10" />

      {/* Select Colors */}
      <div>
        <p className="text-sm text-black/60">Select Colors</p>

        <div className="mt-3 flex items-center gap-4">
          {colors.map((c) => {
            const active = activeColor?.hex === c.hex;
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => setActiveColor(c)}
                className={[
                  "relative h-10 w-10 rounded-full grid place-items-center transition",
                  "ring-1 ring-black/10",
                  active ? "ring-2 ring-black" : "hover:ring-black/40",
                ].join(" ")}
                aria-label={c.name}
                title={c.name}
              >
                <span
                  className="h-8 w-8 rounded-full block"
                  style={{ backgroundColor: c.hex }}
                />
                {active ? (
                  <span className="absolute text-white text-sm font-bold select-none">
                    ✓
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-7 h-px w-full bg-black/10" />

      {/* Choose Size */}
      <div>
        <p className="text-sm text-black/60">Choose Size</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {sizes.map((s) => {
            const active = activeSize === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setActiveSize(s)}
                className={[
                  "h-10 rounded-full px-6 text-sm font-medium transition",
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

      <div className="my-7 h-px w-full bg-black/10" />

      {/* Qty + Add */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
        {/* Qty */}
        <div className="h-12 rounded-full bg-black/5 flex items-center justify-between px-4 w-full sm:w-45">
          <button
            className="text-2xl leading-none text-black/70 hover:text-black transition"
            aria-label="decrease"
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="font-semibold text-black">{qty}</span>
          <button
            className="text-2xl leading-none text-black/70 hover:text-black transition"
            aria-label="increase"
            type="button"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button
          className="h-12 w-full rounded-full bg-black text-white font-medium hover:bg-black/80 transition shadow-sm"
          type="button"
          onClick={() => {
            if (!SingleProduct?.id) return;

            addToCartLS(SingleProduct, {
              qty,
              size: activeSize,
              color: activeColor?.name || activeColor?.hex || "Default",
            });
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* Category */}
      <p className="mt-4 text-xs text-black/40">
        Category:{" "}
        <span className="text-black/60">
          {SingleProduct?.category || "men's clothing"}
        </span>
      </p>
    </div>
  </div>
</div>


      <div className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Tabs */}
          <div className="border-b border-black/10">
            <div className="flex items-center justify-center gap-10 sm:gap-14 text-sm text-black/50">
              <button className="py-4 hover:text-black/70 transition">
                Product Details
              </button>

              <button className="py-4 text-black font-semibold relative">
                Rating &amp; Reviews
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-px h-0.5 w-56 sm:w-64 bg-black rounded-full" />
              </button>

              <button className="py-4 hover:text-black/70 transition">FAQs</button>
            </div>
          </div>

          {/* Header */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold text-black">All Reviews</h2>
              <span className="text-sm text-black/40">(451)</span>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* Filter icon */}
              <button
                type="button"
                className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 transition grid place-items-center"
                aria-label="Filter"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-black/70"
                >
                  <path
                    d="M4 6h10M18 6h2M14 6c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3ZM4 12h2M10 12h10M10 12c0 1.657-1.343 3-3 3S4 13.657 4 12s1.343-3 3-3 3 1.343 3 3ZM4 18h10M18 18h2M14 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Latest dropdown (static) */}
              <button
                type="button"
                className="h-10 px-4 rounded-full bg-black/5 hover:bg-black/10 transition flex items-center gap-2 text-sm text-black/70"
              >
                Latest
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

              {/* Write review */}
              <button
                type="button"
                className="h-10 px-5 rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition"
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-1 text-[#F6C343]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>

                <button
                  type="button"
                  className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
                  aria-label="More"
                >
                  <span className="text-black/40 text-xl leading-none">⋯</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <p className="font-semibold text-black">Samantha D.</p>
                <span className="h-5 w-5 rounded-full bg-emerald-500 grid place-items-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 7L10 17l-5-5"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-black/50">
                “I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow
                designer, I appreciate the attention to detail. It's become my favorite go-to shirt.”
              </p>

              <p className="mt-6 text-xs text-black/40">Posted on August 14, 2023</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-1 text-[#F6C343]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="opacity-20" />
                </div>

                <button
                  type="button"
                  className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
                  aria-label="More"
                >
                  <span className="text-black/40 text-xl leading-none">⋯</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <p className="font-semibold text-black">Alex M.</p>
                <span className="h-5 w-5 rounded-full bg-emerald-500 grid place-items-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 7L10 17l-5-5"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-black/50">
                “The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a
                UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.”
              </p>

              <p className="mt-6 text-xs text-black/40">Posted on August 15, 2023</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-1 text-[#F6C343]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                  <FaStar className="opacity-20" />
                </div>

                <button
                  type="button"
                  className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
                  aria-label="More"
                >
                  <span className="text-black/40 text-xl leading-none">⋯</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <p className="font-semibold text-black">Ethan R.</p>
                <span className="h-5 w-5 rounded-full bg-emerald-500 grid place-items-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 7L10 17l-5-5"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-black/50">
                “This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern
                caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.”
              </p>

              <p className="mt-6 text-xs text-black/40">Posted on August 16, 2023</p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-1 text-[#F6C343]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="opacity-20" />
                </div>

                <button
                  type="button"
                  className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
                  aria-label="More"
                >
                  <span className="text-black/40 text-xl leading-none">⋯</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <p className="font-semibold text-black">Olivia P.</p>
                <span className="h-5 w-5 rounded-full bg-emerald-500 grid place-items-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 7L10 17l-5-5"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-black/50">
                “As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles
                but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.”
              </p>

              <p className="mt-6 text-xs text-black/40">Posted on August 17, 2023</p>
            </div>

            {/* Card 5 */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-1 text-[#F6C343]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="opacity-20" />
                </div>

                <button
                  type="button"
                  className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
                  aria-label="More"
                >
                  <span className="text-black/40 text-xl leading-none">⋯</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <p className="font-semibold text-black">Liam K.</p>
                <span className="h-5 w-5 rounded-full bg-emerald-500 grid place-items-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 7L10 17l-5-5"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-black/50">
                “This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill.
                It's like wearing a piece of art that reflects my passion for both design and fashion.”
              </p>

              <p className="mt-6 text-xs text-black/40">Posted on August 18, 2023</p>
            </div>

            {/* Card 6 */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-1 text-[#F6C343]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>

                <button
                  type="button"
                  className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
                  aria-label="More"
                >
                  <span className="text-black/40 text-xl leading-none">⋯</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <p className="font-semibold text-black">Ava H.</p>
                <span className="h-5 w-5 rounded-full bg-emerald-500 grid place-items-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 7L10 17l-5-5"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-black/50">
                “I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout
                of the design make this shirt a conversation starter.”
              </p>

              <p className="mt-6 text-xs text-black/40">Posted on August 19, 2023</p>
            </div>
          </div>

          {/* Load more */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="h-11 px-8 rounded-full border border-black/15 bg-white text-sm font-medium text-black/70 hover:bg-black/5 transition"
            >
              Load More Reviews
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {related?.length ? (
          <div className="mt-16">
            <h2 className="text-center text-3xl sm:text-4xl font-black tracking-tight uppercase text-black">
              You Might Also Like
            </h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="rounded-2xl bg-black/4 overflow-hidden">
                    <div className="h-55 sm:h-60 flex items-center justify-center p-6">
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
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
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
          </div>
        ) : null}

      </div>

    </section>
  );
}

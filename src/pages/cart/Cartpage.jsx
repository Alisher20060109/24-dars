import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "cart_items_v1";

// delivery/discount (siz xohlagancha o'zgartiring)
const DISCOUNT_RATE = 0.2; // -20%
const DELIVERY_FEE = 15;

function formatMoney(n) {
  const num = Number(n || 0);
  return `$${num.toFixed(0)}`;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function Cartpage() {
  const [items, setItems] = useState(() => loadCart());
  const [promo, setPromo] = useState("");

  // sync to localStorage
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 1), 0);
  }, [items]);

  const discount = useMemo(() => subtotal * DISCOUNT_RATE, [subtotal]);

  const total = useMemo(() => {
    if (!items.length) return 0;
    return subtotal - discount + DELIVERY_FEE;
  }, [subtotal, discount, items.length]);

  const inc = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: (it.qty || 1) + 1 } : it))
    );
  };

  const dec = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, (it.qty || 1) - 1) } : it
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setItems([]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-black/40 mb-4">
          <Link to="/home" className="hover:text-black/60 transition">
            Home
          </Link>{" "}
          <span className="mx-2">›</span> Cart
        </div>

        {/* Title */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
            Your Cart
          </h1>

          {items.length ? (
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-black/50 hover:text-black transition"
            >
              Clear cart
            </button>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT - items */}
          <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
            {!items.length ? (
              <div className="p-8 text-center">
                <p className="text-black/60">Your cart is empty.</p>
                <Link
                  to="/home"
                  className="inline-flex mt-4 h-11 px-6 items-center justify-center rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-black/10">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    {/* image */}
                    <div className="h-24 w-24 rounded-xl bg-black/4 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="h-full w-full object-contain p-3"
                      />
                    </div>

                    {/* info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-black truncate">
                            {it.title}
                          </p>
                          <div className="mt-1 text-xs text-black/50 space-y-0.5">
                            <p>
                              Size: <span className="text-black/70">{it.size || "-"}</span>
                            </p>
                            <p>
                              Color: <span className="text-black/70">{it.color || "-"}</span>
                            </p>
                          </div>
                        </div>

                        {/* remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center shrink-0"
                          aria-label="Remove"
                          title="Remove"
                        >
                          {/* trash icon */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-500">
                            <path
                              d="M3 6h18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8 6V4h8v2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M7 6l1 16h8l1-16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10 11v7M14 11v7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* price + qty */}
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="text-lg font-black text-black">
                          {formatMoney(it.price)}
                        </p>

                        <div className="h-11 rounded-full bg-black/5 flex items-center justify-between px-4 w-full max-w-35">
                          <button
                            type="button"
                            onClick={() => dec(it.id)}
                            className="text-2xl leading-none text-black/70 hover:text-black transition"
                            aria-label="decrease"
                          >
                            −
                          </button>
                          <span className="font-semibold text-black">{it.qty}</span>
                          <button
                            type="button"
                            onClick={() => inc(it.id)}
                            className="text-2xl leading-none text-black/70 hover:text-black transition"
                            aria-label="increase"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - summary */}
          <aside className="rounded-2xl border border-black/10 bg-white p-6 h-fit">
            <h3 className="font-semibold text-black">Order Summary</h3>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between text-black/60">
                <span>Subtotal</span>
                <span className="text-black">{formatMoney(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-black/60">
                <span>Discount (-20%)</span>
                <span className="text-red-500">-{formatMoney(discount)}</span>
              </div>

              <div className="flex items-center justify-between text-black/60">
                <span>Delivery Fee</span>
                <span className="text-black">{items.length ? formatMoney(DELIVERY_FEE) : "$0"}</span>
              </div>

              <div className="pt-3 mt-3 border-t border-black/10 flex items-center justify-between">
                <span className="text-black/70">Total</span>
                <span className="text-lg font-black text-black">{formatMoney(total)}</span>
              </div>
            </div>

            {/* promo */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-11 rounded-full bg-black/5 flex items-center px-4 gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-black/40">
                  <path
                    d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 7l-10 5L2 7l10-5 10 5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Add promo code"
                  className="w-full bg-transparent outline-none text-sm text-black/70 placeholder:text-black/30"
                />
              </div>
              <button
                type="button"
                className="h-11 px-6 rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition"
              >
                Apply
              </button>
            </div>

            <button
              type="button"
              disabled={!items.length}
              className={[
                "mt-6 h-12 w-full rounded-full text-sm font-medium transition flex items-center justify-center gap-2",
                items.length
                  ? "bg-black text-white hover:bg-black/80"
                  : "bg-black/10 text-black/30 cursor-not-allowed",
              ].join(" ")}
            >
              Go to Checkout
              <span className="text-lg">→</span>
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

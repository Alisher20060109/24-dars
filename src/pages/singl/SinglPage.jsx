import React, { useMemo, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

export default function SinglPage() {
  const { id } = useParams();

  const getSingleProduct = async () => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: getSingleProduct,
    enabled: !!id,
  });

  // ===== UI LOGIC =====
  const sizes = useMemo(() => ["Small", "Medium", "Large", "X-Large"], []);
  const colors = useMemo(
    () => [
      { name: "Olive", value: "#3B3A2A" },
      { name: "Green", value: "#1F3B35" },
      { name: "Navy", value: "#1C2240" },
    ],
    []
  );

  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) return <div className="text-3xl text-center py-20">Loading...</div>;
  if (error) return <div className="text-2xl text-center py-20">Xatolik bor</div>;
  if (!data) return <div className="text-2xl text-center py-20">Product topilmadi</div>;

  // Fakestore’da bitta image keladi — dizayn uchun 3 ta preview qilib ko‘rsatamiz
  // (xohlasangiz keyin backend’dan real gallery qilasiz)
  const images = [data.image, data.image, data.image];

  const rate = data.rating?.rate ?? 0;
  const roundedRate = Math.round(rate * 10) / 10;

  // Demo: original/discount hisoblash (dizayndagi ko‘rinish uchun)
  const discountPercent = 40;
  const originalPrice = Math.round((data.price / (1 - discountPercent / 100)) * 100) / 100;

  const onAddToCart = () => {
    const payload = {
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.image,
      qty,
      selectedSize,
      selectedColor: selectedColor?.name,
    };
    console.log("ADD TO CART:", payload);
   
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <div className="mb-6">
          <Link to="/home" className="text-black/70 hover:text-black duration-200">
            ← Back
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
     
          <div className="order-1 lg:order-2">
            <div className="rounded-[28px] bg-[#e0dddf] overflow-hidden flex items-center justify-center min-h-90 lg:min-h-130">
              <img
                src={images[activeImg]}
                alt={data.title}
                className="w-150 h-150 object-contain p-8"
              />
            </div>
          </div>

          {/* Right Info */}
          <div className="order-3">
            <h1 className="text-[28px] sm:text-[34px] font-black uppercase tracking-tight text-black leading-tight">
              {data.title}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#F6C343]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <span className="text-sm text-black/60">{roundedRate}/5</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <p className="text-3xl font-black text-black">${Math.round(data.price)}</p>
              <p className="text-2xl font-bold text-black/30 line-through">
                ${Math.round(originalPrice)}
              </p>
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-500">
                -{discountPercent}%
              </span>
            </div>

            {/* Desc */}
            <p className="mt-4 text-sm leading-relaxed text-black/60">
              {data.description}
            </p>

            <div className="my-6 h-px w-full bg-black/10" />
            <div>
              <p className="text-sm text-black/60">Choose Size</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {sizes.map((s) => {
                  const active = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={[
                        "h-10 rounded-full px-5 text-sm font-medium transition",
                        active
                          ? "bg-black text-white"
                          : "bg-black/5 text-black/60 hover:bg-black/10",
                      ].join(" ")}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="my-6 h-px w-full bg-black/10" />

            {/* Quantity + Add */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Qty */}
              <div className="h-12 rounded-full bg-black/5 flex items-center justify-between px-4 w-full sm:w-42.5">
                <button
                  onClick={() => setQty((p) => Math.max(1, p - 1))}
                  className="text-xl text-black/70 hover:text-black"
                  aria-label="decrease"
                >
                  −
                </button>
                <span className="font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((p) => p + 1)}
                  className="text-xl text-black/70 hover:text-black"
                  aria-label="increase"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={onAddToCart}
                className="h-12 w-full rounded-full bg-black text-white font-medium hover:bg-black/80 transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Extra */}
            <p className="mt-4 text-xs text-black/40">
              Category: <span className="text-black/60">{data.category}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

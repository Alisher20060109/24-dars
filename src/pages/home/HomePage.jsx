import React, { useEffect, useMemo, useRef, useState } from "react";
import hero from "../../assets/hero.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PraductsCart from "../PraductsCart";

import fudbolka from "../../assets/fudbolka.png";
import kastyum from "../../assets/kastyum.png";
import opa from "../../assets/opa.png";
import gantel from "../../assets/gantel.png";

import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function HomePage() {
  const [openCategory, setOpenCategory] = useState(null);

  const getData = async () => {
    let res = await axios.get(`https://fakestoreapi.com/products`);
    return res;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });

  const products = data?.data || [];
  const categories = products.map((el) => el.category);
  const allCategories = [...new Set(categories)];

  if (isLoading) {
    return <div className="text-4xl text-center">Looding...</div>;
  }

  if (error) {
    return <div className="text-2xl text-center">Xatolik bor</div>;
  }

  return (
    <section className="w-full bg-[#F2F0F1]">
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HERO AREA */}
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between">
            {/* LEFT CONTENT */}
            <div className="pt-10 pb-4 lg:pt-24 lg:pb-24 lg:w-1/2">
              <h1 className="text-[36px] font-black uppercase leading-none tracking-tighter text-black sm:text-[56px] lg:text-[64px]">
                Find clothes <br />
                that matches <br />
                your style
              </h1>

              <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-black/60 sm:text-base">
                Browse through our diverse range of meticulously crafted garments,
                designed to bring out your individuality and cater to your sense
                of style.
              </p>

              <button className="mt-8 w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-black px-12 text-base font-medium text-white transition hover:bg-black/80">
                Shop Now
              </button>

              {/* STATS */}
              <div className="mt-8 flex flex-wrap justify-center gap-y-6 lg:mt-12 lg:justify-start lg:gap-x-8">
                <div className="w-1/2 border-r border-black/10 pr-4 lg:w-auto lg:border-r-2 lg:pr-8">
                  <Stat value="200+" label="International Brands" />
                </div>
                <div className="w-1/2 pl-4 lg:w-auto lg:border-r-2 lg:border-black/10 lg:pl-0 lg:pr-8">
                  <Stat value="2,000+" label="High-Quality Products" />
                </div>
                <div className="w-full flex flex-col items-center lg:w-auto lg:items-start">
                  <Stat value="30,000+" label="Happy Customers" />
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE AREA */}
            <div className="relative mt-8 lg:mt-0 lg:w-1/2 flex items-end justify-center overflow-hidden">
              {/* Katta yulduz */}
              <div className="absolute right-4 top-10 z-10 lg:right-0 lg:top-20">
                <Sparkle className="h-16 w-16 lg:h-24 lg:w-24 text-black" />
              </div>

              {/* Kichik yulduz */}
              <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2 lg:left-10">
                <Sparkle className="h-10 w-10 lg:h-14 lg:w-14 text-black" />
              </div>

              {/* Asosiy rasm */}
              <img
                src={hero}
                alt="Models"
                className="relative z-0 w-full object-cover lg:h-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-black py-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-6 px-4 sm:justify-between lg:px-8">
            <Brand name="VERSACE" />
            <Brand name="ZARA" />
            <Brand name="GUCCI" />
            <Brand name="PRADA" />
            <Brand name="Calvin Klein" />
          </div>
        </div>
      </div>

      {/* CATEGORY PRODUCTS */}
      <div>
        {allCategories.map((category) => {
          const categoryProducts = products.filter(
            (item) => item.category === category
          );
          const isOpen = openCategory === category;
          const shownProducts = isOpen
            ? categoryProducts
            : categoryProducts.slice(0, 4);

          return (
            <div key={category}>
              <h1 className="text-center text-[32px] pt-18 pb-10 md:text-[48px] font-black uppercase mb-8">
                {category}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl px-5 mx-auto">
                {shownProducts.map((el) => (
                  <PraductsCart key={el.id} {...el} />
                ))}
              </div>

              {categoryProducts.length > 4 && (
                <div className="max-w-30 px-5 mx-auto mt-4 flex items-center justify-center hover:bg-amber-600 rounded-2xl p-2 duration-300 cursor-pointer hover:text-white text-[18px]">
                  <button
                    onClick={() => setOpenCategory(isOpen ? null : category)}
                  >
                    {isOpen ? "Show Less" : "View All"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BROWSE BY DRESS STYLE */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-4xl bg-[#F2F0F1] p-6 sm:p-10">
            <h2 className="text-center text-[28px] sm:text-[40px] font-black uppercase tracking-tight text-black">
              BROWSE BY DRESS STYLE
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {/* Casual */}
              <div className="relative h-42.5 sm:h-47.5 overflow-hidden rounded-2xl bg-white">
                <div className="absolute left-6 top-6 z-10">
                  <p className="text-xl sm:text-2xl font-bold text-black">Casual</p>
                </div>

                <div
                  className="absolute inset-0 bg-cover bg-right"
                  style={{ backgroundImage: `url(${fudbolka})` }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/20 to-transparent" />
              </div>

              {/* Formal */}
              <div className="relative h-42.5 sm:h-47.5 overflow-hidden rounded-2xl bg-white">
                <div className="absolute left-6 top-6 z-10">
                  <p className="text-xl sm:text-2xl font-bold text-black">Formal</p>
                </div>

                <div
                  className="absolute inset-0 bg-cover bg-right"
                  style={{ backgroundImage: `url(${kastyum})` }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/20 to-transparent" />
              </div>

              {/* Party */}
              <div className="relative h-47.5 sm:h-55 md:row-start-2 md:col-start-1 overflow-hidden rounded-2xl bg-white">
                <div className="absolute left-6 top-6 z-10">
                  <p className="text-xl sm:text-2xl font-bold text-black">Party</p>
                </div>

                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${opa})` }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/20 to-transparent" />
              </div>

              {/* Gym */}
              <div className="relative h-47.5 sm:h-55 md:row-start-2 md:col-start-2 overflow-hidden rounded-2xl bg-white">
                <div className="absolute left-6 top-6 z-10">
                  <p className="text-xl sm:text-2xl font-bold text-black">Gym</p>
                </div>

                <div
                  className="absolute inset-0 bg-cover bg-right"
                  style={{ backgroundImage: `url(${gantel})` }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <HappyCustomers />
    </section>
  );
}

function HappyCustomers() {
  const reviews = useMemo(
    () => [
      {
        name: "Sarah M.",
        text:
          "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
        stars: 5,
      },
      {
        name: "Alex K.",
        text:
          "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options is remarkable, catering to a variety of tastes and occasions.",
        stars: 5,
      },
      {
        name: "James L.",
        text:
          "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
        stars: 5,
      },
      {
        name: "Maria S.",
        text:
          "The delivery was fast and the quality is top-notch. I loved how everything fit perfectly. Definitely coming back for more.",
        stars: 5,
      },
      {
        name: "Daniel R.",
        text:
          "Great customer support and really stylish items. I’ve recommended it to my friends and they love it too.",
        stars: 5,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Per view: mobile 1, md 2, lg 3
  const getPerView = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [perView, setPerView] = useState(() =>
    typeof window !== "undefined" ? getPerView() : 3
  );

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto slide (hover bo'lsa to'xtaydi)
  useEffect(() => {
    if (isHover) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 2500);

    return () => clearInterval(intervalRef.current);
  }, [isHover, reviews.length]);

  // Visible cards
  const visible = [];
  for (let i = 0; i < perView; i++) {
    visible.push(reviews[(index + i) % reviews.length]);
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[28px] sm:text-[40px] font-black uppercase tracking-tight text-black">
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-black/10 bg-white grid place-items-center hover:bg-black/5 transition"
              aria-label="Previous"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-black/10 bg-white grid place-items-center hover:bg-black/5 transition"
              aria-label="Next"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div
          className="mt-7"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((r, i) => (
              <ReviewCard key={`${r.name}-${index}-${i}`} {...r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ name, text, stars = 5 }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: stars }).map((_, i) => (
          <FaStar key={i} className="text-[#F6C343]" />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <p className="font-bold text-black">{name}</p>
        <FaCheckCircle className="text-green-600" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-black/60">"{text}"</p>
    </div>
  );
}

/* ====== SMALL COMPONENTS ====== */

function Stat({ value, label }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-black lg:text-[40px]">{value}</span>
      <span className="text-[12px] text-black/60 lg:text-sm">{label}</span>
    </div>
  );
}

function Brand({ name }) {
  return (
    <span className="text-xl font-bold text-white sm:text-2xl lg:text-3xl tracking-widest uppercase">
      {name}
    </span>
  );
}

function Sparkle({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M32 0C32 17.6731 46.3269 32 64 32C46.3269 32 32 46.3269 32 64C32 46.3269 17.6731 32 0 32C17.6731 32 32 17.6731 32 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

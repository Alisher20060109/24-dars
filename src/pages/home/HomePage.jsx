import React from "react";
// Rasm yo'li loyihangizga qarab: assets/hero.png yoki public/images/hero.png
import hero from "../../assets/hero.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

export default function HomePage() {
  const getData = async () => {
    let res = await axios.get(`https://fakestoreapi.com/products`)
    return res
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getData
  })
  const products = data?.data

  if (isLoading) {
    return <div className="text-4xl text-center">Looding...</div>
  }
  return (
    <section className="w-full bg-[#F2F0F1]">
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

            {/* STATS - Mobileda 2 qator, Desktopda 1 qator */}
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
      <h1 className="text-center text-[32px] md:text-[48px] font-black uppercase mb-8">
        NEW ARRIVALS
      </h1>

      {/* Mahsulotlar Grid konteyneri */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">

        {/* Card start */}
        <div className="flex flex-col gap-3">
          {/* Rasm konteyneri */}
          <div className="bg-[#F0EEED] rounded-[20px] aspect-square flex items-center justify-center overflow-hidden">
            <img
              src="" // O'zingizni rasm manzilingizni qo'ying
              alt="T-shirt"
              className="w-full h-full object-contain p-4 transition-transform hover:scale-110 duration-300"
            />
          </div>

          {/* Ma'lumotlar qismi */}
          <div className="flex flex-col gap-1">
            <h3 className="text-base md:text-lg font-bold text-black uppercase">
              T-shirt with Tape Details
            </h3>

            {/* Reyting */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400 text-sm">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
              </div>
              <span className="text-sm text-black/60">4.5/<span className="text-gray-400">5</span></span>
            </div>

            {/* Narx */}
            <p className="text-xl md:text-2xl font-bold">$120</p>
          </div>
        </div>
        {/* Card end */}

        {/* Boshqa kartochkalarni ham shu tartibda qo'shish mumkin */}
      </div>

     
    </section>

  );

}

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
import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import visa from "../assets/Visa.png";
import mastercard from "../assets/Mastercard.png";
import paypal from "../assets/Paypal.png";
import gpay from "../assets/G Pay.png";
import applePay from "../assets/ Pay.png";


export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10">
        {/* Newsletter (mobile: stacked, desktop: row) */}
        <div className="rounded-3xl bg-black px-6 py-8 text-white sm:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl lg:max-w-xl">
              Stay upto date about <br className="hidden sm:block" />
              our latest offers
            </h2>

            <div className="w-full max-w-md">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <HiOutlineMail className="h-5 w-5" />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-full bg-white pl-11 pr-4 text-sm text-gray-900 outline-none"
                  />
                </div>

                <button className="h-12 w-full rounded-full bg-white text-sm font-semibold text-black hover:bg-gray-200">
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-10">
          {/* Mobile: brand then 2-col links. Desktop: 5-col grid */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="text-2xl font-black tracking-tight text-black">
                SHOP.CO
              </div>
              <p className="mt-3 max-w-sm text-sm text-gray-600">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>

              <div className="mt-5 flex items-center gap-3">
                {[
                  { icon: <FaTwitter />, label: "Twitter" },
                  { icon: <FaFacebookF />, label: "Facebook" },
                  { icon: <FaInstagram />, label: "Instagram" },
                  { icon: <FaGithub />, label: "Github" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS (mobile: 2 columns; desktop: 4 columns) */}
            <div className="grid grid-cols-2 gap-10 lg:col-span-4 lg:grid-cols-4">
              <FooterCol title="COMPANY" links={["About", "Features", "Works", "Career"]} />
              <FooterCol
                title="HELP"
                links={[
                  "Customer Support",
                  "Delivery Details",
                  "Terms & Conditions",
                  "Privacy Policy",
                ]}
              />
              <FooterCol title="FAQ" links={["Account", "Manage Deliveries", "Orders", "Payment"]} />
              <FooterCol
                title="RESOURCES"
                links={[
                  "Free eBook",
                  "Development Tutorial",
                  "How to - Blog",
                  "Youtube Playlist",
                ]}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 h-px w-full bg-gray-300/70" />

          {/* Bottom (mobile: stacked; desktop: row) */}
          <div className="mt-6 flex flex-col items-center gap-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center sm:text-left">
              Shop.co © 2000-2023, All Rights Reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              {[
                { src: visa, alt: "Visa" },
                { src: mastercard, alt: "Mastercard" },
                { src: paypal, alt: "PayPal" },
                { src: applePay, alt: "Apple Pay" },
                { src: gpay, alt: "G Pay" },
              ].map((p) => (
                <span
                  key={p.alt}
                  className="flex items-center justify-center rounded-md bg-white px-3 py-1 shadow-sm ring-1 ring-gray-200"
                >
                  <img src={p.src} alt={p.alt} className="h-2 object-contain" />
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-xs font-bold tracking-[0.25em] text-black">
        {title}
      </div>
      <ul className="mt-4 space-y-3 text-sm text-gray-600">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-black">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PraductsCart = ({ image, title, price, rating, id }) => {
  return (
    <div>
      <Link to={`/product/${id}`} className="flex flex-col gap-3">
        <div className="bg-[#dfdfdfec] rounded-[20px] aspect-square flex items-center justify-center overflow-hidden">
          <img
            src={image || "/placeholder.png"}  
            alt={title || "product"}
            className="w-full h-full object-contain p-4 transition-transform hover:scale-110 duration-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base md:text-lg font-bold text-black uppercase line-clamp-1">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-sm">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
            </div>
            <span className="text-sm text-black/60">
              {rating?.rate ?? 0}/<span className="text-gray-400">5</span>
            </span>
          </div>

          <p className="text-xl md:text-2xl font-bold">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default PraductsCart;

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Onboarding() {
  return (
    <div className=" min-h-screen  p-4 md:p-8 lg:p-12 xl:p-16 flex felx-col justify-center items-center">
      <div className="flex flex-col w-full p-2 md:p-8 lg:p-14 xl:p-22 gap-14 md:gap-20 lg:gap-28 xl:gap-34  justify-center items-center  ">
        {/* header */}
        <div className="w-full flex flex-col gap-2 md:gap-4 lg:gap-6 xl:gap-8 pt-2 justify-center items-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-bold">
            Welcome to Bizease
          </h1>
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="bizease logo"
            className=" "
          />
        </div>

        {/* content */}
        <div className="flex flex-col gap-4 md:gap-8 lg:gap-12 xl:gap-20 items-center justify-center">
          <h1 className="text-base md:text-2xl lg:text-3xl xl:text-4xl text-white bg-blue-300 p-2 md:p-3 lg:p-5 xl:p-7 w-full text-center rounded font-bold">
            What is Bizease?
          </h1>
          <p className="text-xs md:text-base lg:text-xl xl:text-3xl p-1  px-2">
            BizEase is an intuitive order and inventory management tool designed
            to help small business owners streamline their operations. With
            BizEase, you can effortlessly manage orders from multiple channels,
            track inventory in real-time, and communicate with customers—all in
            one platform. Whether you&apos;re dealing with fluctuating stock
            levels or keeping track of customer orders, BizEase simplifies
            complex processes, saving you time and reducing stress.
          </p>
          <p className="text-xs md:text-base lg:text-xl xl:text-3xl p-1  px-2">
            Perfect for entrepreneurs looking for a user-friendly solution to
            grow their business, BizEase empowers you to stay organized, make
            informed decisions, and focus on what matters most—your business
            success.
          </p>
          <h1 className="text-base md:text-2xl lg:text-3xl xl:text-4xl text-white bg-blue-300 p-2 md:p-3 lg:p-5 xl:p-7 w-full text-center rounded font-bold">
            What do we Offer?
          </h1>

          <div className="flex flex-col gap-6 md:gap-12 p-4 md:p-6 lg:p-8 xl:p-10 px-8 md:px-12 lg:px-16 xl:px-20 item-center justify-center">
            <div className="flex items-center justify-center gap-3 md:gap-8 lg:gap-12 xl:gap-16">
              <Image
                src="/shopping-bag.png"
                alt="orders image"
                width={110}
                height={110}
              />

              <div className="flex flex-col items-start justify-center gap-1 lg:gap-2 xl:gap-3 pt-4">
                <p className="text-sm md:text-lg lg:text-2xl xl:text-4xl text-center font-bold">
                  We help you manage your orders.
                </p>
                <p className="text-xs md:text-base  lg:text-xl xl:text-3xl ">
                  BizEase helps manage orders by consolidating all incoming
                  orders from multiple channels into one easy-to-use platform,
                  allowing you to track and update statuses efficiently.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-8 lg:gap-12 xl:gap-16">
              <Image
                src="/house-image.png"
                alt="stock image"
                width={110}
                height={110}
              />

              <div className="flex flex-col items-start justify-center gap-1 lg:gap-2 xl:gap-3 pt-4">
                <p className="text-sm md:text-lg lg:text-2xl xl:text-4xl text-center font-bold">
                  We help you manage your stock.
                </p>
                <p className="text-xs md:text-base lg:text-xl xl:text-3xl ">
                  BizEase helps manages inventory by providing real-time stock
                  updates, low-stock alerts, and seamless product tracking to
                  ensure you never run out of crucial items.
                </p>
              </div>
            </div>

            <Link
              href={"/login"}
              className="rounded cursor-pointer text-white text-center bg-blue-500 text-sm md:text-lg lg:text-2xl xl:text-4xl font-bold md:p-6 lg:p-8 xl:p-10 mt-4 md:mt-6 lg:mt-8 xl:mt-12"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

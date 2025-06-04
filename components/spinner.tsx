"use client"

import { useEffect, useState } from "react"

export default function LoadingSpinner() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 5) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full border-[12px] border-gray-200"></div>

        {/* Rotating progress segment */}
        <div
          className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-[#06005B]"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
      </div>

      <h1 className="mt-8 text-2xl md:text-3xl font-bold ">Please Wait...</h1>
    </div>
  )
}

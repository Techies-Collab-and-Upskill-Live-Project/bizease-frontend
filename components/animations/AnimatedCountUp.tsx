'use client';
import React from 'react';
import CountUp from 'react-countup';

const AnimatedCountUp = ({ amount }: { amount: number }) => {
  return (
    <>
      <CountUp end={amount} duration={1.0} separator="," prefix="₦" />
    </>
  );
};

export default AnimatedCountUp;

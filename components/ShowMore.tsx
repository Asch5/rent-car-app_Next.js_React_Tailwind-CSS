'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ShowMoreProps } from '@/types';
import { CustomButton } from '.';
import { updateSearchParams } from '@/utils';

const ShowMore = ({ limit, setLimit, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handNavigation = () => {
    const pageNumber = (limit || 10) / 10;
    const newLimit = (pageNumber + 1) * 10;
    setLimit(newLimit);
  };
  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;

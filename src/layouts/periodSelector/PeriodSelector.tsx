"use client";
import Image from "next/image";
import CalendarIcon from "@/assets/calendar-icon.svg";
import React, { useState, useEffect } from "react";
import { setStartDate, setEndDate } from "@/redux/slice/periodSlice";
import { useDispatch } from "react-redux";
import DatePickerClient from "@/components/datePicker/DatePickerClient";

const PeriodSelector = () => {
  const [inputStartDate, setInputStartDate] = useState<Date | null>(new Date());
  const [inputEndDate, setInputEndDate] = useState<Date | null>(
    new Date(new Date().setMonth(inputStartDate!.getMonth() + 1)),
  );
  const dispatch = useDispatch();

  const handleStaticPeriod = (
    e: React.MouseEvent<HTMLButtonElement>,
    month: number,
  ) => {
    e.preventDefault();
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const day = today.getDate();
    const startDate = new Date(year, monthIndex - month, day);
    const endDate = new Date(year, monthIndex, day);
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
  };

  useEffect(() => {
    if (inputStartDate! > inputEndDate!) setInputStartDate(inputEndDate);
  }, [inputEndDate]);

  useEffect(() => {
    if (inputStartDate! > inputEndDate!) setInputEndDate(inputStartDate);
  }, [inputStartDate]);

  const handleSubmitPeriod = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputStartDate || !inputEndDate) return;
    dispatch(setStartDate(inputStartDate));
    dispatch(setEndDate(inputEndDate));
  };

  return (
    <div className="flex justify-center gap-6">
      <div className="flex gap-1 items-center">
        <p>
          <Image src={CalendarIcon} alt="기간별" width={33} height={33} />
        </p>
        <button
          className="btn_extra_small"
          onClick={e => handleStaticPeriod(e, 3)}
        >
          3개월
        </button>
        <button
          className="btn_extra_small"
          onClick={e => handleStaticPeriod(e, 6)}
        >
          6개월
        </button>
        <button
          className="btn_extra_small"
          onClick={e => handleStaticPeriod(e, 12)}
        >
          1년
        </button>
      </div>
      <div className="flex items-center justify-between gap-1">
        <div className="relative">
          <DatePickerClient
            inputEndDate={inputEndDate}
            inputStartDate={inputStartDate}
            setInputDate={setInputStartDate}
          />
        </div>
        <p>~</p>
        <div className="relative">
          <DatePickerClient
            inputEndDate={inputEndDate}
            inputStartDate={inputStartDate}
            setInputDate={setInputEndDate}
            secondary={true}
          />
        </div>
      </div>
      <button
        className="flex w-[87px] h-[33px] justify-center items-center bg-black text-white text-sm"
        onClick={e => handleSubmitPeriod(e)}
      >
        조회하기
      </button>
    </div>
  );
};

export default PeriodSelector;

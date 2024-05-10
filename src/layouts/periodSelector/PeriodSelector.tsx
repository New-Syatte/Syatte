"use client";
import React, { useState, useEffect } from "react";
import { setStartDate, setEndDate } from "@/redux/slice/periodSlice";
import { useDispatch } from "react-redux";
import DatePickerClient from "@/components/datePicker/DatePickerClient";
import Button from "@/components/button/Button";

const PeriodSelector = () => {
  const [inputStartDate, setInputStartDate] = useState<Date | null>(new Date());
  const [inputEndDate, setInputEndDate] = useState<Date | null>(
    new Date(new Date().setMonth(inputStartDate!.getMonth() + 1)),
  );
  const dispatch = useDispatch();

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
    <div className="w-1/2 flex justify-end items-center gap-6">
      <div className="flex items-center justify-between gap-1">
        <div className="relative">
          <DatePickerClient
            inputEndDate={inputEndDate}
            inputStartDate={inputStartDate}
            setInputDate={setInputStartDate}
          />
        </div>
        <p className="text-xl font-bold">~</p>
        <div className="relative">
          <DatePickerClient
            inputEndDate={inputEndDate}
            inputStartDate={inputStartDate}
            setInputDate={setInputEndDate}
            secondary={true}
          />
        </div>
      </div>
      <div className="w-1/5 h-10 flex justify-center items-center">
        <Button
          styleType="primary"
          onClick={handleSubmitPeriod}
          style="font-bold"
        >
          조회하기
        </Button>
      </div>
    </div>
  );
};

export default PeriodSelector;

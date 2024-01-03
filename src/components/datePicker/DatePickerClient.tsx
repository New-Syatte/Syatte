"use client";
import React, { forwardRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerClientProps {
  inputEndDate: Date | null;
  setInputDate: React.Dispatch<React.SetStateAction<Date | null>>;
  inputStartDate: Date | null;
  secondary?: boolean;
}

const DatePickerClient = ({
  inputEndDate,
  setInputDate,
  inputStartDate,
  secondary = false,
}: DatePickerClientProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <DatePicker
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <CustomHeader
            date={date}
            increaseMonth={increaseMonth}
            decreaseMonth={decreaseMonth}
          />
        )}
        selected={secondary ? inputEndDate : inputStartDate}
        onChange={(date: Date) => {
          if (secondary) {
            date.setUTCHours(23, 59, 59, 999);
            setInputDate(date);
          } else {
            date.setHours(0, 0, 0, 0);
            setInputDate(date);
          }
        }}
        selectsEnd={secondary}
        selectsStart={!secondary}
        startDate={inputStartDate}
        endDate={inputEndDate}
        locale={ko}
        customInput={<CustomInput value={new Date()} onClick={() => {}} />}
      />
    </>
  );
};

export default DatePickerClient;

const CustomInput = forwardRef(
  (
    { value, onClick }: { value: Date; onClick: React.MouseEventHandler },
    ref: React.Ref<HTMLButtonElement>,
  ) => (
    <button
      className="w-[107px] h-[33px] text-darkgray border-[1px] border-whitegray flex justify-center items-center text-sm"
      onClick={onClick}
      ref={ref}
    >
      {format(new Date(value), "yyyy-MM-dd")}
    </button>
  ),
);

CustomInput.displayName = "CustomInput";

interface CustomHeaderProps {
  date: Date;
  increaseMonth: () => void;
  decreaseMonth: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  date,
  increaseMonth,
  decreaseMonth,
}) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return (
    <div className="flex justify-between items-center">
      <button className="btn_icon" onClick={decreaseMonth}>
        <BsChevronLeft />
      </button>
      <p className="text-lg font-bold">
        {year} {month < 10 ? `0${month}` : month}
      </p>
      <button className="btn_icon" onClick={increaseMonth}>
        <BsChevronRight />
      </button>
    </div>
  );
};

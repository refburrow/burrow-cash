import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { getTotalAccountBalance } from "../redux/selectors/getTotalAccountBalance";
import { usePortfolioAssets } from "./hooks";
import { getAverageAPY } from "../redux/selectors/getAverageAPY";

export const useAverageAPY2 = () => {
  const userDeposited = useAppSelector(getTotalAccountBalance("supplied"));
  const userBorrowed = useAppSelector(getTotalAccountBalance("borrowed"));
  const [suppliedRows, borrowedRows] = usePortfolioAssets();
  const [totalApysuppliedValue, setTotalApysuppliedValue] = useState(0);
  const [averageSupplyApy, setAverageSupplyApy] = useState(0);
  const [totalApyBorrowedValue, setTotalApyBorrowedValue] = useState(0);
  const [averageBorrowedApy, setAverageBorrowedApy] = useState(0);

  useEffect(() => {
    if (Array.isArray(suppliedRows)) {
      let totalApyWeightedValue = 0;
      suppliedRows.forEach((asset) => {
        const assetValue = asset.supplied * asset.price;
        const apyWeightedValue = assetValue * (asset.apy / 100);
        totalApyWeightedValue += apyWeightedValue;
      });
      const totalApyWeightedValueRounded = parseFloat(totalApyWeightedValue.toFixed(2));
      setTotalApysuppliedValue(totalApyWeightedValueRounded);
    } else {
      console.error("suppliedRows is not an array:", suppliedRows);
    }
  }, [suppliedRows, setTotalApysuppliedValue]);

  useEffect(() => {
    if (userDeposited > 0) {
      const dailyApy = totalApysuppliedValue / userDeposited;
      const annualApy = dailyApy * 365;
      if (annualApy === 0) {
        setAverageSupplyApy(0);
      } else if (annualApy < 0.01) {
        setAverageSupplyApy(0.01);
      } else {
        setAverageSupplyApy(annualApy);
      }
    } else {
      console.error("userDeposited cannot be 0.");
    }
  }, [totalApysuppliedValue, userDeposited, setAverageSupplyApy]);

  useEffect(() => {
    if (Array.isArray(borrowedRows)) {
      let totalApyBorrowedWeightedValue = 0;
      borrowedRows.forEach((asset) => {
        const assetValue = asset.borrowed * asset.price;
        const apyWeightedValue = assetValue * (asset.borrowApy / 100);
        totalApyBorrowedWeightedValue += apyWeightedValue;
      });
      const totalApyBorrowedWeightedValueRounded = parseFloat(
        totalApyBorrowedWeightedValue.toFixed(2),
      );
      setTotalApyBorrowedValue(totalApyBorrowedWeightedValueRounded);
    } else {
      console.error("borrowedRows is not an array:", borrowedRows);
    }
  }, [borrowedRows, setTotalApyBorrowedValue]);

  useEffect(() => {
    if (userBorrowed > 0) {
      const dailyApy = totalApyBorrowedValue / userBorrowed;
      const annualApy = dailyApy * 365;
      if (annualApy === 0) {
        setAverageBorrowedApy(0);
      } else if (annualApy < 0.01) {
        setAverageBorrowedApy(0.01);
      } else {
        setAverageBorrowedApy(annualApy);
      }
    } else {
      console.error("userBorrowed cannot be 0.");
    }
  }, [totalApyBorrowedValue, userBorrowed, setAverageBorrowedApy]);

  return { averageSupplyApy, averageBorrowedApy };
};
export const useAverageAPY = () => {
  const { averageSupplyApy, averageBorrowedApy } = useAppSelector(getAverageAPY);
  return { averageSupplyApy, averageBorrowedApy };
};

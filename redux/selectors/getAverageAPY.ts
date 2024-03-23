import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getGains } from "./getAccountRewards";

export const getAverageAPY = createSelector(
  (state: RootState) => state.assets,
  (state: RootState) => state.account,
  (assets, account) => {
    const [gainCollateral, totalCollateral] = getGains(account.portfolio, assets, "collateral");
    const [gainSupplied, totalSupplied] = getGains(account.portfolio, assets, "supplied");
    const [gainBorrowed, totalBorrowed] = getGains(account.portfolio, assets, "borrowed");
    const suplyGains = gainCollateral + gainSupplied;
    const supplyTotals = totalCollateral + totalSupplied;
    const averageSupplyApy = (suplyGains / supplyTotals) * 100;
    const averageBorrowedApy = (gainBorrowed / totalBorrowed) * 100;
    return { averageSupplyApy, averageBorrowedApy };
  },
);

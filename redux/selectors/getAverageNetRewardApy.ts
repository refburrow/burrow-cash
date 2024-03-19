import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getAverageNetRewardApy = () =>
  createSelector(
    (state: RootState) => state.assets,
    (state: RootState) => state.account,
    (assets, account) => {
      const suppliedKeys = Object.keys(account.portfolio.supplied);
      const assetsKeys = Object.keys(assets.data);
    },
  );

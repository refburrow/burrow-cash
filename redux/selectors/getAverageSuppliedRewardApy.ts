import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getAverageSupplyRewardApy = () =>
  createSelector(
    (state: RootState) => state.assets,
    (state: RootState) => state.account,
    (assets, account) => {
      // const farmsWithData = Object.values(account.portfolio.farms.supplied || {}).filter(
      //   (farm) => Object.keys(farm).length > 0,
      // );
      // if (farmsWithData.length === 0) {
      //   return 0;
      // }
      // const totalAssetValue = farmsWithData.reduce((total, farm) => {
      //   return total + parseFloat(farm.supplied) * parseFloat(farm.price);
      // }, 0);
      // const totalRewardValue = farmsWithData.reduce((total, farm) => {
      //   const userShares = parseFloat(farm.boosted_shares);
      //   const totalShares = parseFloat(farm.asset_farm_reward.boosted_shares);
      //   const rewardPerDay = parseFloat(farm.asset_farm_reward.reward_per_day);
      //   const rewardValue =
      //     (userShares / totalShares) *
      //     rewardPerDay *
      //     (parseFloat(farm.supplied) * parseFloat(farm.price));
      //   return total + rewardValue;
      // }, 0);
      // if (totalAssetValue === 0 || totalRewardValue === 0) {
      //   return 0;
      // }
      // const averageSupplyRewardApy = (totalAssetValue / totalRewardValue) * 365;
      // return averageSupplyRewardApy;
    },
  );

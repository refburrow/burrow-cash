import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { shrinkToken } from "../../store";

export const getAverageSupplyRewardApy = () =>
  createSelector(
    (state: RootState) => state.assets,
    (state: RootState) => state.account,
    (assets, account) => {
      const farmsWithData = Object.values(account.portfolio.farms.supplied || {}).filter(
        (farm) => Object.keys(farm).length > 0,
      );
      let totalValue = 0;
      let totalRewardValue = 0;
      farmsWithData.forEach((farm) => {
        const farmId = Object.keys(farm)[0];
        const farmData = farm[farmId];
        const matchingData = assets.data[farmId];
        if (matchingData && matchingData.price && typeof matchingData.price.usd === "number") {
          totalValue += matchingData.price.usd;

          if (farmData && farmData.asset_farm_reward) {
            const assetDecimals =
              matchingData.metadata.decimals + matchingData.config.extra_decimals;
            const userBoostedShares = Number(shrinkToken(farmData.boosted_shares, assetDecimals));
            const totalBoostedShares = Number(
              shrinkToken(farmData.asset_farm_reward.boosted_shares, assetDecimals),
            );
            const rewardPerDay = Number(
              shrinkToken(farmData.asset_farm_reward.reward_per_day || 0, assetDecimals),
            );
            const userRewardPerDayUSD =
              (userBoostedShares / totalBoostedShares) * rewardPerDay * matchingData.price.usd;
            totalRewardValue += userRewardPerDayUSD;
          }
        } else {
          console.error(`Price data is missing or invalid for farmId: ${farmId}`);
        }
      });
      if (totalValue === 0 || totalRewardValue === 0) {
        return 0;
      }
      const averageSupplyRewardApy = (totalRewardValue / totalValue) * 365;
      if (averageSupplyRewardApy < 0.01) {
        return "<0.01";
      } else {
        return averageSupplyRewardApy.toFixed(2);
      }
    },
  );

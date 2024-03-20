import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { shrinkToken } from "../../store";

export const getAverageNetRewardApy = () =>
  createSelector(
    (state: RootState) => state.assets,
    (state: RootState) => state.account,
    (assets, account) => {
      const suppliedKeys = Object.keys(account.portfolio.supplied);
      const filteredAssets = Object.values(assets.data).filter(
        (asset) => suppliedKeys.includes(asset.token_id) && asset.config.net_tvl_multiplier > 0,
      );
      const assetsTotalValue = filteredAssets.reduce((total, asset) => {
        return total + (asset.price?.usd || 0);
      }, 0);
      const farmKeys = Object.keys(account.portfolio.farms.netTvl);
      const totalNetTvl = farmKeys.reduce((total, farmKey) => {
        const farm = account.portfolio.farms.netTvl[farmKey];
        const asset = assets.data[farmKey];
        const assetPriceUsd = asset && asset.price && asset.price.usd ? asset.price.usd : 0;
        const assetDecimals = asset.metadata.decimals + asset.config.extra_decimals;
        const userBoostedShares = Number(shrinkToken(farm.boosted_shares, assetDecimals));
        const totalBoostedShares = Number(
          shrinkToken(farm.asset_farm_reward.boosted_shares, assetDecimals),
        );
        const rewardPerDay = Number(
          shrinkToken(farm.asset_farm_reward.reward_per_day || 0, assetDecimals),
        );
        const userRewardPerDayUSD =
          (userBoostedShares / totalBoostedShares) * rewardPerDay * assetPriceUsd;
        return total + userRewardPerDayUSD;
      }, 0);
      if (assetsTotalValue === 0 || totalNetTvl === 0) {
        return 0;
      }
      const averageNetRewardApy = (totalNetTvl / assetsTotalValue) * 365;
      if (averageNetRewardApy < 0.01) {
        return "<0.01";
      } else {
        return averageNetRewardApy.toFixed(2);
      }
    },
  );

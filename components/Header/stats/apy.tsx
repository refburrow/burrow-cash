import { Link, Stack, Typography } from "@mui/material";

import { Stat } from "./components";
import { useUserHealth } from "../../../hooks/useUserHealth";
import { APY_FORMAT, USD_FORMAT } from "../../../store";
import { useNonFarmedAssets } from "../../../hooks/hooks";

export const APY = () => {
  const { netAPY, netLiquidityAPY, dailyReturns } = useUserHealth();
  const { weightedNetLiquidity, hasNegativeNetLiquidity, assets } = useNonFarmedAssets();

  const globalValue = `${netAPY.toLocaleString(undefined, APY_FORMAT)}%`;
  const netLiquidityValue = `${netLiquidityAPY.toLocaleString(undefined, APY_FORMAT)}%`;
  const totalApy = netAPY + netLiquidityAPY;
  const amount = `${totalApy.toLocaleString(undefined, APY_FORMAT)}%`;
  const showLabels = netAPY > 0 || netLiquidityAPY > 0;

  const netLiquidityTooltip = hasNegativeNetLiquidity ? (
    <NotFarmingNetLiquidity assets={assets} liquidity={weightedNetLiquidity} />
  ) : undefined;

  const apyLabels = [
    [{ value: globalValue, text: "Pools", color: netAPY < 0 ? "red" : "green" }],
    [
      {
        value: netLiquidityValue,
        text: "Net Liquidity",
        tooltip: netLiquidityTooltip,
        color: hasNegativeNetLiquidity ? "yellow" : "green",
      },
    ],
  ];

  const tooltip = `${dailyReturns.toLocaleString(undefined, USD_FORMAT)} / day`;

  return (
    <div className="relative">
      <Stat
        title="Net APY"
        titleTooltip="Net APY of all supply and borrow positions, including base APYs and incentives"
        amount={amount}
        tooltip={tooltip}
        labels={showLabels ? apyLabels : []}
      />
      <div className="absolute top-[58px] left-[240px]">
        <div className="w-6 h-6 rounded-3xl bg-dark-100 flex items-center justify-center -ml-2.5 z-50">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.38442 1.55008C7.95577 0.141745 7.06202 2.27456 6.73025 3.33081V3.85893H7.98285C9.61462 3.85893 10.786 2.93133 9.38442 1.55008ZM5.024 3.85893H6.2766V3.32404C5.94483 2.26779 5.04431 0.141745 3.62244 1.55008C2.2141 2.93133 3.38546 3.85893 5.024 3.85893ZM6.22921 4.33289H1.62504C1.32712 4.33289 1.08337 4.57664 1.08337 4.87456C1.08337 5.17247 1.32712 5.41622 1.62504 5.41622H6.22921V4.33289ZM11.375 4.33289H6.77087V5.41622H11.375C11.673 5.41622 11.9167 5.17247 11.9167 4.87456C11.9167 4.57664 11.673 4.33289 11.375 4.33289Z"
              fill="#C0C4E9"
            />
            <path
              d="M1.625 5.95801V10.2913C1.625 10.8872 2.1125 11.3747 2.70833 11.3747H6.22917V5.95801H1.625ZM6.77083 5.95801V11.3747H10.2917C10.8875 11.3747 11.375 10.8872 11.375 10.2913V5.95801H6.77083Z"
              fill="#C0C4E9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const NotFarmingNetLiquidity = ({ assets, liquidity }) => (
  <Stack gap="1">
    <Typography fontSize="0.85rem">
      Your weighted net liquidity is <b>{liquidity.toLocaleString(undefined, USD_FORMAT)}</b> which
      is below 0.
    </Typography>
    <Typography fontSize="0.85rem">
      The following assets have the net liquidity coefficient below 1:
      <Stack gap={1} component="span" direction="row" display="inline-flex" ml={1}>
        {assets.map((asset) => (
          <span key={asset.token_id}>
            {asset.metadata.symbol} ({asset.config.net_tvl_multiplier / 10000})
          </span>
        ))}
      </Stack>
    </Typography>
    <Typography fontSize="0.85rem">
      In order to start farming the net liquidity rewards you need to have a positive balance.
    </Typography>
    <Typography fontSize="0.85rem">
      For more information about the net liquidity coefficients{" "}
      <Link
        href="https://burrowcash.medium.com/net-liquidity-farming-part-2-varied-coefficients-6b839ae2178b"
        target="_blank"
        color="#ACFFD1"
        fontWeight={500}
      >
        click here
      </Link>
    </Typography>
  </Stack>
);

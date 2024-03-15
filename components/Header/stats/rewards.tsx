import { useRewards } from "../../../hooks/useRewards";
import { TOKEN_FORMAT, USD_FORMAT, NUMBER_FORMAT } from "../../../store";
import CustomTooltips from "../../CustomTooltips/CustomTooltips";
import TokenIcon from "../../TokenIcon";
import { Stat } from "./components";

const transformAssetReward = (r, text) => ({
  value: r.dailyAmount.toLocaleString(undefined, TOKEN_FORMAT),
  tooltip: `${r.unclaimedAmount.toLocaleString(undefined, TOKEN_FORMAT)} unclaimed`,
  text: text || r.symbol,
  icon: r.icon,
});

const sumRewards = (acc, r) => acc + r.dailyAmount * r.price;

export const UserDailyRewards = () => {
  const { brrr, extra, net } = useRewards();

  const assetRewards = [
    ...(Object.entries(brrr).length > 0 ? [brrr] : []),
    ...extra.flatMap((f) => f[1]),
  ];

  const netRewards = net.flatMap((f) => f[1]);
  // const assetLabels = assetRewards.map((r) => transformAssetReward(r, "Pools"));
  // const netLabels = netRewards.map((r) => transformAssetReward(r, "Net Liquidity"));
  // const labels = [[...assetLabels], netLabels.length ? [...netLabels] : []];
  const amount = assetRewards.reduce(sumRewards, 0) + netRewards.reduce(sumRewards, 0);
  const netRewardsLabels = [
    [
      {
        value: "$1.25",
        text: "Supply",
      },
    ],
    [
      {
        value: "$5.26",
        text: "Incentive",
      },
    ],
    [
      {
        value: "-$2.26",
        text: "Borrow Interest",
      },
    ],
  ];
  const testIcon = netRewards[0].icon;
  const testIcons = [
    { src: testIcon },
    { src: testIcon },
    { src: testIcon },
    { src: testIcon },
    { src: testIcon },
  ];

  return (
    <div className="relative">
      <Stat
        title="Daily Rewards"
        titleTooltip="Estimated daily reward from incentives"
        amount={amount > 0 ? amount.toLocaleString(undefined, USD_FORMAT) : "$0"}
        labels={netRewardsLabels}
      />
      <TestIconsDisplay icons={testIcons} />
      <div className="absolute top-[58px] left-[220px]">
        <CustomTooltips
          text="test"
          style={{
            width: 170,
          }}
        >
          <div className="w-6 h-6 rounded-3xl bg-dark-100 flex items-center justify-center -ml-2.5 z-50">
            <svg
              width="12"
              height="4"
              viewBox="0 0 12 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.20005 1.9998C3.20005 2.66255 2.66279 3.1998 2.00005 3.1998C1.33731 3.1998 0.800049 2.66255 0.800049 1.9998C0.800049 1.33706 1.33731 0.799805 2.00005 0.799805C2.66279 0.799805 3.20005 1.33706 3.20005 1.9998ZM7.20005 1.9998C7.20005 2.66255 6.66279 3.1998 6.00005 3.1998C5.33731 3.1998 4.80005 2.66255 4.80005 1.9998C4.80005 1.33706 5.33731 0.799805 6.00005 0.799805C6.66279 0.799805 7.20005 1.33706 7.20005 1.9998ZM10 3.1998C10.6628 3.1998 11.2 2.66255 11.2 1.9998C11.2 1.33706 10.6628 0.799805 10 0.799805C9.33731 0.799805 8.80005 1.33706 8.80005 1.9998C8.80005 2.66255 9.33731 3.1998 10 3.1998Z"
                fill="#C0C4E9"
              />
            </svg>
          </div>
        </CustomTooltips>
      </div>
    </div>
  );
};

const transformProtocolReward = (r) => ({
  value: r.dailyAmount.toLocaleString(undefined, NUMBER_FORMAT),
  tooltip: `${r.remainingAmount.toLocaleString(undefined, TOKEN_FORMAT)} remaining`,
  text: r.symbol,
  icon: r.icon,
});

export const ProtocolDailyRewards = () => {
  const { protocol } = useRewards();

  const labels = protocol.map(transformProtocolReward);
  const amount = protocol.reduce(sumRewards, 0);

  return (
    <Stat
      title="Net Liquidity Daily Rewards"
      titleTooltip="Total protocol daily rewards from net liquidity"
      amount={amount.toLocaleString(undefined, USD_FORMAT)}
      labels={[labels]}
    />
  );
};

const TestIconsDisplay = ({ icons }) => (
  <div className="absolute top-[29px] left-[110px] flex">
    {icons.map((item, index) => (
      <img
        key={index}
        src={item.src}
        alt=""
        className="w-5 h-5 rounded-3xl border-2 border-gray-800"
        style={{
          marginLeft: icons.length > 1 && index > 0 ? `-10px` : undefined,
          zIndex: index + 1,
        }}
      />
    ))}
    {icons.length === 5 && (
      <div className="w-5 h-5 rounded-3xl border-2 border-gray-800 bg-dark-100 flex items-center justify-center -ml-2.5 z-50">
        <svg
          width="12"
          height="4"
          viewBox="0 0 12 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.20005 1.9998C3.20005 2.66255 2.66279 3.1998 2.00005 3.1998C1.33731 3.1998 0.800049 2.66255 0.800049 1.9998C0.800049 1.33706 1.33731 0.799805 2.00005 0.799805C2.66279 0.799805 3.20005 1.33706 3.20005 1.9998ZM7.20005 1.9998C7.20005 2.66255 6.66279 3.1998 6.00005 3.1998C5.33731 3.1998 4.80005 2.66255 4.80005 1.9998C4.80005 1.33706 5.33731 0.799805 6.00005 0.799805C6.66279 0.799805 7.20005 1.33706 7.20005 1.9998ZM10 3.1998C10.6628 3.1998 11.2 2.66255 11.2 1.9998C11.2 1.33706 10.6628 0.799805 10 0.799805C9.33731 0.799805 8.80005 1.33706 8.80005 1.9998C8.80005 2.66255 9.33731 3.1998 10 3.1998Z"
            fill="#C0C4E9"
          />
        </svg>
      </div>
    )}
  </div>
);

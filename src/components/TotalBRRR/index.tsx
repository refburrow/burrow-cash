import { Box, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { getTotalBRRR, getTotalDailyBRRRewards, isClaiming } from "../../redux/accountSelectors";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { TOKEN_FORMAT } from "../../store";
import { fetchAccount, farmClaimAll } from "../../redux/accountSlice";

export default function TotalBRRR() {
  const [total, unclaimed] = useAppSelector(getTotalBRRR);
  const totalDailyBRRRewards = useAppSelector(getTotalDailyBRRRewards);
  const isClaimingLoading = useAppSelector(isClaiming);
  const dispatch = useAppDispatch();

  const handleClaimAll = async () => {
    dispatch(farmClaimAll()).then(() => {
      dispatch(fetchAccount());
    });
  };

  return (
    <Box
      width={["100%", "580px"]}
      mx="auto"
      mb="2rem"
      bgcolor="#e5f6fd"
      px="1rem"
      py={["1.5rem", "0.75rem"]}
      boxShadow="0px 1px 1px rgba(0, 7, 65, 0.1)"
      borderRadius="0.3rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={["column", "row"]}
      fontSize="0.87rem"
    >
      <Stack spacing={1} mb={["1rem", 0]}>
        <Box textAlign="center">
          You&apos;ve earned: &nbsp;
          <b>{total.toLocaleString(undefined, TOKEN_FORMAT)} BRRR </b>
          (unclaimed: &nbsp;
          <span>{unclaimed.toLocaleString(undefined, TOKEN_FORMAT)}</span>)
        </Box>
        <Box>
          Total daily rewards: <b>{totalDailyBRRRewards.toLocaleString(undefined, TOKEN_FORMAT)}</b>
        </Box>
      </Stack>
      <LoadingButton
        size="small"
        color="secondary"
        variant="outlined"
        onClick={handleClaimAll}
        loading={isClaimingLoading}
        disabled={!unclaimed}
      >
        Claim all
      </LoadingButton>
    </Box>
  );
}

import { Box, Typography, useTheme } from "@mui/material";

import { InfoWrapper } from "../../components/InfoBox/style";
import { InfoBox } from "../../components";
import Table from "../../components/Table";
import { suppliedColumns, borrowedColumns } from "./tabledata";
import { useAppSelector } from "../../redux/hooks";
import { getTotalAccountBalance, getPortfolioAssets, getNetAPY } from "../../redux/accountSlice";

const Portfolio = () => {
  const theme = useTheme();
  const totalSuppliedBalance = useAppSelector(getTotalAccountBalance("supplied"));
  const totalBorroedBalance = useAppSelector(getTotalAccountBalance("borrowed"));
  const [suppliedRows, borrowedRows] = useAppSelector(getPortfolioAssets);
  const netAPY = useAppSelector(getNetAPY);

  return (
    <Box pb="2.5rem">
      <InfoWrapper sx={{ gridTemplateColumns: "auto auto auto" }}>
        <InfoBox title="Your Deposits" value={totalSuppliedBalance} />
        <InfoBox title="Net APY" value={netAPY} />
        <InfoBox title="Your Borrows" value={totalBorroedBalance} />
      </InfoWrapper>
      <Typography sx={{ fontSize: 24, padding: "1rem", textAlign: "center" }}>
        <span style={{ color: theme.palette.primary.main }}>Supplied</span> Assets
      </Typography>
      {suppliedRows.length ? (
        <Table rows={suppliedRows} columns={suppliedColumns} />
      ) : (
        <div style={{ textAlign: "center" }}>No supplied assets yet</div>
      )}
      <Typography sx={{ fontSize: 24, padding: "1rem", marginTop: "2rem", textAlign: "center" }}>
        <span style={{ color: theme.palette.primary.main }}>Borrowed</span> Assets
      </Typography>
      {borrowedRows.length ? (
        <Table rows={borrowedRows} columns={borrowedColumns} />
      ) : (
        <div style={{ textAlign: "center" }}>No borrowed assets yet</div>
      )}
    </Box>
  );
};

export default Portfolio;

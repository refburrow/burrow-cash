import { Menu, MenuItem, Divider } from "@mui/material";

import NearWalletSelector from "@near-wallet-selector/core";

import { getBurrow } from "../../utils";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { farmClaimAll, fetchAccount } from "../../redux/accountSlice";
import { getAccountId } from "../../redux/accountSelectors";
import { toggleDisplayValues, toggleShowDust } from "../../redux/appSlice";
import { getDisplayAsTokenValue, getShowDust } from "../../redux/appSelectors";
import {
  trackDisplayAsUsd,
  trackLogout,
  trackShowDust,
  trackClaimButton,
  trackToggleAmountDigits,
} from "../../telemetry";
import { useFullDigits } from "../../hooks";

interface Props {
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  selector: null | NearWalletSelector;
}

export const HamburgerMenu = ({ anchorEl, setAnchorEl, selector }: Props) => {
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const accountId = useAppSelector(getAccountId);
  const displayAsTokenValue = useAppSelector(getDisplayAsTokenValue);
  const showDust = useAppSelector(getShowDust);
  const { fullDigits, setDigits } = useFullDigits();
  const isCompact = fullDigits.table;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleDisplayValues = () => {
    trackDisplayAsUsd();
    dispatch(toggleDisplayValues());
  };

  const handleToggleShowDust = () => {
    trackShowDust();
    dispatch(toggleShowDust());
  };

  const handleSwitchWallet = async () => {
    await handleSignOut();
    selector?.show();
  };

  const handleSignOut = async () => {
    const { signOut } = await getBurrow();
    signOut();
    trackLogout();
    handleClose();
  };

  const handleClaimAll = async () => {
    handleClose();
    trackClaimButton();
    dispatch(farmClaimAll()).then(() => {
      dispatch(fetchAccount());
    });
  };

  const handleToggleAmountDigits = () => {
    const digits = { table: !fullDigits.table };
    trackToggleAmountDigits(digits);
    setDigits(digits);
  };

  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "logout-button",
      }}
    >
      {accountId && [
        <MenuItem sx={{ backgroundColor: "white" }} onClick={handleClaimAll} key={1}>
          Claim All Rewards
        </MenuItem>,
        <Divider key={2} />,
      ]}
      <MenuItem sx={{ backgroundColor: "white" }} onClick={handleToggleDisplayValues}>
        Display Values As {displayAsTokenValue ? "USD" : "Token"}
      </MenuItem>
      <MenuItem sx={{ backgroundColor: "white" }} onClick={handleToggleAmountDigits}>
        Display {isCompact ? "Full" : "Compact"} Amounts
      </MenuItem>
      <MenuItem sx={{ backgroundColor: "white" }} onClick={handleToggleShowDust}>
        {showDust ? "Hide" : "Show"} Dust
      </MenuItem>
      {accountId && [
        <Divider key={1} />,
        <MenuItem sx={{ backgroundColor: "white" }} onClick={handleSwitchWallet} key={2}>
          Switch Wallet
        </MenuItem>,
        <Divider key={3} />,
        <MenuItem sx={{ backgroundColor: "white" }} onClick={handleSignOut} key={4}>
          Sign Out
        </MenuItem>,
      ]}
    </Menu>
  );
};
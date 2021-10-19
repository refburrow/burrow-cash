import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Logo from "../../assets/logo.svg";
import { ViewMethodsLogic } from "../../config";
import { Burrow, IBurrow } from "../../index";
import { colors } from "../../style";
import { login, logout } from "../../utils";
import * as SC from "./style";

interface MobileSubHeaderButtonInput {
	onClick: any;
	border: boolean;
	text: string;
}

const MobileHeader = () => {
	const burrow = useContext<IBurrow | null>(Burrow);
	const [oracle, setOracle] = useState<string>("");
	const [owner, setOwner] = useState<string>("");

	useEffect(() => {
		(async () => {
			const config = await burrow?.view(
				burrow?.logicContract,
				ViewMethodsLogic[ViewMethodsLogic.get_config],
			);
			setOracle(config.oracle_account_id);
			setOwner(config.owner_id);
		})();
	}, []);

	const MobileSubHeaderButton = (props: MobileSubHeaderButtonInput) => {
		const { border, text, onClick } = props;
		const withBorderStyle = {
			borderWidth: "0",
			borderBottomWidth: "2px",
			borderRadius: "0",
			color: colors.secondary,
			fontWeight: 700,
			borderColor: colors.primary,
		}

		const withoutBorderStyle = {
			borderWidth: "0",
			color: colors.secondary,
			fontWeight: 700,
		}
		const style = border ? withBorderStyle : withoutBorderStyle;

		return (
			<Button size="medium" variant="outlined" style={style} onClick={onClick}>
				{text}
			</Button>
		);
	};

	const MobileSubHeader = () => {
		const history = useHistory();
		return (
			<SC.MobileSubHeaderToolbar>
				<MobileSubHeaderButton
					text="Supply"
					border={history.location.pathname === "/supply"}
					onClick={() => history.push("/supply")}
				/>
				<MobileSubHeaderButton
					text="Borrow"
					border={history.location.pathname === "/borrow"}
					onClick={() => history.push("/borrow")}
				/>
				<MobileSubHeaderButton
					text="Portfolio"
					border={history.location.pathname === "/portfolio"}
					onClick={() => history.push("/portfolio")}
				/>
			</SC.MobileSubHeaderToolbar>
		);
	};

	const onWalletButtonClick = () => {
		burrow?.walletConnection.isSignedIn()
			? logout(burrow!.walletConnection)
			: login(burrow!.walletConnection);
	}

	return (
		<SC.MobileHeaderWrapper>
			<SC.MobileHeaderToolbar>
				<Typography variant="h6" component="div" style={{ color: colors.primary }}>
					<Logo />
				</Typography>
				<Button
					size="small"
					variant="contained"
					style={{ backgroundColor: colors.primary }}
					onClick={onWalletButtonClick}>
					{burrow?.walletConnection.isSignedIn() ? "Disconnect" : "Connect"}
				</Button>
			</SC.MobileHeaderToolbar>
			<MobileSubHeader />
		</SC.MobileHeaderWrapper>
	);
};


export default MobileHeader;
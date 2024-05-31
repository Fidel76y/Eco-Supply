"use client";

import { useState, useEffect } from "react";
import { connectWallet } from "../utils/connectWallet";
import Web3Context from "../context/Web3Context";
import { handleAccountChange } from "../utils/handleAccountChange";
import { toast } from "react-hot-toast";
import { handleChainChange } from "@/utils/handleChainChange";
import Header from "./Header";
import { useRouter, usePathname } from "next/navigation";
import SignUpModal from "./SignUpModal";

const unregisteredAddress = "0x0000000000000000000000000000000000000000";

const Wallet = ({ children }) => {
	const router = useRouter();
	const [label, setLabel] = useState("Connect Wallet");
	const [isConnecting, setIsConnecting] = useState(false);
	const [state, setState] = useState({
		provider: null,
		balance: null,
		selectedAccount: null,
		supplyContract: null,
		chainId: null,
	});
	const [showModal, setShowModal] = useState(false);
	const [noSignupNeeded, setNoSignupNeeded] = useState(false);
	const currentPath = usePathname();

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", () =>
				handleAccountChange(setState)
			);
			window.ethereum.on("chainChanged", () => handleChainChange(setState));
			handleWallet();
		}

		return () => {
			if (window.ethereum) {
				window.ethereum.removeListener("accountsChanged", () =>
					handleAccountChange(setState)
				);
				window.ethereum.removeListener("chainChanged", () =>
					handleChainChange(setState)
				);
			}
		};
	}, []);

	useEffect(() => {
		if (!window.ethereum) {
			router.push("/");
			return;
		}
		if (state.chainId !== 4202 && !isConnecting) {
			router.push("/");
		} else {
			if (currentPath !== "/") {
				router.push(currentPath);
			} else {
				router.push("/dashboard");
			}
		}
	}, [state.chainId, currentPath, router, state.selectedAccount]);

	const handleWallet = async () => {
		try {
			setIsConnecting(true);
			setLabel("Connecting...");
			const { provider, selectedAccount, supplyContract, chainId, balance } =
				await connectWallet();
			setState({ provider, selectedAccount, supplyContract, chainId, balance });
		} catch (error) {
			toast.error("Error connecting wallet");
			console.error(error.message);
		} finally {
			// setIsLoading(false);
			setLabel("Connect Wallet");
			setIsConnecting(false);
		}
	};

	useEffect(() => {
		const checkUser = async () => {
			const userResult = await state.supplyContract.participants(
				state.selectedAccount
			);
			if (userResult[0] === unregisteredAddress && !noSignupNeeded) {
				setShowModal(true);
			} else {
				setShowModal(false);
				console.log("user registered ...");
			}
		};
		state.selectedAccount && checkUser();
	}, [
		state.selectedAccount,
		noSignupNeeded,
		showModal,
		state.supplyContract,
		state.provider,
	]);

	const handleDisconnect = async () => {
		if (window.ethereum) {
			try {
				setState((prev) => ({
					...prev,
					selectedAccount: null,
					balance: null,
					chainId: null,
				}));
				console.log("Disconnected from MetaMask");
			} catch (error) {
				console.error("Error disconnecting from MetaMask:", error);
			}
		}
	};

	return (
		<div className="flex flex-col">
			<Header
				onClick={handleWallet}
				handleDisconnect={handleDisconnect}
				label={label}
				account={state.selectedAccount}
				balance={state.balance}
				chainId={state.chainId}
			/>
			{showModal && (
				<SignUpModal
					setNoSignupNeeded={setNoSignupNeeded}
					supplyContract={state.supplyContract}
					setShowModal={setShowModal}
					showModal={showModal}
				/>
			)}

			<Web3Context.Provider value={state}>{children}</Web3Context.Provider>
		</div>
	);
};
export default Wallet;

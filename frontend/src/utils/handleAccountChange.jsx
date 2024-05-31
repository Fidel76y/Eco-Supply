import { Contract, ethers } from "ethers";
import supplyABI from "../ABI/contractABI.json";

export const handleAccountChange = async (setState) => {
	const accounts = await window.ethereum.request({ method: "eth_accounts" });
	console.log("running");

	if (accounts.length === 0) {
		// If there are no accounts, clear the selectedAccount state
		setState((prevState) => ({ ...prevState, selectedAccount: null }));
	} else {
		// If there are accounts, update the selectedAccount state with the first account
		const selectedAccount = accounts[0];
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const supplyContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
		const supplyContract = new Contract(
			supplyContractAddress,
			supplyABI,
			signer
		);
		// console.log(supplyContract);
		// console.log(signer);

		const BigNumBalance = await provider.getBalance(selectedAccount);
		const balance = Number(ethers.formatEther(BigNumBalance));
		// console.log(selectedAccount);
		setState((prevState) => ({
			...prevState,
			supplyContract,
			selectedAccount,
			balance,
		}));

		window.location.reload();

	}
	// const selectedAccount = accounts[0];
	// setState(prevState=>({...prevState,selectedAccount}))
};

import { ethers } from "ethers";

export const handleChainChange = async (setState) => {
	let chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
	const chainId = parseInt(chainIdHex, 16);

	const accounts = await window.ethereum.request({
		method: "eth_requestAccounts",
	});

	let selectedAccount = accounts[0];

	const provider = new ethers.BrowserProvider(window.ethereum);

	const BigNumBalance = await provider.getBalance(selectedAccount);
	const balance = Number(ethers.formatEther(BigNumBalance));

	setState((prevState) => ({ ...prevState, chainId, balance }));
};

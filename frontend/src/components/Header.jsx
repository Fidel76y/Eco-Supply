import React from "react";
import { Button } from "./ui/button";
import ConnectBtn from "./ConnectBtn";
import Image from "next/image";


const Header = ({
	onClick,
	handleDisconnect,
	label,
	account,
	balance,
	chainId,
}) => {
	return (
		<header className="sticky top-0 z-10">
			<nav className="bg-gray-100">
				<div className="mx-auto px-4">
					<div className="flex justify-between">
						<div className="flex space-x-4">
							<div>
								<a
									href="#"
									className="flex items-center gap-2 py-5 px-2 text-gray-700 hover:text-gray-900"
								>
									<Image src="/Eco.png" alt="logo" width={40} height={40} />
									<span className="font-bold">Eco Supply</span>
								</a>
							</div>
						</div>

						<div className="flex items-center space-x-1">
							<ConnectBtn
								onClick={onClick}
								handleDisconnect={handleDisconnect}
								type="button"
								label={label}
								account={account}
								balance={balance}
								chainId={chainId}
							/>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;

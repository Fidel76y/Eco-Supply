import { Inter } from "next/font/google";
import "./globals.css";
import Wallet from "../components/Wallet";
import { ToastProvider } from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Eco Supply",
	description:
		"Our Supply Chain Management Smart Contracts harness the power of blockchain technology to redefine supply chain operations, emphasizing transparency, efficiency, and stakeholder empowerment. By embedding product production, transportation, and quality-related metadata directly onto the blockchain, we enhance traceability and accountability across the entire supply chain. This innovative approach not only mitigates risks associated with fraud and counterfeiting but also fosters trust among manufacturers, suppliers, vendors, and customers alike.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ToastProvider />
				<Wallet>
					<main>{children}</main>
				</Wallet>
			</body>
		</html>
	);
}

import Link from "next/link";
import React from "react";

const TimelineCard = ({ item: product }) => {
	let verb;
	let noun;
	if (product.id === 1) {
		verb = "manufactured";
		noun = product.name;
	} else if (product.id === 2) {
		verb = "shipped";
		noun = product.name;
	} else if (product.id === 3) {
		verb = "shipped";
		noun = product.name;
	} else if (product.id === 4) {
		verb = "sold";
		noun = product.name;
	}
	return (
		<>
			<div
				className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${
					product.address && "is-active"
				} `}
			>
				<div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
					{product.address && (
						<svg
							className="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="10"
						>
							<path
								fill-rule="nonzero"
								d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
							/>
						</svg>
					)}
				</div>
				{/* <!-- Card --> */}
				<div
					className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow ${
						!product.address && "bg-gray-200"
					}`}
				>
					<div className="flex items-center justify-between space-x-2 mb-1">
						<div className="font-bold text-slate-900">{product.title}</div>
						<time className="font-caveat font-medium text-indigo-500">
							{/* 09/06/2023 */}
							{product.address && product.date}
						</time>
					</div>
					<div className={`text-slate-500`}>
						{product.address && (
							<>
								This product was {verb}{" "}
								{product.id === 1 || product.id === 4 ? "by " : "to "}
								<Link className="text-blue-500 underline" href={`/account/${product.address}`}>{noun}</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default TimelineCard;

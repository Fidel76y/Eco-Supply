import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const PendingVerifications = () => {

    const router = useRouter()

	const handleClick = async () => {
		// setIsLoading(true);

		router.push(`/pending-verification`);
	};
	return (
		<div>
			{" "}
			<Button onClick={handleClick} variant="outline">
				View Verification Requests
			</Button>
		</div>
	);
};

export default PendingVerifications;

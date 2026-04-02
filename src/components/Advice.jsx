import { useState } from "react";
import diceIcon from "../assets/icon-dice.svg";
import desktopDivider from "../assets/pattern-divider-desktop.svg";
import mobileDivider from "../assets/pattern-divider-mobile.svg";

const Advice = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const handleClick = async () => {
		setIsLoading(true); // start loading
		try {
			const res = await fetch("https://api.adviceslip.com/advice");
			const data = await res.json();
			setData(data);
		} catch (err) {
			setError("Error fetching advice");
		} finally {
			setIsLoading(false);
		}
	};

	return error ? (
		<p className="text-red-500 font-bold text-4xl">{error}</p>
	) : (
		<div className="w-full h-full flex flex-col items-center relative">
			{isLoading ? (
				<p className="text-green-300 font-bold">Loading...</p>
			) : (
				<div className="flex flex-col items-center gap-200 md:gap-300">
					<p className="text-green-300 tracking-[0.25rem] text-center font-extrabold">
						Advice #{data && data.slip.id}
					</p>
					<h1 className="text-white font-bold text-2xl md:text-[1.75rem] text-center">
						“{data && data.slip.advice}”
					</h1>
				</div>
			)}
			<img
				src={desktopDivider}
				className="mt-10 mb-10 hidden md:block"
				alt=""
			/>
			<img src={mobileDivider} className="mt-8 mb-8 block md:hidden" alt="" />

			<button
				className="flex justify-center items-center w-16 h-16 rounded-full bg-green-300 transition-shadow duration-500 hover:shadow-[0_0_40px_var(--color-green-300)] absolute -bottom-17.5 cursor-pointer"
				onClick={handleClick}>
				<img src={diceIcon} alt="" />
			</button>
		</div>
	);
};

export default Advice;

import { useTranslation } from "react-i18next";
import { ImageContainer } from "src/components/ImageContainer";

export const Searcher = () => {
	const { t } = useTranslation("translation", { keyPrefix: "Searcher" });
	return (
		<ImageContainer>
			<div className="w-full h-full flex justify-center px-4">
				<div className="w-full h-full max-w-screen-md flex flex-col items-center justify-end pb-32">
					<h1 className="text-white text-4xl mb-8 text-center">
						{t("platform_tagline")}
					</h1>
					<div className="w-full flex">
						<input
							id="name"
							type="text"
							placeholder={t("search_placeholder")}
							className="w-2/3 p-3 border-r-1 border-gray-300 rounded-l-md outline-none bg-white bg-opacity-90"
						/>
						<input
							id="location"
							type="text"
							placeholder={t("search_location_placeholder")}
							className="w-1/3 p-3 outline-none bg-white bg-opacity-90"
						/>
						<button className="bg-primary text-white rounded-r-md px-5 py-3 bg-opacity-90 hover:bg-opacity-100">
							{t("search_button")}
						</button>
					</div>
				</div>
			</div>
		</ImageContainer>
	);
};

import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteProps,
} from "@nextui-org/react";
import { useFormikContext } from "formik";
import { debounce } from "lodash";
import { FC, useCallback, useState } from "react";
import { ILocation } from "src/core/types";

interface IRegion {
	name: string;
	pos: string;
	provinceName: string;
}

export const RegionSelect: FC<
	Omit<AutocompleteProps, "items" | "onInputChange">
> = (props) => {
	const { setFieldValue } = useFormikContext();

	const [regions, setRegions] = useState<IRegion[]>([]);

	const handleRegionQuery = useCallback(
		async (query: string) => {
			if (query?.length < 1) {
				return;
			}

			const response = await fetch(
				`https://functions.yandexcloud.net/d4e66i32i0s9783irqrp?query=${query.split(" ").join("+")}`,
			);
			if (response.ok) {
				const data = await response.json();
				setRegions(data);
			}
		},
		[setRegions],
	);

	const handleRegionChange = useCallback(
		async (
			region: IRegion,
			setFieldValue: (field: string, value: ILocation) => unknown,
		) => {
			if (!props.name) {
				return;
			}

			await setFieldValue(props.name, {
				type: "Point",
				coordinates: region.pos.split(" ").map(Number),
			});
		},
		[],
	);

	const debouncedHandleRegionQuery = debounce(handleRegionQuery, 1000);

	return (
		<Autocomplete
			{...props}
			items={regions}
			onInputChange={debouncedHandleRegionQuery}
		>
			{regions.map((region, index) => (
				<AutocompleteItem
					tabIndex={index}
					key={index}
					textValue={region.name}
					onClick={() => handleRegionChange(region, setFieldValue)}
				>
					<div>
						<p>{region.name}</p>
						{region.provinceName !== "N/A" && (
							<p className="text-sm text-gray-500">{region.provinceName}</p>
						)}
					</div>
				</AutocompleteItem>
			))}
		</Autocomplete>
	);
};

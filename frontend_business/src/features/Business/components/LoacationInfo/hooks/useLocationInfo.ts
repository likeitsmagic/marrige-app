import { useFormikContext } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useBusiness } from "src/features/Business/hooks/useBusiness";
import { BusinessValues } from "src/features/Business/schema";

import { LOCATION } from "../constants";

export const useLocationInfo = () => {
	const { yandexMapsApiKey } = useBusiness();

	const { values, setFieldValue } = useFormikContext<BusinessValues>();

	const [isLoading, setIsLoading] = useState(true);
	const [mapCenter, setMapCenter] = useState(
		values.location.coordinates.length > 0
			? [values.location.coordinates[1], values.location.coordinates[0]]
			: LOCATION.center,
	);
	const [address, setAddress] = useState(values.address);

	const handleLoad = useCallback(() => {
		setIsLoading(false);
	}, []);

	// @ts-expect-error not enough types in @pbe/react-yandex-maps
	const handleMapChange = useCallback((e) => {
		const newCenter = e.get("target").getCenter();
		setMapCenter(newCenter);
	}, []);

	useEffect(() => {
		const debounceTimeout = setTimeout(async () => {
			try {
				const response = await fetch(
					`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${yandexMapsApiKey}&geocode=${mapCenter[1]},${mapCenter[0]}`,
				);
				const data = await response.json();
				const address =
					data.response.GeoObjectCollection.featureMember[0]?.GeoObject
						?.metaDataProperty?.GeocoderMetaData?.text;
				setAddress(address || "Address not found");
				setFieldValue("address", address);
				setFieldValue("location", {
					type: "Point",
					coordinates: [mapCenter[1], mapCenter[0]],
				});
			} catch (error) {
				console.warn(error);
				setAddress("Error fetching address");
			}
		}, 500);

		return () => clearTimeout(debounceTimeout);
	}, [mapCenter, yandexMapsApiKey, setFieldValue]);

	const handleSearchResult = useCallback(
		(ref: ymaps.Map) => {
			if (ref) {
				ref.events.add("resultselect", (e) => {
					// @ts-expect-error not enough types in @pbe/react-yandex-maps
					const index = ref.getSelectedIndex(e);
					const result = e.get("target").getResultsArray()[index];
					if (result) {
						const newCoords = result.geometry.getCoordinates();
						const newAddress = result.getAddressLine();

						setMapCenter(newCoords);
						setAddress(newAddress);
						setFieldValue("location", {
							type: "Point",
							coordinates: [newCoords[1], newCoords[0]],
						});
						setFieldValue("address", newAddress);
					}
				});
			}
		},
		[setFieldValue],
	);

	return {
		isLoading,
		address,
		mapCenter,
		handleLoad,
		handleMapChange,
		handleSearchResult,
		yandexMapsApiKey,
	};
};

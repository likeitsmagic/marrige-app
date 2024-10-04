import {
	Flex,
	List,
	ListItemData,
	TextInput,
	TextInputProps,
	Text,
} from "@gravity-ui/uikit";
import { useField, useFormikContext } from "formik";
import { debounce, omit } from "lodash";
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";

interface IRegion {
	name: string;
	pos: string;
	provinceName: string;
}

export const RegionSelect: FC<Omit<TextInputProps, "onChange">> = (props) => {
	const { setFieldValue } = useFormikContext();

	const [{ value }] = useField(props.name as string);

	const [regions, setRegions] = useState<IRegion[]>([]);
	const handleRegionQuery = useCallback(
		async (query: ChangeEvent<HTMLInputElement>) => {
			if (query?.target?.value?.length < 1) {
				setRegions([]);
				setFieldValue(props.name as string, null);
				return;
			}
			const response = await fetch(
				`https://functions.yandexcloud.net/d4e66i32i0s9783irqrp?query=${query.target.value.split(" ").join("+")}`,
			);
			if (response.ok) {
				const data = await response.json();
				setRegions(data);
			}
		},
		[setRegions, setFieldValue, props.name],
	);

	const handleRegionChange = useCallback(
		async (item: ListItemData<{ title: string; region: IRegion }>) => {
			if (!props.name) {
				return;
			}

			await setFieldValue(props.name, {
				type: "Point",
				coordinates: item.region.pos.split(" ").map(Number),
			});
		},
		[props.name, setFieldValue],
	);

	const debouncedHandleRegionQuery = debounce(handleRegionQuery, 1000);

	const omitedProps = omit(props, [
		"filterable",
		"onFilterChange",
		"onUpdate",
		"value",
		"loading",
	]);

	const items = useMemo(
		() =>
			regions.map((region) => ({
				title: region.name,
				region,
			})),
		[regions],
	);

	const renderItem = useCallback(
		(item: ListItemData<{ title: string; region: IRegion }>) => {
			return (
				<Flex direction="column" gap={1} style={{ paddingLeft: 4 }}>
					<Text>{item.title}</Text>
					<Text variant="caption-2" color="hint">
						{item.region.provinceName}
					</Text>
				</Flex>
			);
		},
		[],
	);

	const selectedItemIndex = useMemo(() => {
		return items.findIndex(
			(item) => item.region.pos === value?.coordinates?.join(" "),
		);
	}, [items, value]);

	return (
		<Flex direction="column" gap={1}>
			<TextInput {...omitedProps} onChange={debouncedHandleRegionQuery} />
			<List
				filterable={false}
				items={items}
				onItemClick={handleRegionChange}
				itemsHeight={items.length * 70}
				itemHeight={60}
				renderItem={renderItem}
				selectedItemIndex={selectedItemIndex}
			/>
		</Flex>
	);
};

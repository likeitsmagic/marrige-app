import { Select, SelectProps } from "@gravity-ui/uikit";
import { FC, useCallback } from "react";
import { useField } from "formik";

import { CATEGORY_SELECT_OPTIONS } from "./constants";

export const CategorySelect: FC<SelectProps> = (props) => {
	const [{ value }, { error, touched }, { setValue, setTouched }] = useField(
		props.name ?? "",
	);

	const handleUpdate = useCallback(
		async (value: string[]) => {
			await setValue(value[0]);
		},
		[setValue],
	);

	const handleBlur = useCallback(() => {
		setTouched(true);
	}, [setTouched]);

	return (
		<Select
			name={props.name}
			onBlur={handleBlur}
			value={[value]}
			validationState={touched && error ? "invalid" : undefined}
			errorMessage={error}
			onUpdate={handleUpdate}
			multiple={false}
		>
			{CATEGORY_SELECT_OPTIONS.map((option) => (
				<Select.Option
					key={option.value}
					value={option.value}
					content={option.label}
				/>
			))}
		</Select>
	);
};

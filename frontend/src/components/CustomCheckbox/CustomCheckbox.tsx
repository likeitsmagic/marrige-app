import {
	useCheckbox,
	Chip,
	VisuallyHidden,
	tv,
	CheckboxProps,
} from "@nextui-org/react";
import { FC, useRef } from "react";
import { MdCheck } from "react-icons/md";

const checkbox = tv({
	slots: {
		base: "border-default hover:bg-default-200",
		content: "text-default-500",
	},
	variants: {
		isSelected: {
			true: {
				base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
				content: "text-primary-foreground pl-1",
			},
		},
		isFocusVisible: {
			true: {
				base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
			},
		},
	},
});

export const CustomCheckbox: FC<CheckboxProps> = (props) => {
	const {
		children,
		isSelected,
		isFocusVisible,
		getBaseProps,
		getLabelProps,
		getInputProps,
	} = useCheckbox(props);

	const styles = checkbox({ isSelected, isFocusVisible });

	const ref = useRef<HTMLDivElement>(null);

	return (
		<label {...getBaseProps()}>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<Chip
				classNames={{
					base: styles.base(),
					content: styles.content(),
				}}
				color="primary"
				startContent={
					isSelected ? <MdCheck className="ml-1" color="white" /> : null
				}
				variant="faded"
				{...getLabelProps()}
				ref={ref}
			>
				{children ? children : isSelected ? "Enabled" : "Disabled"}
			</Chip>
		</label>
	);
};

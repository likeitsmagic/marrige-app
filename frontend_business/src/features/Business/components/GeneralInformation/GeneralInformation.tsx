import { FormRow } from "@gravity-ui/components";
import {
	Card,
	Col,
	Container,
	Row,
	TextArea,
	TextInput,
} from "@gravity-ui/uikit";
import { Field, useFormikContext } from "formik";
import { CONTAINER_PADDING } from "src/core/constants";
import i18n from "src/i18n";
import { CircleRuble } from "@gravity-ui/icons";

import { BusinessValues } from "../../schema";
import { CategorySelect } from "../CategorySelect";

export const GeneralInformation = () => {
	const { errors, touched, isSubmitting } = useFormikContext<BusinessValues>();

	return (
		<Card>
			<Container style={CONTAINER_PADDING}>
				<FormRow
					label={i18n.i18n("business", "name")}
					direction="column"
					required
				>
					<Field
						name="name"
						type="text"
						placeholder={i18n.i18n("business", "name_placeholder")}
						validationState={
							!!touched.name && !!errors.name ? "invalid" : undefined
						}
						errorMessage={errors.name}
						disabled={isSubmitting}
						as={TextInput}
					/>
				</FormRow>
				<FormRow
					label={i18n.i18n("business", "category")}
					direction="column"
					required
				>
					<Field
						name="type"
						type="text"
						placeholder={i18n.i18n("business", "category_placeholder")}
						validationState={
							!!touched.type && !!errors.type ? "invalid" : undefined
						}
						errorMessage={errors.type}
						disabled={isSubmitting}
						as={CategorySelect}
					/>
				</FormRow>
				<Row space={2}>
					<Col s={12} m={6}>
						<FormRow
							label={i18n.i18n("business", "min_price")}
							direction="column"
							required
						>
							<Field
								name="minPrice"
								type="number"
								placeholder={i18n.i18n("business", "min_price_placeholder")}
								validationState={
									!!touched.minPrice && !!errors.minPrice
										? "invalid"
										: undefined
								}
								errorMessage={errors.minPrice}
								disabled={isSubmitting}
								endContent={<CircleRuble />}
								as={TextInput}
							/>
						</FormRow>
					</Col>
					<Col s={12} m={6}>
						<FormRow
							label={i18n.i18n("business", "max_price")}
							direction="column"
							required
						>
							<Field
								name="maxPrice"
								type="number"
								placeholder={i18n.i18n("business", "max_price_placeholder")}
								validationState={
									!!touched.maxPrice && !!errors.maxPrice
										? "invalid"
										: undefined
								}
								errorMessage={errors.maxPrice}
								disabled={isSubmitting}
								endContent={<CircleRuble />}
								as={TextInput}
							/>
						</FormRow>
					</Col>
				</Row>
				<FormRow
					label={i18n.i18n("business", "description")}
					direction="column"
				>
					<Field
						name="description"
						placeholder={i18n.i18n("business", "description_placeholder")}
						validationState={
							!!touched.description && !!errors.description
								? "invalid"
								: undefined
						}
						errorMessage={errors.description}
						minRows={10}
						maxRows={15}
						disabled={isSubmitting}
						as={TextArea}
					/>
				</FormRow>
			</Container>
		</Card>
	);
};

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Field, Formik } from "formik";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RegionSelect } from "src/components/RegionSelect";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AdvantagesSelect } from "./components/AdvantagesSelect";
import { ImagesUploader } from "./components/ImagesUploader";
import { useCreateCampaign } from "./hooks/useCreateCampaign";
import { CreateCampaignSchema, schema } from "./schema";

export const CreateCampaign: FC = () => {
	const { t } = useTranslation("translation", { keyPrefix: "CreateCampaign" });

	const { createCampaign } = useCreateCampaign();

	const initialValues: CreateCampaignSchema = {
		name: "",
		phone: "",
		location: undefined,
		advantages: [],
		images: [],
	};

	const handleSubmit = useCallback(
		async (values: CreateCampaignSchema) => createCampaign(values),
		[createCampaign],
	);

	return (
		<div className="flex justify-center items-center w-screen py-20">
			<Card className="w-1/2">
				<CardHeader>
					<p className="text-xl">{t("create_a_campaign")}</p>
				</CardHeader>
				<CardBody>
					<Formik<CreateCampaignSchema>
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={toFormikValidationSchema(schema)}
					>
						{({ isSubmitting, handleSubmit, touched, errors }) => (
							<form onSubmit={handleSubmit} className="flex flex-col gap-4">
								<Field
									variant="underlined"
									name="name"
									label={t("name")}
									disabled={isSubmitting}
									isInvalid={touched.name && !!errors.name}
									errorMessage={touched.name && errors.name}
									as={Input}
								/>
								<Field
									variant="underlined"
									name="phone"
									label={t("phone")}
									disabled={isSubmitting}
									isInvalid={touched.phone && !!errors.phone}
									errorMessage={touched.phone && errors.phone}
									as={Input}
								/>
								<Field
									variant="underlined"
									name="location"
									placeholder={t("region_query_placeholder")}
									label={t("region_query")}
									type="text"
									disabled={isSubmitting}
									isInvalid={touched.location && !!errors.location}
									errorMessage={touched.location && errors.location}
									isClearable={false}
									listboxProps={{
										emptyContent: t("no_regions_found"),
									}}
									as={RegionSelect}
								/>
								<AdvantagesSelect />
								<ImagesUploader name="images" />
								<Button type="submit" color="primary" isLoading={isSubmitting}>
									{t("create")}
								</Button>
							</form>
						)}
					</Formik>
				</CardBody>
			</Card>
		</div>
	);
};

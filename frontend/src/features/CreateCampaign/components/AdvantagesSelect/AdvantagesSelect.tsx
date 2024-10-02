import { CheckboxGroup } from "@nextui-org/react";
import { useField, useFormikContext } from "formik";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CustomCheckbox } from "src/components/CustomCheckbox";

import { useCreateCampaign } from "../../hooks/useCreateCampaign";

export const AdvantagesSelect = () => {
	const { t } = useTranslation("translation", { keyPrefix: "CreateCampaign" });

	const { advantages } = useCreateCampaign();

	const { isSubmitting } = useFormikContext();
	const [{ value }, , { setValue }] = useField<string[]>("advantages");

	const handleChange = useCallback(
		async (id: string) => {
			const newSelectedAdvantages = value.includes(id)
				? value.filter((item) => item !== id)
				: [...value, id];
			await setValue(newSelectedAdvantages);
		},
		[setValue, value],
	);

	return (
		<CheckboxGroup
			name="advantages"
			label={t("advantages")}
			orientation="horizontal"
		>
			{advantages?.data?.map((advantage) => (
				<CustomCheckbox
					key={advantage.id}
					value={advantage.id}
					// eslint-disable-next-line
					onClick={() => handleChange(advantage.id)}
					disabled={isSubmitting}
				>
					{advantage.textRu}
				</CustomCheckbox>
			))}
		</CheckboxGroup>
	);
};

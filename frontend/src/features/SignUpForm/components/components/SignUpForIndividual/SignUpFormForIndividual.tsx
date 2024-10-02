import { Button, Input, Link } from "@nextui-org/react";
import { Field, Formik } from "formik";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { RegionSelect } from "src/components/RegionSelect";
import { useAuthContext } from "src/core/auth/useAuth";
import { useSignUpSchema } from "src/features/SignUpForm/hooks/useSignUpSchema";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const SignUpFormForIndividual = () => {
	const { t } = useTranslation("translation", { keyPrefix: "SignUpForm" });

	const schema = useSignUpSchema(false);

	const [error, setError] = useState<string | undefined>(undefined);
	const navigate = useNavigate();

	const { signup, updateInfo } = useAuthContext();

	const initialValues: z.infer<typeof schema> = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	const onSubmit = useCallback(
		async (values: z.infer<typeof schema>) => {
			setError(undefined);
			const result = await signup(
				values.email,
				values.password,
				false,
				values.location,
			);

			if (result.registered) {
				updateInfo();
				navigate("/");
				return;
			}

			if (!result.registered && result.error) {
				setError(result.error);
			}
		},
		[signup, updateInfo, navigate],
	);

	return (
		<div className="p-6">
			<Formik<z.infer<typeof schema>>
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={toFormikValidationSchema(schema)}
			>
				{({ handleSubmit, isSubmitting, errors, touched }) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<h2 className="text-center text-xl font-semibold">
							{t("register_your_account")}
						</h2>
						<p className="text-center text-sm text-gray-500">
							{t("already_have_an_account")}{" "}
							<Link size="sm" as={RouterLink} to="/signin">
								{t("sign_in")}
							</Link>
						</p>
						<Field
							variant="underlined"
							name="email"
							label={t("your_email")}
							type="email"
							disabled={isSubmitting}
							isInvalid={touched.email && !!errors.email}
							errorMessage={touched.email && errors.email}
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
							errorMessage={touched.location && (errors.location as string)}
							isClearable={false}
							listboxProps={{
								emptyContent: t("no_regions_found"),
							}}
							as={RegionSelect}
						/>
						<Field
							variant="underlined"
							name="password"
							label={t("password")}
							type="password"
							disabled={isSubmitting}
							isInvalid={touched.password && !!errors.password}
							errorMessage={touched.password && errors.password}
							as={Input}
						/>
						<Field
							variant="underlined"
							name="confirmPassword"
							label={t("repeat_password")}
							type="password"
							disabled={isSubmitting}
							isInvalid={touched.confirmPassword && !!errors.confirmPassword}
							errorMessage={touched.confirmPassword && errors.confirmPassword}
							as={Input}
						/>
						<Button
							type="submit"
							fullWidth
							color="primary"
							className="mt-4"
							isLoading={isSubmitting}
						>
							{t("register")}
						</Button>
						{error && <p className="text-red-500 text-center pt-2">{error}</p>}
					</form>
				)}
			</Formik>
		</div>
	);
};

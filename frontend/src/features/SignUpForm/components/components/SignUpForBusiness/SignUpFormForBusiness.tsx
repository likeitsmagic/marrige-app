import { Button, Input, Link } from "@nextui-org/react";
import { Field, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "src/core/auth/useAuth";
import { useSignUpSchema } from "src/features/SignUpForm/hooks/useSignUpSchema";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const SignUpFormForBusiness = () => {
	const { t } = useTranslation("translation", { keyPrefix: "SignUpForm" });

	const schema = useSignUpSchema(true);

	const navigate = useNavigate();

	const { signup, updateInfo } = useAuthContext();

	const initialValues: z.infer<typeof schema> = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	const onSubmit = async (values: z.infer<typeof schema>) => {
		const result = await signup(values.email, values.password, true);

		if (result.registered) {
			updateInfo();
			navigate("/");
		}
	};

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
							{t("already_have_an_account_for_business")}{" "}
							<Link size="sm" as={RouterLink} to="/signin?business=true">
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
					</form>
				)}
			</Formik>
		</div>
	);
};

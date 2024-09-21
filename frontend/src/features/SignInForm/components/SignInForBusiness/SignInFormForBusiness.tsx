import { Button, Input, Link } from "@nextui-org/react";
import { Field, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/core/auth/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { SignInSchema } from "../../schema";

type LoginValues = z.infer<typeof SignInSchema>;

export const SignInFormForBusiness = () => {
	const { t } = useTranslation("translation", { keyPrefix: "SignInForm" });

	const navigate = useNavigate();
	const { signin, updateInfo } = useAuthContext();

	const initialValues: LoginValues = {
		email: "",
		password: "",
	};

	const onSubmit = async (data: LoginValues) => {
		const loginData = await signin(data.email, data.password);

		if (loginData.authenticated) {
			updateInfo();
			navigate("/");
			return;
		}
	};

	return (
		<div className="p-6">
			<Formik<LoginValues>
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={toFormikValidationSchema(SignInSchema)}
			>
				{({ handleSubmit, isSubmitting, errors }) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<h2 className="text-center text-xl font-semibold">
							{t("access_your_account")}
						</h2>
						<p className="text-center text-sm text-gray-500">
							{t("sign_up_for_business")}{" "}
							<Link size="sm" as={RouterLink} to="/signup?business=true">
								{t("sign_up")}
							</Link>
						</p>
						<Field
							variant="underlined"
							name="email"
							label={t("your_email")}
							type="email"
							disabled={isSubmitting}
							isInvalid={!!errors.email}
							errorMessage={errors.email}
							as={Input}
						/>
						<Field
							variant="underlined"
							name="password"
							label={t("password")}
							type="password"
							disabled={isSubmitting}
							isInvalid={!!errors.password}
							errorMessage={errors.password}
							as={Input}
						/>
						<div className="flex justify-end">
							<Link size="sm" className="text-sm text-gray-500">
								{t("forgot_password")}
							</Link>
						</div>
						<Button
							type="submit"
							fullWidth
							color="primary"
							className="mt-4"
							isLoading={isSubmitting}
						>
							{t("access")}
						</Button>
					</form>
				)}
			</Formik>
		</div>
	);
};

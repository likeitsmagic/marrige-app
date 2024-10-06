import { FormRow, PasswordInput } from "@gravity-ui/components";
import { ArrowLeft } from "@gravity-ui/icons";
import {
	Button,
	Card,
	Col,
	Container,
	Flex,
	Icon,
	Row,
	Text,
	TextInput,
} from "@gravity-ui/uikit";
import { Field, Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Captcha } from "src/components/Captcha";

import { YandexAuth } from "../Auth/compoenents/Yandex";

import { schema, SignUpValues } from "./schema";

export const SignUpFormV2 = () => {
	const navigate = useNavigate();
	const { signup, updateInfo } = useAuthContext();
	const [error, setError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const initialValues = useMemo<SignUpValues>(
		() => ({
			email: "",
			password: "",
			confirmPassword: "",
		}),
		[],
	);

	const onSubmit = useCallback(
		async (values: SignUpValues) => {
			if (!token) {
				setError(i18n.i18n("validation", "captcha_required"));
				return;
			}

			setError(null);
			const result = await signup(values.email, values.password, false);

			if (result.registered) {
				updateInfo();
				navigate("/");
				return;
			}

			if (!result.registered && result.error) {
				setError(result.error);
			}
		},
		[signup, updateInfo, navigate, token],
	);

	const handleBack = useCallback(() => {
		navigate("/");
	}, [navigate]);

	return (
		<Container>
			<Flex
				width="100%"
				height="100vh"
				justifyContent="center"
				alignItems="center"
			>
				<Card style={{ padding: "24px", width: "100%", maxWidth: "400px" }}>
					<Flex direction="column" alignItems="center" gap={3}>
						<Button
							view="flat"
							size="m"
							style={{ alignSelf: "flex-start" }}
							onClick={handleBack}
						>
							<Icon data={ArrowLeft} /> {i18n.i18n("signup", "back")}
						</Button>
						<Text variant="header-1">{i18n.i18n("signup", "title")}</Text>
						{error && (
							<Text variant="body-1" color="danger">
								{error}
							</Text>
						)}
						<Formik<SignUpValues>
							initialValues={initialValues}
							onSubmit={onSubmit}
							validationSchema={toFormikValidationSchema(schema)}
						>
							{({ handleSubmit, isSubmitting, errors, touched }) => (
								<form onSubmit={handleSubmit} style={{ width: "100%" }}>
									<FormRow
										label={i18n.i18n("signup", "email")}
										direction="column"
									>
										<Field
											name="email"
											type="email"
											size="l"
											placeholder={i18n.i18n("signup", "email")}
											disabled={isSubmitting}
											error={touched.email && !!errors.email}
											errorMessage={errors.email}
											as={TextInput}
										/>
									</FormRow>

									<FormRow
										label={i18n.i18n("signup", "password")}
										direction="column"
									>
										<Field
											name="password"
											type="password"
											size="l"
											placeholder={i18n.i18n("signup", "password")}
											disabled={isSubmitting}
											error={touched.password && !!errors.password}
											errorMessage={errors.password}
											as={PasswordInput}
										/>
									</FormRow>
									<FormRow
										label={i18n.i18n("signup", "repeat_password")}
										direction="column"
									>
										<Field
											name="confirmPassword"
											type="password"
											size="l"
											placeholder={i18n.i18n("signup", "repeat_password")}
											disabled={isSubmitting}
											error={
												touched.confirmPassword && !!errors.confirmPassword
											}
											errorMessage={errors.confirmPassword}
											as={PasswordInput}
										/>
									</FormRow>
									<Row space={4}>
										<Col s={12}>
											<Captcha setToken={setToken} />
										</Col>
										<Col s={12}>
											<Button
												type="submit"
												loading={isSubmitting}
												view="action"
												size="l"
												width="max"
											>
												{i18n.i18n("signup", "register")}
											</Button>
										</Col>
										<Col s={12}>
											<YandexAuth />
										</Col>
									</Row>
								</form>
							)}
						</Formik>
					</Flex>
				</Card>
			</Flex>
		</Container>
	);
};

export const SignUpFormV2Name = "sign-up-form-v2";

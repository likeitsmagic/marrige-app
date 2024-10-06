import { FormRow, PasswordInput } from "@gravity-ui/components";
import { ArrowLeft } from "@gravity-ui/icons";
import {
	Button,
	Card,
	Col,
	Container,
	Flex,
	Icon,
	Link,
	Row,
	Text,
	TextInput,
} from "@gravity-ui/uikit";
import { Field, Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { Captcha } from "src/components/Captcha";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { YandexAuth } from "../Auth/compoenents/Yandex";

import { SignInSchema, SignInValues } from "./schema";

export const SingInFormV2 = () => {
	const navigate = useNavigate();

	const { signin, updateInfo } = useAuthContext();

	const [signInError, setSignInError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const initialValues = useMemo<SignInValues>(
		() => ({
			email: "",
			password: "",
		}),
		[],
	);

	const onSubmit = useCallback(
		async (values: SignInValues) => {
			if (!token) {
				setSignInError(i18n.i18n("validation", "captcha_required"));
				return;
			}

			setSignInError(null);

			const res = await signin(values.email, values.password);

			if (res.error) {
				setSignInError(res.error);
				return;
			}

			if (res.authenticated) {
				await updateInfo();
				navigate("/");
			}
		},
		[signin, navigate, updateInfo, token],
	);

	const handleBack = useCallback(() => {
		navigate(-1);
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
							<Icon data={ArrowLeft} /> {i18n.i18n("signin", "back")}
						</Button>
						<Text variant="header-1">{i18n.i18n("signin", "title")}</Text>
						{signInError && (
							<Text variant="body-1" color="danger">
								{signInError}
							</Text>
						)}
						<Formik<SignInValues>
							initialValues={initialValues}
							onSubmit={onSubmit}
							validationSchema={toFormikValidationSchema(SignInSchema)}
						>
							{({ handleSubmit, isSubmitting, errors, touched }) => (
								<form onSubmit={handleSubmit} style={{ width: "100%" }}>
									<FormRow
										label={i18n.i18n("signin", "email")}
										direction="column"
									>
										<Field
											name="email"
											type="email"
											size="l"
											placeholder={i18n.i18n("signin", "email")}
											disabled={isSubmitting}
											error={touched.email && !!errors.email}
											errorMessage={errors.email}
											as={TextInput}
										/>
									</FormRow>
									<FormRow
										label={i18n.i18n("signin", "password")}
										direction="column"
									>
										<Field
											name="password"
											type="password"
											size="l"
											placeholder={i18n.i18n("signin", "password")}
											disabled={isSubmitting}
											error={touched.password && !!errors.password}
											errorMessage={errors.password}
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
												{i18n.i18n("signin", "access")}
											</Button>
										</Col>
										<Col s={12}>
											<YandexAuth />
										</Col>
									</Row>
								</form>
							)}
						</Formik>
						<RouterLink to="/signup">
							<Link href="/signup">
								{i18n.i18n("signin", "dont_have_an_account")}
							</Link>
						</RouterLink>
					</Flex>
				</Card>
			</Flex>
		</Container>
	);
};

export const SingInFormV2Name = "singn-in-form-v2";

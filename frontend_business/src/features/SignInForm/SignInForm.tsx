import { FormRow, PasswordInput } from "@gravity-ui/components";
import { Button, Card, Container, Flex, Text, TextInput } from "@gravity-ui/uikit";
import { Field, Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { SignInSchema, SignInValues } from "./schema";

export const SignInForm = () => {
    const navigate = useNavigate();

const {signin, updateInfo} = useAuthContext();

    const [signInError, setSignInError] = useState<string | null>(null);

    const initialValues: SignInValues = useMemo(() => ({
        email: "",
        password: "",
    }), []);

    const onSubmit = useCallback(async (values: SignInValues) => {
        setSignInError(null);
        const result = await signin(values.email, values.password);
        if (result.authenticated) {
            updateInfo();
            navigate("/");
            return;
        }

        if (result.error) {
            setSignInError(result.error);
        }
    }, [signin, updateInfo, navigate]);

    return <Card style={{width: "100%", maxWidth: "400px"}}>
        <Container style={{paddingTop: 24, paddingBottom: 24}}>
            <Flex width="100%" justifyContent="center">
                <Text variant='header-2'>{i18n.i18n("sign_in", "title")}</Text>
            </Flex>
            {signInError && (
							<Flex width="100%" justifyContent="center">
                                <Text variant="body-1" color="danger">
								{signInError}
							</Text>
                            </Flex>
						)}
						<Formik<SignInValues>
							initialValues={initialValues}
							onSubmit={onSubmit}
							validationSchema={toFormikValidationSchema(SignInSchema)}
						>
							{({ handleSubmit, isSubmitting, errors, touched }) => (
								<form onSubmit={handleSubmit} style={{ width: "100%" }}>
									<Flex direction="column">
										<FormRow label={i18n.i18n("sign_in", "email")} direction="column">
                                        <Field
												name="email"
												type="email"
												size="l"
												placeholder={i18n.i18n("sign_in", "email")}
												disabled={isSubmitting}
												error={touched.email && !!errors.email}
												errorMessage={errors.email}
												as={TextInput}
											/>
                                        </FormRow>
										<FormRow label={i18n.i18n("sign_in", "password")} direction="column">
                                            <Field
												name="password"
												type="password"
												size="l"
												placeholder={i18n.i18n("sign_in", "password")}
												disabled={isSubmitting}
												error={touched.password && !!errors.password}
												errorMessage={errors.password}
												as={PasswordInput}
											/>
										</FormRow>
										<Button
											type="submit"
											loading={isSubmitting}
											view="action"
											size="l"
										>
											{i18n.i18n("sign_in", "access_button")}
										</Button>
									</Flex>
								</form>
							)}
						</Formik>
        </Container>
    </Card>
}
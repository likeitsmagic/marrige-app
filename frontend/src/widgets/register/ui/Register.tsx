import { FC, useState } from "react";
import { useAuth } from "../../../app/auth/useAuth.ts";
import { Field, Formik } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Switch, Text, VStack } from "@chakra-ui/react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

interface IRegisterValues {
  email: string;
  password: string;
  business: boolean;
}

export const Register: FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [registerError, setRegisterError] = useState("")

  const initialValues: IRegisterValues = {
    email: "",
    password: "",
    business: false,
  };

  const onSubmit = async (data: IRegisterValues) => {
    setRegisterError("");

    const registerData = await register(data.email, data.password, data.business);

    if (registerData.registered) {
      navigate("/");
      return;
    }

    setRegisterError(JSON.stringify(registerData.data));
  };

  return (
    <Formik<IRegisterValues> initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">{t("email")}</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                autocomplite="email"
                variant="filled"
                disabled={isSubmitting}
                required
              />
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password">{t("password")}</FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                autocomplite="current-password"
                variant="filled"
                validate={(value: string) => {
                  let error;

                  if (value.length < 6) {
                    error = t("password_min_length_validation");
                  }

                  return error;
                }}
                disabled={isSubmitting}
                required
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <HStack>
                <Text>{t("is_business")}</Text>
                <Field
                  as={Switch}
                  id="business"
                  name="business"
                  disabled={isSubmitting}
                />
              </HStack>
            </FormControl>
            {registerError && <Text color="red">{registerError}</Text>}
            <Button type="submit" width="full" isLoading={isSubmitting}>
              {t("signup")}
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  )
};
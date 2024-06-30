import { FC, useState } from "react";
import { useAuth } from "../../../app/auth/useAuth.ts";
import { Field, Formik } from "formik";
import { Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

interface ILoginValues {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [loginError, setLoginError] = useState("")

  const initialValues: ILoginValues = {
    email: "",
    password: ""
  };

  const onSubmit = async (data: ILoginValues) => {
    setLoginError("");

    const loginData = await login(data.email, data.password);

    if (loginData.authenticated) {
      navigate("/protected");
      return;
    }

    setLoginError(JSON.stringify(loginData.data));
  };

  return (
    <Formik<ILoginValues> initialValues={initialValues} onSubmit={onSubmit}>
      {({handleSubmit, isSubmitting}) => (
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
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("password")}</FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                autocomplite="current-password"
                variant="filled"
                disabled={isSubmitting}
              />
            </FormControl>
            {loginError && <Text color="red">{loginError}</Text>}
            <Button type="submit" colorScheme="purple" width="full" isLoading={isSubmitting}>
              {t("login")}
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  )
};
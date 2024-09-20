import { Autocomplete, AutocompleteItem, Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import { Field, Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { ImageContainer } from "src/components/ImageContainer";
import { useAuthContext } from "src/core/auth/useAuth";
import { debounce } from 'lodash';

interface IRegion {
    name: string;
    pos: number[];
    provinceName: string;
}

interface ISignUpValues {
    email: string;
    password: string;
    repeatPassword: string;
    regionQuery: string;
}

export const SignUpForm = () => {
    const { t } = useTranslation("translation", { keyPrefix: "SignUpForm" });

    const [regions, setRegions] = useState<IRegion[]>([]);

    const navigate = useNavigate();
    const { signup, updateInfo } = useAuthContext();


    const initialValues: ISignUpValues = {
        email: "",
        password: "",
        repeatPassword: "",
        regionQuery: ""
    };

    const onSubmit = async (data: ISignUpValues) => {

    };

    const handleRegionQuery = async (query: string) => {
        const response = await fetch(`https://functions.yandexcloud.net/d4e66i32i0s9783irqrp?query=${query.split(' ').join('+')}`);
        if (response.ok) {
            const data = await response.json();
            setRegions(data);
        }
    };

    const debouncedHandleRegionQuery = debounce(handleRegionQuery, 1000);

    return (
        <ImageContainer>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Card className="max-w-full w-4/12 h-auto">
                    <CardBody className="p-10">
                        <Formik<ISignUpValues> initialValues={initialValues} onSubmit={onSubmit}>
                            {({ handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <h2 className="text-center text-xl font-semibold">{t('register_your_account')}</h2>
                                    <p className="text-center text-sm text-gray-500">
                                        {t('already_have_an_account')}{" "}
                                        <Link size="sm" as={RouterLink} to="/signin">
                                            {t('sign_in')}
                                        </Link>
                                    </p>
                                    <Field variant="underlined" name="email" label={t('your_email')} type="email" disabled={isSubmitting} as={Input} />
                                    <Autocomplete variant="underlined" name="regionQuery" placeholder={t('region_query_placeholder')} label={t('region_query')} type="text" disabled={isSubmitting} items={regions} onInputChange={debouncedHandleRegionQuery} listboxProps={{
                                        emptyContent: t('no_regions_found')
                                    }}>
                                        {regions.map((region, index) => <AutocompleteItem tabIndex={index} key={index} textValue={region.name}>
                                            <div>
                                                <p>{region.name}</p>
                                                {region.provinceName !== "N/A" && <p className="text-sm text-gray-500">{region.provinceName}</p>}
                                            </div>
                                        </AutocompleteItem>)}
                                    </Autocomplete>
                                    <Field variant="underlined" name="password" label={t('password')} type="password" disabled={isSubmitting} as={Input} />
                                    <Field variant="underlined" name="repeatPassword" label={t('repeat_password')} type="password" disabled={isSubmitting} as={Input} />
                                    <Button type="submit" fullWidth color="primary" className="mt-4" isLoading={isSubmitting}>
                                        {t('register')}
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </div>
        </ImageContainer>
    );
}
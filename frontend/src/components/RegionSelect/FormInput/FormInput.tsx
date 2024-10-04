import { FormRow, FormRowProps } from "@gravity-ui/components";
import { Flex, Text } from "@gravity-ui/uikit";
import { FC } from "react";

interface FormInputProps extends FormRowProps {
	inEdit: boolean;
    value: string;
}

export const FormInput: FC<FormInputProps> = (props) => {
    const { inEdit, ...rest } = props;

    if (!inEdit) {
        return <Flex direction={rest.direction} gap={2}>
            <Text variant="body-1" color="primary">{props.label}</Text>
            <Text variant="body-1" color="secondary">{props.value}</Text>
        </Flex>;
    }

    return <FormRow {...rest} />;
};

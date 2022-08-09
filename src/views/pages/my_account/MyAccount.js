import React from 'react'
import { Formik, Form } from 'formik';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { useTranslation } from 'utility/language';
import { initialValues, validationSchema } from './utils'
import { useAuth } from 'redux/hooks/auth';
import AccountForm from './AccountForm';
import { LoadingButton } from 'components/input';
import { useUpdateMyAccount } from 'api/accounts';
export default function MyAccount() {
    const t = useTranslation();
    const { user, updateUserInfo } = useAuth();
    const mutation = useUpdateMyAccount();
    const [values, setValues] = React.useState({});
    const handleSubmit = (values) => {

        mutation.mutate(values)
        const valuesToUpdate = {
            full_name: values.full_name,
            email: values.email,
            phone: values.phone
        }
        const newuserData = { ...user, ...valuesToUpdate }
        setValues(newuserData)
    }
    React.useEffect(() => {
        if (mutation.isSuccess) {
            updateUserInfo(values)
        }
    }, [mutation.isSuccess, updateUserInfo, values])
    return (
        <Card >
            <CardHeader>
                {t("my_account")}
            </CardHeader>


            <Formik initialValues={initialValues(user)} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {
                    (formik) => <Form>
                        <CardBody>
                            <AccountForm />
                        </CardBody>
                        <CardFooter>
                            <LoadingButton
                                type="submit"
                                color="primary"
                                isLoading={mutation.isLoading}

                            >
                                {t("save")}
                            </LoadingButton>
                        </CardFooter>
                    </Form>
                }
            </Formik>



        </Card>
    )
}
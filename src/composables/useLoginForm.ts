import { useForm } from 'vee-validate'
import { loginSchema } from '@/schemas/auth'
import { useLogin } from './auth/useLogin'

export function useLoginForm() {
    const form = useForm({
        validationSchema: loginSchema,
        initialValues: {
            email: '',
            password: '',
        },
    })

    const { login, loading } = useLogin()

    const onSubmit = form.handleSubmit(async (values) => {
        await login(values)
    })

    return { form, onSubmit, loading }
}
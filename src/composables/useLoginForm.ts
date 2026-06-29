import { useForm } from 'vee-validate'
import { loginSchema } from '@/schemas/auth'
import { useAuth } from '@/composables/useAuth'

export function useLoginForm() {
    const form = useForm({
        validationSchema: loginSchema,
        initialValues: {
            email: '',
            password: '',
        },
    })

    const { login, loading, error } = useAuth()

    const onSubmit = form.handleSubmit(async (values) => {
        await login(values)
    })

    return { form, onSubmit, loading, error }
}
import { useForm } from 'vee-validate'
import { registerSchema } from '@/schemas/auth'
import { useAuth } from '@/composables/useAuth'

export function useRegisterForm() {
    const form = useForm({
        validationSchema: registerSchema,
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
        },
    })

    const { register, loading, error } = useAuth()

    const onSubmit = form.handleSubmit(async (values) => {
        await register(values)
    })

    return { form, onSubmit, loading, error }
}
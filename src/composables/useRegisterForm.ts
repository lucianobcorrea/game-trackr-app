import { useForm } from 'vee-validate'
import { registerSchema } from '@/schemas/auth'
import { useRegister } from './auth/useRegister'

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

    const { register, loading } = useRegister()

    const onSubmit = form.handleSubmit(async (values) => {
        await register(values)
    })

    return { form, onSubmit, loading }
}
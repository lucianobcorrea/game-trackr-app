<script setup lang="ts">
import Link from '@/components/Link.vue';
import { RouterLink } from 'vue-router';
import Footer from '@/components/layout/Footer.vue';
import { FormField } from '@/components/ui/form';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import { User, Mail, Lock } from '@lucide/vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Label from '@/components/ui/label/Label.vue';
import { cn } from '@/lib/utils';

import Logo from '@/assets/logo.svg';
import GoogleLogo from '@/assets/google.svg';
import { useAuth } from '@/composables/useAuth';

const formSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
    terms: z.boolean().refine((value) => value, {
        message: "You must accept the terms and conditions",
        path: ["terms"],
    })
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
}));

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    },
})

const { register, loading, error } = useAuth();

const onSubmit = form.handleSubmit(async (values) => {
    await register(values)
})
</script>

<template>
    <header class="py-10 absolute top-0 w-full">
        <div class="mx-auto px-4 md:px-8 lg:px-12">
            <div class="flex justify-between flex-row items-center">
                <div>
                    <RouterLink to="/"><img alt="GameTrackr logo" class="w-full max-w-80" :src=Logo /></RouterLink>
                </div>
                <div class="flex gap-10">
                    <Link to="/auth/login" class="text-lg">Community</Link>
                    <Link to="/auth/login" class="text-lg">Explore</Link>
                    <Link to="/auth/login" class="text-lg">Login</Link>
                </div>
            </div>
        </div>
    </header>
    <main class="grid grid-cols-2">
        <div
            class="w-full h-full bg-linear-to-r/decreasing from-black via-dark-blue/40 to-dark-blue flex flex-col justify-center p-16">
            <h1 class="text-primary-green text-6xl font-bold">Synchronize your gaming journey.</h1>
            <p class="text-xl text-olive-light">Track stats, achievements, and connect with gamers worldwide in a
                high-performance interface.</p>
        </div>

        <div class="p-16">
            <div class="bg-graphite rounded-2xl p-16 border border-light-graphite flex flex-col gap-8">
                <div class="mb-8">
                    <h2 class="text-3xl text-white font-bold">Create Your Account</h2>
                    <p class="text-lg text-olive-light">Join the GameTrackr Community and start synchronizing your
                        gaming
                        journey today.</p>
                </div>

                <form @submit="onSubmit" class="flex flex-col gap-5">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <AppInput label="Name" placeholder="Ex.: Player One" v-bind="componentField" :icon="User" />
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                            <AppInput label="E-mail" placeholder="Ex.: email@example.com" v-bind="componentField"
                                :icon="Mail" />
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <AppInput label="Password" placeholder="**********" v-bind="componentField" type="password"
                                :icon="Lock" />
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password_confirmation">
                        <FormItem>
                            <AppInput label="Confirm password" placeholder="**********" v-bind="componentField"
                                type="password" :icon="Lock" />
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="terms">
                        <FormItem>
                            <div class="flex items-center gap-3">
                                <Checkbox id="terms"
                                    class="w-5 h-5 bg-light-graphite border-olive-light data-[state=checked]:bg-primary-green data-[state=checked]:text-black"
                                    v-bind="componentField" />
                                <Label for="terms" class="text-base text-olive-light">I read and accept the
                                    <Link to="/auth/login"
                                        :class="cn('text-base text-secondary-blue hover:text-secondary-blue')">Terms of
                                        use</Link> and
                                    the <Link to="/auth/login"
                                        :class="cn('text-base text-secondary-blue hover:text-secondary-blue')">Privacy
                                        policy
                                    </Link>
                                </Label>
                            </div>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <AppButton type="submit" variant="glow">Create account</AppButton>
                </form>

                <div class="flex items-center justify-center gap-3 text-olive-light py-3">
                    <hr class="border-olive-light/30 flex-grow">
                    <p class="px-5 text-sm uppercase font-extrabold">Or create an account with</p>
                    <hr class="border-olive-light/30 flex-grow">
                </div>

                <div class="flex justify-center">
                    <AppButton type="submit"
                        class="p-8 flex justify-center items-center gap-5 bg-dark-graphite hover:bg-dark-graphite border border-light-graphite text-olive-light hover:bg-light-graphite">
                        <img :src=GoogleLogo alt="Google logo" class="max-w-10" />Sign in with
                        Google
                    </AppButton>
                </div>
            </div>
        </div>
    </main>
    <Footer />
</template>

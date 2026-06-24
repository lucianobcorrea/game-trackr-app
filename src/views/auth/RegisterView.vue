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
import { User, Mail, Lock, Zap, Users, JoystickIcon } from '@lucide/vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Label from '@/components/ui/label/Label.vue';
import { cn } from '@/lib/utils';

import Logo from '@/assets/logo.svg';
import GoogleLogo from '@/assets/google.svg';
import { useAuth } from '@/composables/useAuth';
import { toast } from 'vue-sonner';

const formSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
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
    <div class="flex flex-col min-h-screen">
        <header class="py-10 absolute top-0 w-full z-10">
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
        <main class="grid grid-cols-2 flex-1 h-full">
            <div
                class="w-full h-full bg-linear-to-r/decreasing from-black via-dark-blue/40 to-dark-blue flex flex-col justify-center p-16">
                <div
                    class="flex gap-3 items-center bg-dark-green border border-primary-green rounded-full w-fit px-8 py-2 text-primary-green">
                    <Zap />
                    <p class="uppercase text-lg font-bold">Join the elite</p>
                </div>

                <h1 class="text-primary-green text-6xl font-bold py-7">Synchronize your gaming journey.</h1>
                <p class="text-xl text-olive-light">Track stats, achievements, and connect with gamers worldwide in a
                    high-performance interface.</p>

                <div class="flex gap-5 pt-18">
                    <div
                        class="w-80 py-5 px-8 rounded-xl flex justify-center items-center gap-5 bg-dark-graphite border border-light-graphite text-olive-light bg-graphite border border-light-graphite">
                        <div class="flex items-center gap-5">
                            <div class="bg-secondary-blue/25 rounded-full p-4 text-secondary-blue">
                                <Users />
                            </div>
                            <div class="flex flex-col">
                                <p class="text-white font-bold text-xl">+500</p>
                                <p class="text-olive-light text-lg">Gamers</p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-80 py-5 px-8 rounded-xl flex justify-center items-center gap-5 bg-dark-graphite border border-light-graphite text-olive-light bg-graphite border border-light-graphite">
                        <div class="flex items-center gap-5">
                            <div class="bg-primary-green/25 rounded-full p-4 text-primary-green">
                                <JoystickIcon />
                            </div>
                            <div class="flex flex-col">
                                <p class="text-white font-bold text-xl">12.4k</p>
                                <p class="text-olive-light text-lg">Games tracked</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-16">
                <div
                    class="bg-graphite rounded-2xl rounded-l-none p-16 border border-light-graphite flex flex-col gap-8 relative">
                    <div
                        class="absolute inset-y-0 left-0 w-1 bg-primary-green rounded-l-2xl shadow-[0_0_15px_rgba(181,255,58,0.4)]">
                    </div>
                    <div>
                        <h2 class="text-3xl text-white font-bold pb-4">Create Your Account</h2>
                        <p class="text-lg text-olive-light pb-4">Join the GameTrackr Community and start synchronizing
                            your
                            gaming
                            journey today.</p>
                    </div>

                    <form @submit="onSubmit" class="flex flex-col gap-5">
                        <FormField v-slot="{ componentField }" name="name">
                            <FormItem>
                                <AppInput label="Name" placeholder="Ex.: Player One" v-bind="componentField"
                                    :icon="User" />
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
                                <AppInput label="Password" placeholder="**********" v-bind="componentField"
                                    type="password" :icon="Lock" />
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
                                            :class="cn('text-base text-secondary-blue hover:text-secondary-blue')">Terms
                                            of
                                            use</Link> and
                                        the <Link to="/auth/login"
                                            :class="cn('text-base text-secondary-blue hover:text-secondary-blue')">
                                            Privacy
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
                        <a href="http://localhost:8000/api/auth/google/redirect"
                            class="py-5 px-8 rounded-xl flex justify-center items-center gap-5 bg-dark-graphite hover:bg-dark-graphite border border-light-graphite text-olive-light hover:bg-light-graphite transition ease-in-out">
                            <img :src=GoogleLogo alt="Google logo" class="max-w-10" />Sign in with
                            Google
                        </a>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

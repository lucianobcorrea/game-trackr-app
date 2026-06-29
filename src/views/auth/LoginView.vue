<script setup lang="ts">
import Link from '@/components/Link.vue';
import Footer from '@/components/layout/Footer.vue';
import { FormField } from '@/components/ui/form';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';

import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import { Mail, Lock, Zap, Users, JoystickIcon } from '@lucide/vue';
import { cn } from '@/lib/utils';

import GoogleLogo from '@/assets/google.svg';
import { useLoginForm } from '@/composables/useLoginForm';
import AuthHeader from '@/components/layout/AuthHeader.vue';

const { onSubmit, loading, error } = useLoginForm()
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <AuthHeader />
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

            <div class="p-16 flex justify-center items-center">
                <div
                    class="bg-graphite rounded-2xl rounded-l-none p-16 border border-light-graphite flex flex-col gap-8 relative w-full">
                    <div
                        class="absolute inset-y-0 left-0 w-1 bg-primary-green rounded-l-2xl shadow-[0_0_15px_rgba(181,255,58,0.4)]">
                    </div>
                    <div>
                        <h2 class="text-3xl text-white font-bold pb-4">Welcome back</h2>
                        <p class="text-lg text-olive-light pb-4">Sign in to your account and continue your gaming
                            journey.</p>
                    </div>

                    <form @submit="onSubmit" class="flex flex-col gap-5">
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

                        <div class="flex justify-end">
                            <Link to="/auth/forgot-password"
                                :class="cn('text-base text-secondary-blue hover:text-secondary-blue')">Forgot
                                password?</Link>

                        </div>

                        <AppButton type="submit" variant="glow">Sign In</AppButton>
                    </form>

                    <div class="flex items-center justify-center gap-3 text-olive-light py-3">
                        <hr class="border-olive-light/30 flex-grow">
                        <p class="px-5 text-sm uppercase font-extrabold">Or sign in with</p>
                        <hr class="border-olive-light/30 flex-grow">
                    </div>

                    <div class="flex justify-center">
                        <a href="http://localhost:8000/api/auth/google/redirect"
                            class="py-5 px-8 rounded-xl flex justify-center items-center gap-5 bg-dark-graphite hover:bg-dark-graphite border border-light-graphite text-olive-light hover:bg-light-graphite transition ease-in-out">
                            <img :src=GoogleLogo alt="Google logo" class="max-w-10" />Sign in with
                            Google
                        </a>
                    </div>

                    <div class="flex justify-center items-center">
                        <p class="text-base text-olive-light">Don't have an account? <Link to="/auth/register"
                                :class="cn('text-base text-secondary-blue hover:text-secondary-blue')">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

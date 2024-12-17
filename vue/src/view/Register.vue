<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit="register">
      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Full Name</label
          >
        </div>
        <div class="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autocomplete="name"
            required=""
            placeholder="Please enter full name"
            v-model="user.name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email Address</label
          >
        </div>
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="Please enter email"
            required=""
            v-model="user.email"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p v-if="errors.email" class="text-red-600 text-sm">
            {{ errors.email[0] }}
          </p>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            placeholder="Please write password"
            v-model="user.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password Confirmation</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autocomplete="password_confirmation"
            required=""
            placeholder="Please write password_confirmation"
            v-model="user.password_confirmation"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign Up
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Already have a member?
      {{ " " }}
      <router-link
        :to="{ name: 'Login' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >Sign In</router-link
      >
    </p>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import store from "../store";

const router = useRouter();
const user = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};
const errors = ref({});

function register(env) {
  env.preventDefault();
  errors.value = {};
  store
    .dispatch("register", user)
    .then((res) => {
      router.push({ name: "Dashboard" });
    })
    .catch((error) => {
      console.log(error.response.data.errors);
      if (error.response && error.response.status === 422) {
        // Check if there's a general error message
        if (error.response.data.errors) {
          errors.value.general = error.response.data.errors;
        }
        // You can still handle field-specific errors if needed
        if (error.response.data.errors) {
          errors.value = error.response.data.errors;
        }
      }
    });
}
</script>

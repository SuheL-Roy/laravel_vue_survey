<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit="login">
      <div>
        <div class="flex items-center justify-between">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Email Address
          </label>
        </div>
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            v-model="user.email"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <!-- Display email validation error -->
        
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div class="text-sm">
            <a
              href="#"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            v-model="user.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <!-- Display password validation error -->
          <p v-if="errors.general" class="text-red-600 text-sm">
            {{ errors.general }}
          </p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member? {{ " " }}
      <router-link
        :to="{ name: 'Register' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Start a free Registration
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import store from "../store";

const router = useRouter();
const user = ref({
  email: "",
  password: "",
});
const errors = ref({});

function login(env) {
  env.preventDefault();
  errors.value = {}; // Reset errors before new request

  store
    .dispatch("login", user.value)
    .then(() => {
      router.push({ name: "Dashboard" });
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        // Check if there's a general error message
        if (error.response.data.error) {
          errors.value.general = error.response.data.error;

        }
        // You can still handle field-specific errors if needed
        if (error.response.data.errors) {
          errors.value = error.response.data.errors;
        }
      }
    });
}
</script>

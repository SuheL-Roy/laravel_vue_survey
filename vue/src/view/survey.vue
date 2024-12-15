<template>
  <!-- Pass the title prop correctly -->
  <PageComponents>
    <!-- Slot content goes here -->
    <template v-slot:header>
      <div class="flex justify-between item-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="flex items-center py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
          aria-label="Add New Survey"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-5 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <span>Add New Survey</span>
        </router-link>
      </div>
    </template>

    <div v-if="Surveys.loading" class="flex justify-center">Loading...</div>
    <div v-else>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      <!-- <div
        v-for="survey in Surveys"
        :key="survey.id"
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
      >
        <img :src="survey.image_url" alt="" class="w-full h-48 object-cover" />
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>
        <div class="flex justify-between items-center mt-3">
          <router-link
            :to="{ name: 'SurveyView', params: { id: survey.id } }"
            class="flex items-center py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
            aria-label="Add New Survey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </router-link>
          <button
            v-if="survey.id"
            type="button"
            @click="deleteSurvey(survey.id)"
            class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-3 focus:ring-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div> -->
      <SurveyListItem
        v-for="survey in Surveys.data"
        :key="survey.id"
        :survey="survey"
        class="opacity-0 animate-fade-in-down"
        :style="{ animationDelay: `${ind * 0.1}s` }"
        @delete="deleteSurvey(survey)"
      />
    </div>
    <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="(link, i) of Surveys.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === Surveys.links.length - 1 ? 'rounded-r-md' : '',
            ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>
    </div>
  </PageComponents>
</template>

<script setup>
import PageComponents from "../components/PageComponents.vue";
import SurveyListItem from "../view/SurveyListItem.vue";
import { computed } from "vue";
import store from "../store";
import { useRouter } from "vue-router";
import SurveyListItemVue from "./SurveyListItem.vue";
const router = useRouter();
const Surveys = computed(() => store.state.surveys);
function deleteSurvey(survey) {
  if (
    confirm(
      `Are You sure Want to delete this survey? operation can,t be undone`
    )
  ) {
    store.dispatch("deleteSurvey", survey.id).then(({ data }) => {
      store.dispatch("getSurveys");
    });
  }
}
store.dispatch("getSurveys");

function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  store.dispatch("getSurveys", { url: link.url });
}
</script>

<style>
/* Add styles if necessary */
</style>

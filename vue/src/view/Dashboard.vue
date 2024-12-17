<template>
    <!-- Pass the title prop correctly -->
    <PageComponents title="Dashboard">
      <!-- Slot content goes here -->
      <div v-if="data.latestSurvey">
          <img
            :src="data.latestSurvey.image_url"
            class="w-[240px] mx-auto"
            alt=""
          />
          <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
          <div class="flex justify-between text-sm mb-1">
            <div>Create Date:</div>
            <div>{{ data.latestSurvey.created_at }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>Expire Date:</div>
            <div>{{ data.latestSurvey.expire_date }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>Status:</div>
            <div>{{ data.latestSurvey.status ? "Active" : "Draft" }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>Questions:</div>
            <div>{{ data.latestSurvey.questions }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Answers:</div>
            <div>{{ data.latestSurvey.answers }}</div>
          </div>
          <!-- <div class="flex justify-between">
            <TButton
              :to="{ name: 'SurveyView', params: { id: data.latestSurvey.id } }"
              link
            >
              <PencilIcon class="w-5 h-5 mr-2" />
              Edit Survey
            </TButton>

            <TButton link>
              <EyeIcon class="w-5 h-5 mr-2" />
              View Answers
            </TButton>
          </div> -->
        </div>
        <div v-else class="text-gray-600 text-center py-16">
          Your don't have surveys yet
        </div>

       
        <h1>Total Surveys</h1>
        <div
          class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
          {{ data.totalSurveys }}
        </div>
        <h1>Total Answers</h1> 
        <div
          class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
        >
          {{ data.totalAnswers }}
        </div>
    </PageComponents>
  </template>
  
  <script setup>
  import PageComponents from '../components/PageComponents.vue';
  
  import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch("getDashboardData");
  </script>
  
  <style>
  /* Add styles if necessary */
  </style>
  
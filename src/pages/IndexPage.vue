<template>
  <q-page class="column page-wrapper">
    <div class="row flex-1 overflow-hidden" style="flex-wrap: nowrap">
      <div class="col-6 q-pa-sm yaki-card column nowrap">
        <div class="text-h6">Пользователи:</div>
        <UserTable :data="users" class="overflow-auto flex-1" />
      </div>
      <div class="col-6 q-pa-sm yaki-card column nowrap">
        <div class="text-h6">Предложение пользователям:</div>
        <DishTable :data="dishes" class="overflow-auto flex-1" />
      </div>
    </div>
    <div class="row flex-1 overflow-auto">
      <div class="col-12 q-pa-sm">
        <div class="text-h6">Похожие блюда:</div>
        <DishTable :data="dishes" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import UserTable from "components/UserTable.vue";
import { api } from "src/boot/axios";
import DishTable from "src/components/DishTable.vue";
import { ref } from "vue";
defineOptions({
  name: "IndexPage",
});

const dishes = ref([
  {
    id: 1,
    label: "Сяки-маки",
    dg_id: 1,
  },
  {
    id: 1,
    label: "Сяки-маки",
    dg_id: 1,
  },
  {
    id: 1,
    label: "Сяки-маки",
    dg_id: 1,
  },
  {
    id: 1,
    label: "Сяки-маки",
    dg_id: 1,
  },
  {
    id: 1,
    label: "Сяки-маки",
    dg_id: 1,
  },
  {
    id: 1,
    label: "Сяки-маки",
    dg_id: 1,
  },
]);

const users = ref([
  {
    id: 1,
    phone: "89155020188",
    dg_id: 1,
  },
  {
    id: 2,
    phone: "89155020189",
    dg_id: 2,
  },
  {
    id: 3,
    phone: "89155020190",
    dg_id: 3,
  },
  {
    id: 4,
    phone: "89155020191",
    dg_id: 4,
  },
  {
    id: 5,
    phone: "89155020192",
    dg_id: 5,
  },
  {
    id: 6,
    phone: "89155020193",
    dg_id: 6,
  },
  {
    id: 7,
    phone: "89155020194",
    dg_id: 7,
  },
  {
    id: 8,
    phone: "89155020195",
    dg_id: 8,
  },
  {
    id: 9,
    phone: "89155020196",
    dg_id: 9,
  },
]);

async function getUsers() {
  api.get("users/").then(({ data }) => {
    users.value = data;
  });
}
</script>

<style scoped>
.flex-1 {
  flex: 1;
}
.page-wrapper {
  max-height: calc(100vh - 100px);
  overflow: hidden;
  flex-wrap: nowrap;
}

.yaki-card {
  max-height: 100%;
  overflow: hidden;
}
</style>

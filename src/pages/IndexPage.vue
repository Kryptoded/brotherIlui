<template>
  <q-page class="column page-wrapper">
    <div class="row flex-1 overflow-hidden" style="flex-wrap: nowrap">
      <div class="col-6 q-pa-sm yaki-card column nowrap">
        <div class="text-h6">Пользователи:</div>
        <q-input :debounce="300" v-model="userSearch" filled label="Поиск пользователей по номеру телефона">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <UserTable
          :data="users"
          :loading="usersApi.loading.value"
          @onUserClick="onUserClick"
          @load="getUsers"
          :activeUser="activeUser"
          style="max-height: 500px;"
          class="overflow-auto flex-1"
          ref="userTable"
        />
      </div>
      <div class="col-6 q-pa-sm yaki-card column nowrap">
        <div class="text-h6">Рекомендации пользователю:</div>
        <DishTable
          score
          :data="bestDishesApi.data.value"
          :loading="bestDishesApi.loading.value"
          class="overflow-auto flex-1"
        />
      </div>
    </div>
    <div class="row flex-1 overflow-hidden" style="flex-wrap: nowrap">
      <div class="col-6 q-pa-sm yaki-card column nowrap">
        <div class="text-h6">Все блюда:</div>
        <q-input :debounce="300" v-model="dishSearch" filled  label="Поиск блюд">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <DishTable
          :data="dishes"
          ref="dishesTable"
          style="max-height: 500px;"
          :activeDish="activeDish"
          :loading="dishesApi.loading.value"
          class="overflow-auto flex-1"
          @onDishClick="onDishClick"
          @load="getDish"
        />
      </div>
      <div class="col-6 q-pa-sm yaki-card column nowrap">
        <div class="text-h6">Похожие блюда:</div>
        <DishTable
          :loading="similarDishApi.loading.value"
          :data="similarDishApi.data.value"
          class="overflow-auto flex-1"
        />
      </div>
    </div>
    <q-btn
      @click="showDialog = true"
      rounded
      icon="settings"
      color="primary"
      class="fixed"
      style="top: 60px; right: 10px"
    />
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <q-checkbox v-model="settings.filter_already_liked_items" label="не показывать в рекомендациях те блюда которые были заказаны"/>
        </q-card-section>
        <q-card-section>
          <q-input type="number" v-model="settings.count" label="количество"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import UserTable from "components/UserTable.vue";
import DishTable from "src/components/DishTable.vue";
import { ref, watch, reactive } from "vue";
import { useList } from "src/composables/useList";
import { usePOSTList } from "src/composables/usePOSTList";

defineOptions({
  name: "IndexPage",
});

const usersApi = useList()
const bestDishesApi = usePOSTList()
const dishesApi = useList()
const similarDishApi = usePOSTList()
const userSearch = ref('')
const dishSearch = ref('')
const activeUser = ref(null)
const activeDish = ref(null)
const showDialog = ref(false)
const users = ref([])
const dishes = ref([])
let usersOffset = 0
let dishesOffset = 0

const userTable = ref(null)
const dishesTable = ref(null)

const settings = reactive({
  filter_already_liked_items: false,
  count: 10
})
function onUserClick(user) {
  activeUser.value = user
  bestDishesApi.getData('recommended', {user_dg_id: user.dg_id, ...settings})
}

function onDishClick(dish) {
  activeDish.value = dish
  similarDishApi.getData('similar', {dish_dg_id: dish.dg_id, ...settings})
}
async function getUsers(cb = null) {
  usersOffset += 10
  await usersApi.getData('users', {search: userSearch.value, offset: usersOffset})
  .then((newUsers) => {
    if (newUsers.length) {
      users.value.push(...newUsers)
    } else {
      userTable.value.stop()
    }
  })
  .catch(() => {
    userTable.value.stop()
  });
  if (cb) {
    cb()
  }

}
async function getDish(cb=null) {
  dishesOffset += 10
  await dishesApi.getData('dishes',{search: dishSearch.value, offset:dishesOffset}).then((newDishes) => {
    if (newDishes.length) {
      dishes.value.push(...newDishes)
    } else {
      dishesTable.value.stop()
      return
    }
  })
  .catch(() => {
    dishesTable.value.stop()
  });
  if (cb) {
    cb()
  }

}

function findDish() {
  dishesOffset = 10
  dishesTable.value.start()
  return dishesApi.getData('dishes',{search: dishSearch.value, offset:dishesOffset})
    .then((newDishes) => {
        dishes.value = newDishes
    })
}

function findUser() {
  usersOffset = 10
  userTable.value.start()
  return usersApi.getData('users',{search: userSearch.value, offset:usersOffset})
    .then((newUsers) => {
        users.value = newUsers
    })
}

watch(userSearch, ()=>findUser())
watch(dishSearch, ()=>findDish())
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

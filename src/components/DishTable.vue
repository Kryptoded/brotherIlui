<template>
  <q-card>
    <q-infinite-scroll @load="onLoad" ref="infinityScroll">
      <q-markup-table>
        <thead>
          <q-th>Наименование</q-th>
          <q-th>DG_ID</q-th>
          <q-th v-if="props.score">Оценка</q-th>
          <q-th v-if="props.score">Уже заказанные</q-th>
        </thead>
        <tbody>
          <tr
            v-for="dish in props.data"
            :key="dish.id"
            style="cursor: pointer"
            @click="onDishClick(dish)"
            :class="{'active': props.activeDish?.dg_id === dish.dg_id}"
          >
            <q-td class="text-center">
              {{ dish.label }}
            </q-td>
            <q-td class="text-center">
              {{ dish.dg_id }}
            </q-td>
            <q-td v-if="props.score" class="text-center">
              {{ dish.score }}
            </q-td>
            <q-td v-if="props.score" class="text-center">
              <q-checkbox v-model="dish.already_linked" disable/>
            </q-td>
          </tr>
        </tbody>
      </q-markup-table>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-card>
</template>

<script setup>
import { ref } from "vue"
const emits = defineEmits(["onDishClick", "load"]);
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false
  },
  activeDish: {
    type: Object,
    default: null
  },
  score: {
    type: Boolean,
    default: false
  }
});

function onDishClick(dish) {
  emits("onDishClick", dish);
}

function onLoad(index, done) {
  emits('load', done)
}

const infinityScroll = ref(null)

function stop() {
  infinityScroll.value.stop()
}

defineExpose({
  stop
})

</script>

<style scoped>

.active {
  background-color: var(--q-primary) !important;
  color: white !important;
}
</style>

<template>
  <q-card>
    <q-inner-loading :showing="props.loading" v-if="props.loading" />
    <q-markup-table v-else>
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
  </q-card>
</template>

<script setup>
const emits = defineEmits(["onDishClick"]);
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
</script>

<style scoped>

.active {
  background-color: var(--q-primary) !important;
  color: white !important;
}
</style>

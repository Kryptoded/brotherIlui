<template>
  <q-card>
    <q-markup-table>
      <thead>
        <q-th>ID</q-th>
        <q-th>Наименование</q-th>
        <q-th>DG_ID</q-th>
      </thead>
      <tbody>
        <tr
          v-for="dish in props.data"
          :key="dish.id"
          style="cursor: pointer"
          @click="onDishClick(dish)"
        >
          <q-td class="text-center">
            {{ dish.id }}
          </q-td>
          <q-td class="text-center">
            {{ dish.label }}
          </q-td>
          <q-td class="text-center">
            {{ dish.dg_id }}
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
});

function onDishClick(dish) {
  emits("onDishClick", dish);
}
</script>

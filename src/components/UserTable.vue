<template>
  <q-card>
    <q-markup-table>
      <thead>
        <q-th>ID</q-th>
        <q-th>Номер телефона</q-th>
        <q-th>DG_ID</q-th>
      </thead>
      <tbody>
        <tr
          v-for="user in props.data"
          :key="user.id"
          style="cursor: pointer"
          @click="onUserClick(user)"
        >
          <q-td class="text-center">
            {{ user.id }}
          </q-td>
          <q-td class="text-center">
            {{ user.phone }}
          </q-td>
          <q-td class="text-center">
            {{ user.dg_id }}
          </q-td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-card>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["onUserClick"]);

function onUserClick(user) {
  emits("onUserClick", user);
}
</script>

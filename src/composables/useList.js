import { ref } from "vue"
import { api } from "src/boot/axios"

export function useList() {
  const loading = ref(false)

  const data = ref([])

  function getData(url, params={}) {
    loading.value = true
    return api.get(url, {params: params})
      .then((response) => {
        data.value = response.data.results
        return response.data.results
      })
      .finally(() => {
        loading.value = false
      })
  }
  return {
    loading,
    data,
    getData
  }
}

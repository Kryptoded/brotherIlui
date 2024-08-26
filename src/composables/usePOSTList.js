import { ref } from "vue"
import { api } from "src/boot/axios"

export function usePOSTList() {
  const loading = ref(false)

  const data = ref([])

  function getData(url, params={}) {
    loading.value = true
    return api.post(url, params)
      .then((response) => {
        data.value = response.data.results
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

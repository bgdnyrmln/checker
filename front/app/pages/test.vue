<template>

    {{ role }}

</template>

<script>
import axios from 'axios';
import { ref } from 'vue'

const role = ref('');

const fetchRole = async () => {
  try {
    role.value = await axios.get('http://localhost:8000/api/user/role/2', {
        withCredentials: true,
        headers: {
            Accept: 'application/json'
        }
    }).then(res => res.data)
  } catch {
    role.value = null
  }
}

onMounted(
    fetchRole()
)


</script>
<template>
    <div class="loading-settings" v-show="getLoading">
        <i class="icon16 loading"></i>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'loading',
    computed: mapGetters(['getLoading']),
}
</script>
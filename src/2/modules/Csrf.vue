<template>
    <input type="hidden" name="_csrf" v-model="csrf">
</template>

<script>
export default {
    name: 'csrf',
    data() {
        return {
            csrf: ''
        }
    },
    methods: {
        getCookie(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ))

            return matches ? decodeURIComponent(matches[1]) : undefined
        },
        getCsrf() {
            return this.getCookie('_csrf')
        }
    },
    mounted() {
        this.csrf = this.getCsrf()
    }
}
</script>
<i18n src="../locales/common.json"></i18n>

<template>
    <div class="card__info">
        <div class="card__tab-description">
            <p>{{ $t('Check the display conditions, if everything is correct, activate it.') }}</p>
        </div>

        <div class="card__fields-group">
            <h4>{{ $t('Will be shown if conditions are met') }}</h4>
            <div class="card__block">
                <ol class="conditions__list">
                    <li class="conditions__item" v-if="conditions['count_show_session'] && conditions['count_show_session'] != '0'">{{ $t('Limited number of impressions during the session:') }} {{ conditions['count_show_session'] }}</li>
                    <li class="conditions__item" v-if="conditions['count_show_all'] && conditions['count_show_all'] != '0'">{{ $t('Limited number of impressions at all times:') }} {{ conditions['count_show_all'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_delay'] && conditions['show_delay'] != '0'">{{ $t('Display delay in seconds:') }} {{ conditions['show_delay'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_number_pages_viewed'] && conditions['show_number_pages_viewed'] != '0'">{{ $t('Will be shown after the number of unique page views:') }} {{ conditions['show_number_pages_viewed'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_procent_load'] && conditions['show_procent_load'] != '0'">{{ $t('Will show when the page scroll percentage reaches:') }} {{ conditions['show_procent_load'] }}%</li>
                    <li class="conditions__item" v-if="conditions['show_anchor'] && conditions['show_anchor'] != '0'">{{ $t('Will be shown when the selector') }} "{{ conditions['show_anchor'] }}" {{ $t('is in view') }}</li>
                    <li class="conditions__item" v-if="conditions['show_click_elem'] && conditions['show_click_elem'] != '0'">{{ $t('It will be shown when the selector is clicked') }} "{{ conditions['show_click_elem'] }}"</li>
                    <li class="conditions__item" v-if="conditions['show_re_screening'] && conditions['show_re_screening'] != '0'">{{ $t('Will be shown again after a number of days:') }} {{ conditions['show_re_screening'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_device'] && conditions['show_device'] == 'all'">{{ $t('Will be shown on all devices') }}</li>
                    <li class="conditions__item" v-if="conditions['show_device'] && conditions['show_device'] == 'mobile'">{{ $t('Will be shown on mobile devices') }}</li>
                    <li class="conditions__item" v-if="conditions['show_device'] && conditions['show_device'] == 'desktop'">{{ $t('Will be shown on desktop devices') }}</li>
                    <li class="conditions__item" v-if="conditions['show_pages']">{{ $t('Will only be shown on pages:') }} {{ conditions['show_pages'] }}</li>
                    <li class="conditions__item" v-if="conditions['stop_words_url']">{{ $t('Will be shown if the URL does not contain:') }} {{ conditions['stop_words_url'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_url_contains']">{{ $t('Will be shown if the URL contains:') }} {{ conditions['show_url_contains'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_if_number_items_more_in_cart'] && conditions['show_if_number_items_more_in_cart'] != '0'">{{ $t('It will be shown if the number of items in the cart is greater:') }} {{ conditions['show_if_number_items_more_in_cart'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_when_value_items_in_cart'] && conditions['show_when_value_items_in_cart'] != '0'">{{ $t('It will be shown if the cost of the item in the cart is higher:') }} {{ conditions['show_when_value_items_in_cart'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_when_adding_item_to_cart']">{{ $t('Will be shown when adding item to cart') }}</li>
                    <li class="conditions__item" v-if="conditions['show_when_removing_item_from_cart']">{{ $t('Will be shown when you remove an item from your cart') }}</li>
                    <li class="conditions__item" v-if="conditions['show_if_product_price_more'] && conditions['show_if_product_price_more'] != '0'">{{ $t('It will be shown if the cost of the product on the product page is higher:') }} {{ conditions['show_if_product_price_more'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_if_number_products_more'] && conditions['show_if_number_products_more'] != '0'">{{ $t('It will be shown if the number of products on the product page is greater:') }} {{ conditions['show_if_number_products_more'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_date_start']">{{ $t('Show start date:') }} {{ conditions['show_date_start'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_date_end']">{{ $t('Show end date:') }} {{ conditions['show_date_end'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_hours_start']">{{ $t('Show opening hours:') }} {{ conditions['show_hours_start'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_hours_end']">{{ $t('End of show hours:') }} {{ conditions['show_hours_end'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_days']">{{ $t('Day of the week of shows (by count):') }} {{ conditions['show_days'] }}</li>
                    <li class="conditions__item" v-if="conditions['show_when_trying_leave_site']">{{ $t('Will be shown when leaving the site') }}</li>
                </ol>
            </div>
            <h4>{{ $t('Start') }}</h4>
            <div class="card__block">
                <div class="field">
                    <div class="name">
                        {{ $t('Activate') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="checkbox" v-model="conditions['active']">
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'start',
    props: ['conditions'],

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    },
}
</script>

<style scoped>
    .conditions__list {
        padding-left: 10px;
        margin: 0;
    }

    .conditions__item {
        margin-bottom: 3px;
    }
</style>
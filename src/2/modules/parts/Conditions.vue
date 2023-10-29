<i18n src="../locales/common.json"></i18n>

<template>
    <div class="card__conditions">
        <div class="card__tab-description">
            <p>{{ $t('Conditions under which the pop-up will be shown to the user. If not configured, the pop-up will be shown immediately after the page loads.') }}</p>
            <p>{{ $t('Set up only those conditions that you need, leave the rest empty.') }}</p>
        </div>

        <div class="card__fields-group">
            <h4>{{ $t('Impression limit') }}</h4>
            <div class="card__block">
                <div class="field">
                    <div class="name">
                        {{ $t('Session number of impressions') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['count_show_session']">
                        </label>
                        <div class="hint">{{ $t('The session begins when you visit the site and ends when you close the browser.') }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Total Impressions') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['count_show_all']">
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="card__fields-group">
            <h4>{{ $t('Miscellaneous') }}</h4>
            <div class="card__block">
                <div class="field">
                    <div class="name">
                        {{ $t('Delay (seconds)') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['show_delay']" v-on:change="updateKeyComponentStart">
                        </label>
                        <div class="hint">{{ $t('Show a pop-up after a specified number of seconds.') }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show on number of pages viewed') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['show_number_pages_viewed']">
                        </label>
                        <div class="hint">{{ $t('Show a popup after a specified number of unique pages viewed.') }}</div>
                    </div>
                </div>
                
                <div class="field">
                    <div class="name">
                        {{ $t('Show at page scroll percentage (%)') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" max="100" v-model="conditions['show_procent_load']">
                        </label>
                        <div class="hint">{{ $t('Show a pop-up when the page scroll percentage reaches a specified number.') }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Anchor') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="text" v-model="conditions['show_anchor']">
                        </label>
                        <div class="hint">{{ $t('Specify the selector of the desired html tag.') }}</div>
                        <div class="hint">{{ $t('Show a popup when the specified selector comes within the user\'s visibility area.') }}</div>
                        <div class="hint"><search-selectors-instructions></search-selectors-instructions></div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Clicks on elements') }}
                    </div>
                    <div class="value">
                        <label>
                            <textarea v-model="conditions['show_click_elem']"></textarea>
                        </label>
                        <div class="hint">{{ $t('Specify the selector of the desired html tag.') }}</div>
                        <div class="hint">{{ $t('Show a popup when you click on the specified selectors.') }}</div>
                        <div class="hint">{{ $t('If you need multiple values, list them separated by commas (",").') }}</div>
                        <div class="hint"><search-selectors-instructions></search-selectors-instructions></div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Re-showing the popup') }}
                    </div>
                    <div class="value">
                        <label>
                            <input class="input-small" type="number" min="0" v-model="conditions['show_re_screening']">
                        </label>
                        <div class="hint">{{ $t('Specify the number of days after which the pop-up will be shown again.') }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show on devices') }}
                    </div>
                    <div class="value">
                        <label>
                            <select v-model="conditions['show_device']">
                                <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                <option value="all">{{ $t('On all devices') }}</option>
                                <option value="mobile">{{ $t('Mobile') }}</option>
                                <option value="desktop">{{ $t('Desktop') }}</option>
                            </select>
                        </label>
                        <div class="hint">{{ $t('Select the device you want to display the pop-up on.') }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show when trying to leave site') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="checkbox" v-model="conditions['show_when_trying_leave_site']">
                        </label>
                    </div>
                </div>

            </div>
        </div>

        <div class="card__fields-group">
            <h4>URL</h4>
            <div class="card__block">
                <div class="field">
                    <div class="name">
                        {{ $t('Show only on URL\'s') }}
                    </div>
                    <div class="value">
                        <label>
                            <textarea v-model="conditions['show_pages']"></textarea>
                        </label>
                        <div class="hint">{{ $t('List the URLs of the pages on which you need to limit the display of pop-ups.') }}</div>
                        <div class="hint">{{ $t('If you need multiple values, list them separated by commas (",").') }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Stop words in URL') }}
                    </div>
                    <div class="value">
                        <label>
                            <textarea v-model="conditions['stop_words_url']"></textarea>
                        </label>
                        <div class="hint">{{ $t('List the words that will be checked for content in the URL; if the URL contains one of these words, the pop-up will not be shown.') }}</div>
                        <div class="hint">{{ $t('If you need multiple values, list them separated by commas (",").') }}</div>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show if URL contains') }}
                    </div>
                    <div class="value">
                        <label>
                            <textarea v-model="conditions['show_url_contains']"></textarea>
                        </label>
                        <div class="hint">{{ $t('List the words that will be checked for content in the URL, if the URL contains one of these words, the pop-up will be shown.') }}</div>
                        <div class="hint">{{ $t('If you need multiple values, list them separated by commas (",").') }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card__fields-group">
            <h4>{{ $t('Cart') }} (Shop-Script)</h4>
            <div class="card__block">
                <div class="field">
                    <div class="name">
                        {{ $t('Show if there are more items in the cart') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['show_if_number_items_more_in_cart']">
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show when the value of the items in the cart has been reached') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['show_when_value_items_in_cart']">
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show when adding item to cart') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="checkbox" v-model="conditions['show_when_adding_item_to_cart']">
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show when removing item from cart') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="checkbox" v-model="conditions['show_when_removing_item_from_cart']">
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="card__fields-group">
            <h4>{{ $t('Product') }}</h4>
            <div class="card__block">
                <div class="field">
                    <div class="name">
                        {{ $t('Show if the item costs more') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['show_if_product_price_more']">
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show if the number of products is more') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="number" min="0" v-model="conditions['show_if_number_products_more']">
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="card__fields-group">
            <h4>{{ $t('Date') }}</h4>
            <div class="card__block">
                <div class="field">
                    <div class="name">
                        {{ $t('Show start date') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="date" v-model="conditions['show_date_start']">
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Shows end date') }}
                    </div>
                    <div class="value">
                        <label>
                            <input type="date" v-model="conditions['show_date_end']">
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show day') }}
                    </div>
                    <div class="value">
                        <label>
                            <select v-model="conditions['show_days']">
                                <option value="">—</option>
                                <option value="1">{{ $t('Monday') }}</option>
                                <option value="2">{{ $t('Tuesday') }}</option>
                                <option value="3">{{ $t('Wednesday') }}</option>
                                <option value="4">{{ $t('Thursday') }}</option>
                                <option value="5">{{ $t('Friday') }}</option>
                                <option value="6">{{ $t('Saturday') }}</option>
                                <option value="0">{{ $t('Sunday') }}</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show start hours') }}
                    </div>
                    <div class="value">
                        <label>
                            <select v-model="conditions['show_hours_start']">
                                <option value="">—</option>
                                <template v-for="hour in 24">
                                    <option v-if="hour < 10" :value="hour">0{{ hour }}</option>
                                    <option v-else :value="hour">{{ hour }}</option>
                                </template>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="name">
                        {{ $t('Show end hours') }}
                    </div>
                    <div class="value">
                        <label>
                            <select v-model="conditions['show_hours_end']">
                                <option value="">—</option>
                                <template v-for="hour in 24">
                                    <option v-if="hour < 10" :value="hour">0{{ hour }}</option>
                                    <option v-else :value="hour">{{ hour }}</option>
                                </template>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { SearchSelectorsInstructions } from '../../blocks'

export default {
    name: 'conditions',
    props: ['conditions'],

    components: {
        'search-selectors-instructions': SearchSelectorsInstructions
    },

    methods: {
        ...mapMutations(['updateKeyComponentStart']),
    },

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    },
}
</script>
(function ($) {
    $(document).ready(function () {
        const urls = {
            url_controller_get_popup_active: "{{ url_controller_get_popup_active }}",
            url_controller_get_popup_by_id: "{{ url_controller_get_popup_by_id }}",
            url_controller_send_email: "{{ url_controller_send_email }}",
            url_app: "{{ url_app }}"
        };

        class PopupInitializer {
            async initAllActive() {
                const response = await this.getAllActivePopups()
                const data = response.data

                if (data.length <= 0) return

                for (let index = 0; index < data.length; index++) {
                    const popup_html = data[index].html;
                    const params = data[index].params;
                    const conditions = data[index].conditions;
                    this.insertOnPage(popup_html, params["position"], params["id"]);

                    new Popup(params, conditions).run();
                }
            }

            async initPopupById(popup_id) {
                const response = await this.getPopupById(popup_id)
                const data = response.data
                this.insertOnPage(data.html, data.params["position"]);

                console.log(data.params)

                return new Popup(data.params, data.conditions);
            }

            getAllActivePopups() {
                const data = new FormData();
            
                return $.ajax({
                    type: "post",
                    url: urls.url_controller_get_popup_active,
                    data: data,
                    dataType: "json",
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: true,
                })
            }

            getPopupById(popup_id) {
                const data = new FormData();
                data.append('popup_id', JSON.stringify(popup_id))
            
                return $.ajax({
                    type: "post",
                    url: urls.url_controller_get_popup_by_id,
                    data: data,
                    dataType: "json",
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: true,
                })
            }

            insertOnPage(popup_html, position, popup_id) {
                switch (position) {
                    case 'above-site':
                        $("body").prepend(popup_html);
                        break;

                    case 'helper':
                        const selector_helper = '.app-popup__helper[data-popup-output="' + popup_id + '"]'
                        $(selector_helper).append(popup_html);
                        break;
                
                    default:
                        $("body").append(popup_html);
                        break;
                }
            }
        }

        class Popup {
            constructor(params, conditions = []) {
                this.params = params;
                this.conditions = conditions;
                this.id = this.params["id"];
                this.device = this.params["device"];
                this.selector = '.app-popup[data-popup-id="' + this.id + '"]';
                this.class_scroll_block = "app-popup__scroll-blocking-for-" + this.params['type'];
                this.popup = $(this.selector);
                this.is_loaded_moment_js = false;
                this.popup_key_storage_show_count =
                    "app-popup-" + this.id + "-show-count";
                this.popup_effect_open = this.params['effect_open']
                this.popup_effect_close = this.params['effect_close']
                this.is_change_popup = false
            }

            async run() {
                await new PopupHandlers(this.params, this.conditions).addHandlers();
                new PopupConditions(this.params, this.conditions).check();
            }

            closePopup() {
                if (this.is_change_popup) {
                    $(this.popup).removeClass("open");
                    $("body").removeClass(this.class_scroll_block);
                    $('body').css('padding-right', '')
                    $('body').css('float', '')
                    return
                }

                switch (this.popup_effect_close) {
                    case 'none':
                        $(this.popup).removeClass("open");
                        $("body").removeClass(this.class_scroll_block);
                        $('body').css('padding-right', '')
                        $('body').css('float', '')
                        break;
                
                    default:
                        this._closePopupAfterTransition();
                        break;
                }

                console.log('[app popup]: Popup with id "' + this.id + '" was closed.')
            }

            _closePopupAfterTransition() {
                $(this.popup).addClass("close");

                $(this.popup).on("transitionend", (e) => {
                    $(this.popup).removeClass("open");
                    $(this.popup).removeClass("close");
                    $("body").removeClass(this.class_scroll_block);
                    $(this.popup).off("transitionend");

                    if (this.params['type'] == 'popup') {
                        $('body').css('padding-right', '')
                        $('body').css('float', '')
                    }
                });

                setTimeout(() => {
                    $(this.popup).removeClass("open");
                    $(this.popup).removeClass("close");
                    $("body").removeClass(this.class_scroll_block);

                    if (this.params['type'] == 'popup') {
                        $('body').css('padding-right', '')
                        $('body').css('float', '')
                    }
                }, 900);
            }

            showPopup(conditions_list) {
                const is_show_popup = this.checkConditionsShowList(conditions_list);
                const scroll_width = window.innerWidth - $(window).innerWidth()

                if (is_show_popup) {
                    $(this.popup).addClass("open");
                    $("body").addClass(this.class_scroll_block);
                    this.popupShowSessionCounter();
                    this.popupShowAllCounter();

                    if (this.params['type'] == 'popup') {
                        $('body').css('float', 'right')
                        $('body').css('padding-right', scroll_width + 'px')
                    }
                    
                    console.log(
                        '[app popup]: Popup with id "' + this.id + '" was shown.'
                    );
                }
            }

            checkConditionsShowList(conditions_list) {
                for (const key in conditions_list) {
                    if (Object.hasOwnProperty.call(conditions_list, key)) {
                        const condition = conditions_list[key];

                        if (!condition) return false;
                    }
                }

                return true;
            }

            popupShowSessionCounter() {
                let count_display = Number(
                    sessionStorage.getItem(this.popup_key_storage_show_count)
                );

                if (count_display) {
                    sessionStorage.setItem(
                        this.popup_key_storage_show_count,
                        (count_display += 1)
                    );
                } else {
                    sessionStorage.setItem(this.popup_key_storage_show_count, 1);
                }
            }

            popupShowAllCounter() {
                let count_display = Number(
                    localStorage.getItem(this.popup_key_storage_show_count)
                );

                if (count_display) {
                    localStorage.setItem(
                        this.popup_key_storage_show_count,
                        (count_display += 1)
                    );
                } else {
                    localStorage.setItem(this.popup_key_storage_show_count, 1);
                }
            }

            async changePopup(popup_id) {
                this.is_change_popup = true
                this._setEffectsChange()
                this.closePopup()
                setTimeout(() => {
                    this._setDefaultEffects()
                }, 1000);
                
                
                const next_popup = await new PopupInitializer().initPopupById(popup_id)
                next_popup._setEffectsChange()
                next_popup.run()
                next_popup._setDefaultEffects()
            }

            _setEffectsChange() {
                $(this.popup).attr('data-effect-open', 'change')
                $(this.popup).attr('data-effect-close', 'change')
            }

            _setDefaultEffects() {
                $(this.popup).attr('data-effect-open', this.popup_effect_open)
                $(this.popup).attr('data-effect-close', this.popup_effect_close)
            }
        }

        class PopupConditions extends Popup {
            constructor(params, conditions) {
                super(params, conditions);
                this.is_click_elem = false;
                this.is_valid_page = false;
                this.is_contain_stop_word = 0;
                this.list_success_conditions = {};
            }

            check(not_check_condition = "") {
                for (const key in this.conditions) {
                    if (Object.hasOwnProperty.call(this.conditions, key)) {
                        const condition = this.conditions[key];

                        if (this.list_success_conditions[key]) continue;

                        if (
                            key === "show_delay" &&
                            not_check_condition !== "show_delay" &&
                            Number(condition)
                        ) {
                            this.delayShowPopup(key, condition);
                        }

                        if (
                            key === "show_procent_load" &&
                            not_check_condition !== "show_procent_load" &&
                            Number(condition)
                        ) {
                            this.showPopupProcentLoad(key, condition);
                        }

                        if (
                            key === "show_anchor" &&
                            not_check_condition !== "show_anchor" &&
                            condition
                        ) {
                            this.showPopupAnchor(key, condition);
                        }

                        if (
                            key === "show_click_elem" &&
                            not_check_condition !== "show_click_elem" &&
                            condition
                        ) {
                            this.showPopupClickElem(key, condition);
                        }

                        if (
                            key === "count_show_session" &&
                            not_check_condition !== "count_show_session" &&
                            Number(condition)
                        ) {
                            this.limitShowPopupForSession(key, condition);
                        }

                        if (
                            key === "count_show_all" &&
                            not_check_condition !== "count_show_all" &&
                            Number(condition)
                        ) {
                            this.limitShowPopupForAll(key, condition);
                        }

                        if (
                            key === "show_pages" &&
                            not_check_condition !== "show_pages" &&
                            condition
                        ) {
                            this.checkValidPage(key, condition);
                        }

                        if (
                            key === "stop_words_url" &&
                            not_check_condition !== "stop_words_url" &&
                            condition
                        ) {
                            this.checkContainsUrlStopWord(key, condition);
                        }

                        if (
                            key === "show_url_contains" &&
                            not_check_condition !== "show_url_contains" &&
                            condition
                        ) {
                            this.checkContainsUrl(key, condition);
                        }

                        if (
                            key === "show_when_trying_leave_site" &&
                            not_check_condition !== "show_when_trying_leave_site" &&
                            condition
                        ) {
                            this.showPopupWhenTryingLeaveSite(key, condition);
                        }

                        if (
                            key === "show_days" &&
                            not_check_condition !== "show_days" &&
                            condition
                        ) {
                            this.showPopupSelectedDay(key, condition);
                        }

                        if (
                            key === "show_hours_start" &&
                            not_check_condition !== "show_hours_start" &&
                            condition
                        ) {
                            this.showStartSelectedHours(key, condition);
                        }

                        if (
                            key === "show_hours_end" &&
                            not_check_condition !== "show_hours_end" &&
                            condition
                        ) {
                            this.endShowStartSelectedHours(key, condition);
                        }

                        if (
                            key === "show_re_screening" &&
                            not_check_condition !== "show_re_screening" &&
                            Number(condition)
                        ) {
                            this.showPopupReScreening(key, condition);
                        }

                        if (
                            key === "show_device" &&
                            not_check_condition !== "show_device" &&
                            condition
                        ) {
                            this.showPopupOnDevice(key, condition);
                        }

                        if (
                            key === "show_date_start" &&
                            not_check_condition !== "show_date_start" &&
                            condition
                        ) {
                            this.showPopupSelectedDate(key, condition);
                        }

                        if (
                            key === "show_date_end" &&
                            not_check_condition !== "show_date_end" &&
                            condition
                        ) {
                            this.endShowPopupSelectedDate(key, condition);
                        }

                        if (
                            key === "show_number_pages_viewed" &&
                            not_check_condition !== "show_number_pages_viewed" &&
                            Number(condition)
                        ) {
                            this.showPopupNumberPagesViewed(key, condition);
                        }

                        if (
                            key === "show_if_number_items_more_in_cart" &&
                            not_check_condition !== "show_if_number_items_more_in_cart" &&
                            Number(condition)
                        ) {
                            this.showPopupIfNumberItemsInCartMore(
                                key,
                                condition,
                                new CookieManager()
                            );
                        }

                        if (
                            key === "show_when_value_items_in_cart" &&
                            not_check_condition !== "show_when_value_items_in_cart" &&
                            Number(condition)
                        ) {
                            this.showPopupIfValueItemsInCartMore(
                                key,
                                condition,
                                new CookieManager()
                            );
                        }

                        if (
                            key === "show_when_adding_item_to_cart" &&
                            not_check_condition !== "show_when_adding_item_to_cart" &&
                            condition
                        ) {
                            this.showPopupWhenAddingItemToCart(
                                key,
                                condition,
                                new CookieManager()
                            );
                        }

                        if (
                            key === "show_when_removing_item_from_cart" &&
                            not_check_condition !== "show_when_removing_item_from_cart" &&
                            condition
                        ) {
                            this.showPopupWhenRemovingItemToCart(
                                key,
                                condition,
                                new CookieManager()
                            );
                        }

                        if (
                            key === "show_if_product_price_more" &&
                            not_check_condition !== "show_if_product_price_more" &&
                            Number(condition)
                        ) {
                            this.showPopupIfProductPriceMore(
                                key,
                                condition,
                                new CookieManager()
                            );
                        }

                        if (
                            key === "show_if_number_products_more" &&
                            not_check_condition !== "show_if_number_products_more" &&
                            Number(condition)
                        ) {
                            this.showPopupIfProductsCountMore(
                                key,
                                condition,
                                new CookieManager()
                            );
                        }
                    }
                }
                console.log(this.id, this.list_success_conditions);
                this.showPopup(this.list_success_conditions);
            }

            delayShowPopup(key, condition) {
                let condition_string = String(condition);
                condition_string += "000";
                const condition_number = Number(condition_string);

                setTimeout(() => {
                    this.list_success_conditions[key] = true;
                    this.check(key);
                }, condition_number);

                this.list_success_conditions[key] = false;
                return false;
            }

            showPopupProcentLoad(key, condition) {
                const scrollHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                );
                const size_page = scrollHeight - window.innerHeight;
                const procent_of_height_page = Math.floor(
                    size_page * (Number(condition) / 100)
                );

                if (window.pageYOffset >= procent_of_height_page) {
                    this.list_success_conditions[key] = true;
                    return true;
                }

                $(window).on("scroll", (e) => {
                    if (window.pageYOffset >= procent_of_height_page) {
                        this.list_success_conditions[key] = true;
                        this.check(key);
                        $(window).off("scroll");
                    }
                });

                this.list_success_conditions[key] = false;
                return false;
            }

            showPopupAnchor(key, condition) {
                let show_done;
                const anchor = document.querySelector(condition);

                if (!anchor) return;

                const window_center_y = window.innerHeight / 2;
                const anchor_offset_y =
                    anchor.getBoundingClientRect().top + window.pageYOffset;
                const anchor_center_of_visibility = anchor_offset_y - window_center_y;

                if (anchor_center_of_visibility <= window.pageYOffset && anchor_center_of_visibility + 200 >= window.pageYOffset && !show_done) {
                    this.list_success_conditions[key] = true;
                    show_done = true;
                    return true;
                }

                $(window).on("scroll", (e) => {
                    if (anchor_center_of_visibility <= window.pageYOffset && anchor_center_of_visibility + 200 >= window.pageYOffset && !show_done) {
                        this.list_success_conditions[key] = true;
                        show_done = true;
                        this.check(key);
                    }
                });

                this.list_success_conditions[key] = false;
                return false;
            }

            showPopupClickElem(key, condition) {
                const elems_to_click = condition.split(",");

                for (let i = 0; i < elems_to_click.length; i++) {
                    const elem_to_click = elems_to_click[i];
                    const elems_on_page = $(elem_to_click);

                    for (let j = 0; j < elems_on_page.length; j++) {
                        const elem_on_page = elems_on_page[j];

                        $(elem_on_page).on("click", (e) => {
                            this.list_success_conditions[key] = true;
                            this.check(key);
                            // $(elem_on_page).off('click')
                            // return true
                        });
                    }
                }

                this.list_success_conditions[key] = false;
                return false;
            }

            limitShowPopupForSession(key, condition) {
                let count_display = Number(
                    sessionStorage.getItem(this.popup_key_storage_show_count)
                );
                condition = Number(condition);

                if (count_display >= condition) {
                    this.list_success_conditions[key] = false;
                    return false;
                }

                this.list_success_conditions[key] = true;
                return true;
            }

            limitShowPopupForAll(key, condition) {
                let count_display = Number(
                    localStorage.getItem(this.popup_key_storage_show_count)
                );
                condition = Number(condition);

                if (count_display >= condition) {
                    this.list_success_conditions[key] = false;
                    return false;
                }

                this.list_success_conditions[key] = true;
                return true;
            }

            checkValidPage(key, condition) {
                const pages = condition.split(",");

                for (let index = 0; index < pages.length; index++) {
                    const page = pages[index].trim();

                    if (location.href === page) {
                        this.list_success_conditions[key] = true;
                        return true;
                    }
                }

                this.list_success_conditions[key] = true;
                return false;
            }

            checkContainsUrlStopWord(key, condition) {
                const words = condition.split(",");

                for (let index = 0; index < words.length; index++) {
                    const word = words[index].trim();
                    const url = location.href;
                    const re = new RegExp(word, "gi");
                    const is_url_contain_stop_word = re.test(url);

                    if (is_url_contain_stop_word) {
                        this.list_success_conditions[key] = false;
                        return false;
                    }
                }

                this.list_success_conditions[key] = true;
                return true;
            }

            checkContainsUrl(key, condition) {
                const contains = condition.split(",");

                for (let index = 0; index < contains.length; index++) {
                    const contain = contains[index].trim();
                    const url = location.href;
                    const re = new RegExp(contain, "gi");
                    const is_url_contain = re.test(url);

                    if (is_url_contain) {
                        this.list_success_conditions[key] = true;
                        return true;
                    }
                }

                this.list_success_conditions[key] = false;
                return false;
            }

            showPopupSelectedDay(key, condition) {
                const today = new Date();

                if (condition == today.getDay()) {
                    this.list_success_conditions[key] = true;
                    return true;
                } else {
                    this.list_success_conditions[key] = false;
                    return false;
                }
            }

            showStartSelectedHours(key, condition) {
                const today = new Date();
                const start_hours = condition;
                const is_show = today.getHours() - start_hours > 0 ? true : false;

                if (is_show) {
                    this.list_success_conditions[key] = true;
                    return true;
                } else {
                    this.list_success_conditions[key] = false;
                    return false;
                }
            }

            endShowStartSelectedHours(key, condition) {
                const today = new Date();
                const end_hours = condition;
                const is_show = end_hours - today.getHours() > 0 ? true : false;

                if (is_show) {
                    this.list_success_conditions[key] = true;
                    return true;
                } else {
                    this.list_success_conditions[key] = false;
                    return false;
                }
            }

            showPopupSelectedDate(key, condition) {
                const today = new Date();
                const start_date = new Date(condition);
                const is_show = today - start_date > 0 ? true : false;

                if (is_show) {
                    this.list_success_conditions[key] = true;
                    return true;
                } else {
                    this.list_success_conditions[key] = false;
                    return false;
                }
            }

            endShowPopupSelectedDate(key, condition) {
                const today = new Date();
                const end_date = new Date(condition);
                const is_show = end_date - today > 0 ? true : false;

                if (is_show) {
                    this.list_success_conditions[key] = true;
                    return true;
                } else {
                    this.list_success_conditions[key] = false;
                    return false;
                }
            }

            showPopupReScreening(key, condition) {
                const today = new Date();
                const popup_key_storage = "app-popup-" + this.id + "-rescreening-day";
                let re_screening_day = Number(localStorage.getItem(popup_key_storage));
                const day_rescreening = today.getDate() + Number(condition);

                if (re_screening_day) {
                    if (today.getDate() === re_screening_day) {
                        this.list_success_conditions[key] = true;
                        localStorage.setItem(popup_key_storage, day_rescreening);
                        return true;
                    } else {
                        this.list_success_conditions[key] = false;
                        return false;
                    }
                }

                this.list_success_conditions[key] = true;
                localStorage.setItem(popup_key_storage, day_rescreening);
                return true;
            }

            showPopupOnDevice(key, condition) {
                if (condition === "all") {
                    this.list_success_conditions[key] = true;
                    return true;
                }

                const is_valid_device = this.device == condition;
                this.list_success_conditions[key] = is_valid_device;
                return is_valid_device;
            }

            showPopupWhenTryingLeaveSite(key, condition) {
                let is_show_done;

                if (this.device === "desktop") {
                    $(document).on("mouseleave", (e) => {
                        if (e.clientY < 10 && !is_show_done) {
                            this.list_success_conditions[key] = true;
                            is_show_done = true;
                            this.check(key);
                        }
                    });
                }

                if (this.device === "mobile") {
                    if (!is_show_done) {
                        new TriggersExitSiteForMobile(() => {
                            this.list_success_conditions[key] = true;
                            is_show_done = true;
                            this.check(key);
                        })
                            .buttonBack()
                            .scrollUp(15)
                            .tabSwitching()
                            .timeOut(30000);
                    }
                }

                this.list_success_conditions[key] = false;
                return false;
            }

            showPopupNumberPagesViewed(key, condition) {
                const popup_key_storage = "app-popup-" + this.id + "-page-views";
                const page_views = sessionStorage.getItem(popup_key_storage);

                if (page_views) {
                    const page_views_list = page_views.split(",");
                    const is_visited_page = page_views_list.includes(location.href);

                    if (!is_visited_page) {
                        sessionStorage.setItem(
                            popup_key_storage,
                            page_views + "," + location.href
                        );
                    }

                    if (page_views_list.length === Number(condition)) {
                        sessionStorage.removeItem(popup_key_storage);
                        this.list_success_conditions[key] = true;
                        return true;
                    }
                } else {
                    sessionStorage.setItem(popup_key_storage, location.href);
                }

                this.list_success_conditions[key] = false;
                return false;
            }

            showPopupIfNumberItemsInCartMore(key, condition, cookie_manager) {
                const cookie_key = "app-popup-cart-count-items";
                const cart_count = Number(cookie_manager.getCookie(cookie_key));
                const condition_count = Number(condition);

                if (cart_count > condition_count) {
                    this.list_success_conditions[key] = true;
                    cookie_manager.deleteCookie(cookie_key);
                    return true;
                }

                const timer_id = setInterval(() => {
                    const cart_count = Number(cookie_manager.getCookie(cookie_key));

                    if (cart_count > condition_count) {
                        this.list_success_conditions[key] = true;
                        cookie_manager.deleteCookie(cookie_key);
                        clearInterval(timer_id);
                        this.check(key);
                    }
                }, 1000);

                this.list_success_conditions[key] = false;
                cookie_manager.deleteCookie(cookie_key);
                return false;
            }

            showPopupIfValueItemsInCartMore(key, condition, cookie_manager) {
                const cookie_key = "app-popup-cart-total-items";
                const cart_total = Number(cookie_manager.getCookie(cookie_key));
                const condition_total = Number(condition);

                if (cart_total > condition_total) {
                    this.list_success_conditions[key] = true;
                    cookie_manager.deleteCookie(cookie_key);
                    return true;
                }

                const timer_id = setInterval(() => {
                    const cart_total = Number(cookie_manager.getCookie(cookie_key));

                    if (cart_total > condition_total) {
                        this.list_success_conditions[key] = true;
                        cookie_manager.deleteCookie(cookie_key);
                        clearInterval(timer_id);
                        this.check(key);
                    }
                }, 1000);

                this.list_success_conditions[key] = false;
                cookie_manager.deleteCookie(cookie_key);
                return false;
            }

            showPopupWhenAddingItemToCart(key, condition, cookie_manager) {
                const cookie_key = "app-popup-cart-adding";
                const is_adding =
                    cookie_manager.getCookie(cookie_key) == "true" ? true : false;

                if (is_adding) {
                    this.list_success_conditions[key] = true;
                    cookie_manager.deleteCookie(cookie_key);
                    return true;
                }

                const timer_id = setInterval(() => {
                    const is_adding =
                        cookie_manager.getCookie(cookie_key) == "true" ? true : false;

                    if (is_adding) {
                        this.list_success_conditions[key] = true;
                        cookie_manager.deleteCookie(cookie_key);
                        clearInterval(timer_id);
                        this.check(key);
                    }
                }, 1000);

                this.list_success_conditions[key] = false;
                cookie_manager.deleteCookie(cookie_key);
                return false;
            }

            showPopupWhenRemovingItemToCart(key, condition, cookie_manager) {
                const cookie_key = "app-popup-cart-removing";
                const is_removing =
                    cookie_manager.getCookie(cookie_key) == "true" ? true : false;

                if (is_removing) {
                    this.list_success_conditions[key] = true;
                    cookie_manager.deleteCookie(cookie_key);
                    return true;
                }

                const timer_id = setInterval(() => {
                    const is_removing =
                        cookie_manager.getCookie(cookie_key) == "true" ? true : false;

                    if (is_removing) {
                        this.list_success_conditions[key] = true;
                        cookie_manager.deleteCookie(cookie_key);
                        clearInterval(timer_id);
                        this.check(key);
                    }
                }, 1000);

                this.list_success_conditions[key] = false;
                cookie_manager.deleteCookie(cookie_key);
                return false;
            }

            showPopupIfProductPriceMore(key, condition, cookie_manager) {
                const cookie_key = "app-popup-product-price";
                const product_price = Number(cookie_manager.getCookie(cookie_key));
                const condition_price = Number(condition);

                if (product_price > condition_price) {
                    this.list_success_conditions[key] = true;
                    cookie_manager.deleteCookie(cookie_key);
                    return true;
                }

                this.list_success_conditions[key] = false;
                cookie_manager.deleteCookie(cookie_key);
                return false;
            }

            showPopupIfProductsCountMore(key, condition, cookie_manager) {
                const cookie_key = "app-popup-product-number-items";
                const product_count = Number(cookie_manager.getCookie(cookie_key));
                const condition_count = Number(condition);

                if (product_count > condition_count) {
                    this.list_success_conditions[key] = true;
                    cookie_manager.deleteCookie(cookie_key);
                    return true;
                }

                this.list_success_conditions[key] = false;
                cookie_manager.deleteCookie(cookie_key);
                return false;
            }
        }

        class PopupHandlers extends Popup {
            constructor(params, conditions) {
                super(params, conditions);
            }

            async addHandlers() {
                this.addHandlerCloseByClick();
                this.addHandlerCloseByTouch();
                this.addHandlerForm();
                this.addHandlerButton();
                await this.addHandlerTimer();
            }

            addHandlerCloseByClick() {
                $(this.popup).on("click", (e) => {
                    const elem_action = $(e.target).attr("data-action");

                    if (elem_action === "close") {
                        this.closePopup();
                    }
                });
            }

            addHandlerCloseByTouch() {
                $.event.special.touchstart = {
                    setup: function (_, ns, handle) {
                        this.addEventListener("touchstart", handle, {
                            passive: !ns.includes("noPreventDefault"),
                        });
                    },
                };
                $.event.special.touchmove = {
                    setup: function (_, ns, handle) {
                        this.addEventListener("touchmove", handle, {
                            passive: !ns.includes("noPreventDefault"),
                        });
                    },
                };
                $.event.special.wheel = {
                    setup: function (_, ns, handle) {
                        this.addEventListener("wheel", handle, { passive: true });
                    },
                };
                $.event.special.mousewheel = {
                    setup: function (_, ns, handle) {
                        this.addEventListener("mousewheel", handle, { passive: true });
                    },
                };

                const modal = $(this.popup).find(".app-popup__modal");
                let touch_start_y = 0;
                let touch_difference_y = 0;
                let current_position_y = 0;
                let position_move_y = 0;
                let swipe_distance_hide = 70;
                const close_effect = $(this.popup).attr("data-effect-close");

                const touchstartHandler = (e) => {
                    touch_start_y = e.originalEvent.touches[0].clientY;
                    $(this.popup).attr("data-effect-close", "touch-close");
                    $(modal).css("transition", "none");
                };

                const touchmoveHandler = (e) => {
                    touch_difference_y = Math.ceil(
                        touch_start_y - e.originalEvent.touches[0].clientY
                    );
                    position_move_y = current_position_y - touch_difference_y;
                    $(modal).css("transform", "translateY(" + position_move_y + "px)");

                    // if (e.target.className && re_text_this.top_level_html_container.test(e.target.className)) {
                    //     modal.style.transform = 'translateY(0px)'
                    // }

                    if (position_move_y < 0) {
                        $(modal).css("transform", "translateY(0)");
                        $(this.popup).attr("data-effect-close", close_effect);
                        $(modal).css("transition", "");
                    }
                };

                const touchendHandler = (e) => {
                    if (position_move_y > swipe_distance_hide) {
                        this.closePopup();
                        $(this.popup).off("touchstart", modal, touchstartHandler);
                        $(this.popup).off("touchmove", modal, touchmoveHandler);
                        $(this.popup).off("touchend", modal, touchendHandler);
                        $(this.popup).off("touchcancel", modal, touchcancelHanler);
                    } else {
                        $(modal).css("transform", "translateY(0)");
                        $(this.popup).attr("data-effect-close", close_effect);
                        $(modal).css("transition", "");
                    }
                };

                const touchcancelHanler = (e) => {
                    modal.style.transform = "translateY(0px)";
                    $(this.popup).attr("data-effect-close", close_effect);
                    $(modal).css("transition", "");
                };

                $(modal).on({ touchstart: touchstartHandler });
                $(modal).on({ touchmove: touchmoveHandler });
                $(modal).on({ touchend: touchendHandler });
                $(modal).on({ touchcancel: touchcancelHanler });
            }

            addHandlerForm() {
                const block = $(this.popup).find('[data-type="c-form"]');
                const block_id = $(block).attr("data-block-id");
                const popup_id = $(this.popup).attr("data-popup-id");
                const forms = $(block).find("form");

                if (!forms.length) return;

                for (var index = 0; index < forms.length; index++) {
                    this._handlerForm(forms[index], popup_id, block_id);
                }
            }

            _handlerForm(form, popup_id, block_id) {
                const url = urls.url_controller_send_email

                $(form).on('submit', (e) => {
                    e.preventDefault()

                    const data = new FormData()
                    data.append('data_form', JSON.stringify($(form).serializeArray()))
                    data.append('block_id', block_id)
                    data.append('popup_id', popup_id)

                    const request = $.ajax({
                        type: 'post',
                        url: url,
                        data: data,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: (response) => {
                            const form_action = $(form).attr('data-form-action')

                            switch (form_action) {
                                case 'response':
                                    this._formActionResponse(form)
                                    break

                                case 'close':
                                    this.closePopup()
                                    break

                                case 'follow_link':
                                    const link_to_go = $(form).attr('data-link-to-go')
                                    document.location.href = link_to_go
                                    break

                                case 'open-popup':
                                    const id_popup_open = $(form).attr('data-popup-open')
                                    this.closePopup()
                                    new PopupInitializer().showPopupById(id_popup_open)
                                    break
                            }
                        },
                    })

                    request.fail(function (jqXHR, textStatus) {
                        console.log('[app popup]: Request failed - ' + textStatus)
                        console.log('[app popup]: ' + jqXHR.responseText)
                    })
                })
            }

            _formActionResponse(form) {
                $(form).addClass('response-show')

                setTimeout(function () {
                    $(form)[0].reset()
                    $(form).removeClass('response-show')
                }, 7000)
            }

            addHandlerTimer() {
                const timers = $(this.popup).find('[data-type="c-timer"]');

                if (!timers.length) return;

                return new Promise((resolve, reject) => {
                    if (!this.is_loaded_moment_js) {
                        const script = document.createElement("script");
                        script.src = urls.url_app + "js/moment.min.js";
                        document.getElementsByTagName("head")[0].appendChild(script);

                        $(script).on("load", function () {
                            this.is_loaded_moment_js = true;
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                }).then(() => {
                    for (var index = 0; index < timers.length; index++) {
                        this._handlerTimer(timers[index]);
                    }
                });
            }

            _handlerTimer(timer) {
                var date_timer = $(timer).find("[data-timer]").attr("data-timer");

                var countDownFunction = setInterval(function () {
                    var count_downdate = moment(date_timer);
                    var now = moment();
                    var distance = count_downdate - now;
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    if (distance < 0) {
                        clearInterval(countDownFunction);
                        days = "00";
                        hours = "00";
                        minutes = "00";
                        seconds = "00";
                    }

                    $(timer).find(".app-popup__timer-days")[0].firstChild.data = days;
                    $(timer).find(".app-popup__timer-hours")[0].firstChild.data = hours;
                    $(timer).find(".app-popup__timer-minutes")[0].firstChild.data =
                        minutes;
                    $(timer).find(".app-popup__timer-seconds")[0].firstChild.data =
                        seconds;
                }, 1000);
            }

            addHandlerButton() {
                const block = $(this.popup).find('[data-type="c-button"]');
                const buttons = $(block).find(".app-popup__button");

                if (!buttons.length) return;

                for (let index = 0; index < buttons.length; index++) {
                    const button = buttons[index];
                    this._handlerButton(button);
                }
            }

            _handlerButton(button) {
                $(button).on('click', (e) => {
                    const button_action = $(button).attr('data-button-action')
                    const id_popup_open = $(button).attr('data-popup-open')

                    switch (button_action) {
                        case 'follow-link':
                            break

                        case 'close':
                            e.preventDefault()
                            this.closePopup()
                            break

                        case 'open-popup':
                            e.preventDefault()
                            this.changePopup(id_popup_open) 
                            break
                    }
                })
                    
            }
        }

        class TriggersExitSiteForMobile {
            constructor(callback) {
                this.callback = callback;
                this.interval = null;
                this.complete = false;
            }

            scrollUp(percentUp = 5) {
                var scrollHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                );
                var scrollStart = window.pageYOffset;
                var pageHeight = scrollHeight;
                var parentThis = this;

                if (pageHeight > 0) {
                    // Only check the scroll position every few seconds, to avoid bogging the UI
                    this.interval = setInterval(function () {
                        var scrollAmount = scrollStart - window.pageYOffset;

                        if (scrollAmount < 0) {
                            scrollAmount = 0;
                            scrollStart = window.pageYOffset;
                        }

                        var upScrollPercent =
                            parseFloat(scrollAmount) / parseFloat(pageHeight);

                        if (upScrollPercent > parseFloat(percentUp) / 100) {
                            clearInterval(parentThis.interval);
                            parentThis.interval = null;

                            if (!parentThis.complete) {
                                parentThis.callback();
                                parentThis.complete = true;
                            }
                        }
                    }, 1000);
                }

                return this;
            }

            buttonBack() {
                var parentThis = this;

                if (window.history && history.pushState) {
                    // check for history api support
                    window.addEventListener(
                        "load",
                        function () {
                            // create history states
                            history.pushState(-1, null); // back state
                            history.pushState(0, null); // main state
                            history.pushState(1, null); // forward state
                            history.go(-1); // start in main state

                            this.addEventListener(
                                "popstate",
                                function (event, state) {
                                    // check history state and fire custom events
                                    if ((state = event.state)) {
                                        if (state < 0 && !parentThis.complete) {
                                            parentThis.callback();
                                            parentThis.complete = true;
                                        }
                                        // reset state
                                        //history.go(-state)
                                    }
                                },
                                false
                            );
                        },
                        false
                    );
                }

                return this;
            }

            tabSwitching() {
                var parentThis = this;

                document.addEventListener("visibilitychange", function () {
                    if (!document.hidden && !parentThis.complete) {
                        parentThis.callback();
                        parentThis.complete = true;
                    }
                });

                return this;
            }

            timeOut(time = 30000) {
                var parentThis = this;

                var timerId = setTimeout(function () {
                    if (!parentThis.complete) {
                        parentThis.callback();
                        parentThis.complete = true;
                    }
                }, Number(time));

                window.addEventListener("scroll", handlerScroll);
                function handlerScroll() {
                    clearTimeout(timerId);
                    parentThis.timeOut();
                    removeEventListener("scroll", handlerScroll);
                }

                window.addEventListener("click", handlerClick);
                function handlerClick() {
                    clearTimeout(timerId);
                    parentThis.timeOut();
                    removeEventListener("click", handlerClick);
                }

                window.addEventListener("resize", handlerResize);
                function handlerResize() {
                    clearTimeout(timerId);
                    parentThis.timeOut();
                    removeEventListener("resize", handlerResize);
                }

                return this;
            }
        }

        class CookieManager {
            getCookie(name) {
                let matches = document.cookie.match(
                    new RegExp(
                        "(?:^|; )" +
                        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                        "=([^;]*)"
                    )
                );
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }

            setCookie(name, value, options = {}) {
                if (options.expires instanceof Date) {
                    options.expires = options.expires.toUTCString();
                }

                let updatedCookie =
                    encodeURIComponent(name) + "=" + encodeURIComponent(value);

                for (let optionKey in options) {
                    updatedCookie += "; " + optionKey;
                    let optionValue = options[optionKey];

                    if (optionValue !== true) {
                        updatedCookie += "=" + optionValue;
                    }
                }

                document.cookie = updatedCookie;
            }

            deleteCookie(name) {
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                document.cookie =
                    name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            }
        }

        new PopupInitializer().initAllActive()
    });
})(jQuery);

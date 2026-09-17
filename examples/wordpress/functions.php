<?php
/**
 * Theme functions snippet for WordPress Persian Date Native integration.
 */
function pdn_enqueue_scripts() {
    wp_enqueue_script(
        'persian-date-native',
        'https://unpkg.com/persian-date-native',
        array(),
        '1.2.3',
        true
    );

    wp_add_inline_script('persian-date-native', '
        document.addEventListener("DOMContentLoaded", function() {
            if (!window.PersianDateNative) return;
            const { persianDate } = window.PersianDateNative;
            document.querySelectorAll(".post-date, time").forEach(function(el) {
                const dt = el.getAttribute("datetime") || el.innerText;
                const p = persianDate(new Date(dt));
                if (!isNaN(p.getTime())) {
                    el.innerText = p.formatFa("D MMMM YYYY");
                }
            });
        });
    ');
}
add_action('wp_enqueue_scripts', 'pdn_enqueue_scripts');

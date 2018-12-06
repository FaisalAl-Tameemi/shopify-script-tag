
$(document).ready(function() {
    
    const SHOP = window.Shopify.shop
    const API_BASE = `https://${SHOP}/apps/mindset-api-v1`

    $.get(`${API_BASE}/test`)

});

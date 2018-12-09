/* Using a self-executing anonymous function - (function(){})(); - so that all variables and functions defined within 
aren’t available to the outside world. */

(function(){

    var SHOP = window.Shopify.shop
    var API_BASE = `https://${SHOP}/apps/mindset-api-v1`



    var loadCSS = function($){
        $('body').append(`
            <style>
                .msl-flex-container {
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    display: -webkit-box;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;

                    -webkit-flex-flow: row wrap;
                    justify-content: space-around;
                    vertical-align: center;

                    padding: 40px 160px;
                }

                @media screen and (max-width: 992px) {
                    .msl-flex-container {
                        padding: 20px;
                    }
                }

                @media screen and (max-width: 600px) {
                    .msl-flex-container {
                        padding: 10px;
                    }
                }

                .msl-flex-item {
                    flex: 1;
                    box-sizing: border-box;
                    margin-top: 10px;
                    text-align: center;
                    align-self: center;
                }

                .msl-flex-item img {
                    max-width: 256px;
                }

                .msl-recommendations {
                    margin-top: 40px;
                }

                .msl-recommendations-title {
                    text-align: center;
                }
            </style>
        `)
    };
  
    /* Load Script function we may need to load jQuery from the Google's CDN */
    /* That code is world-reknown. */
    /* One source: http://snipplr.com/view/18756/loadscript/ */

    var loadScript = function(url, callback){
        var script = document.createElement("script");
        script.type = "text/javascript";

        // If the browser is Internet Explorer.
        if (script.readyState){ 
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        // For any other browser.
        } else {
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    var buildCardTemplate = function (productData) {
        return ` 
            <a class="msl-flex-item" href="/products/${productData.handle}">
                <img src="${productData.image.src}" />
                <h4> ${productData.title} </h4>
                <span> ${productData.variants[0].price} </span>
            </a>
        `
    };

    var buildRecommendationSectionTemplate = function (recommendationsResponse) {
        return `
            <div class="msl-recommendations">
                <h2 class="msl-recommendations-title">Recommended Products</h2>
                <div class="msl-flex-container">
                    ${
                        recommendationsResponse.products
                            .map(product => buildCardTemplate(product)).join('')
                    }
                </div>
            </div>
        `
    };

    /* This is my app's JavaScript */
    var initialize = function($){
        $.get(`${API_BASE}/recommendations/similar`, function(data) {
            var html = buildRecommendationSectionTemplate(data);
            $('#shopify-section-product-template').append(html);
        });
    };

    /* If jQuery has not yet been loaded or if it has but it's too old for our needs,
    we will load jQuery from the Google CDN, and when it's fully loaded, we will run
    our app's JavaScript. Set your own limits here, the sample's code below uses 1.7
    as the minimum version we are ready to use, and if the jQuery is older, we load 1.9. */
    if ((typeof jQuery === 'undefined') || (parseInt(jQuery.fn.jquery) === 1 && parseFloat(jQuery.fn.jquery.replace(/^1\./,'')) < 7.1)) {
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
            jQuery191 = jQuery.noConflict(true);
            loadCSS(jQuery191);
            initialize(jQuery191);
        });
    } else {
        loadCSS(jQuery);
        initialize(jQuery);
    }

})();

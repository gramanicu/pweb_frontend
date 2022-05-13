const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");

mix.disableNotifications();
mix.js("resources/js/app.js", "public/js");
mix.sass("resources/scss/app.scss", "public/css")
    .options({
        postCss: [tailwindcss("./tailwind.config.js")],
    })
    .version();

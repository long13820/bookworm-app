<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Book Worm</title>
    </head>
    <body class="antialiased">
        <div id="root"></div>
        <script src="{{mix('./resources/js/app.jsx')}}"></script>
    </body>
</html>

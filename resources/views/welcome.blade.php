<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @vite('resources/css/app.css')

        <title>AI FE Exam</title> 
    </head>
    <body>
        <div id="app"></div>
    
        @viteReactRefresh
        @vite('resources/js/app.jsx') 
                    
    </body>
</html>

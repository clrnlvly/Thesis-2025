<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Request;

if (!function_exists('route_with_academic_year')) {
    function route_with_academic_year(string $name, array $params = [], array $extraQuery = []): string
    {
        // Build the base route URL
        $url = route($name, $params);

        // Merge any current query, session academic year, and extra queries
        $query = array_merge(
            request()->query(),
            ['academic_year_id' => session('selected_year')],
            $extraQuery
        );

        return $url . '?' . http_build_query($query);
    }
}

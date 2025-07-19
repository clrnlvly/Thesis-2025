<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\SidebarSection;
use App\Models\Academic_Year;
use App\Models\SidebarSectionProfessor;
use App\Models\SidebarSectionStudent;
use Illuminate\Support\Facades\Vite;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'academic_year' => Academic_Year::all(),
            'selected_year' => function () {
                $yearParam = Request::query('academic_year_id');
        
                $match = Academic_Year::find($yearParam);
        
                if ($match) {
                    Session::put('selected_year', $match->id);
                }
        
                return Session::get('selected_year');
            },
        ]);

        
        // Inertia::share([
        //     'academic_year' => Academic_Year::all(),
        //     'selected_year' => function () {
        //         $yearParam = request()->query('year');
        
        //         $match = Academic_Year::all()->first(function ($year) use ($yearParam) {
        //             return "SY: " . date('Y', strtotime($year->start)) . " - " . date('Y', strtotime($year->end)) === $yearParam;
        //         });
        
        //         if ($match) {
        //             Session::put('selected_year', $match->id);
        //         }
        
        //         return Session::get('selected_year');
        //     },
        // ]);
        
        

        // Sidebar menu
        Inertia::share('sidebarDisplay', function () {
            $user = auth()->user();
            if (!$user) return [];

            switch ($user->role) {
                case 'student':
                    $sections = SidebarSectionStudent::with(['subItemsStudent' => function ($query) {
                        $query->where('is_displayed', true);
                    }])->where('is_displayed', true)->get();

                    return $sections->map(function ($section) {
                        return [
                            'title' => $section->title,
                            'icon' => null,
                            'items' => $section->subItemsStudent->map(function ($item) {
                                return [
                                    'title' => $item->title,
                                    'url' => ($item->route && Route::has($item->route))
                                        ? route_with_academic_year($item->route, [], ['per_page' => 10])
                                        : '#',
                                ];
                            }),
                        ];
                    });

                case 'professor':
                    $sections = SidebarSectionProfessor::with(['subItemsProfessor' => function ($query) {
                        $query->where('is_displayed', true);
                    }])->where('is_displayed', true)->get();

                    return $sections->map(function ($section) {
                        return [
                            'title' => $section->title,
                            'icon' => null,
                            'items' => $section->subItemsProfessor->map(function ($item) {
                                return [
                                    'title' => $item->title,
                                    'url' => ($item->route && Route::has($item->route))
                                        ? route_with_academic_year($item->route, [], ['per_page' => 10])
                                        : '#',
                                ];
                            }),
                        ];
                    });

                default: // super admin, registrar, accounting, etc.
                    $sections = SidebarSection::with(['subItems' => function ($query) {
                        $query->where('is_displayed', true);
                    }])
                    ->where('user_type', $user->role)
                    ->where('is_displayed', true)
                    ->get();

                    return $sections->map(function ($section) {
                        return [
                            'title' => $section->title,
                            'icon' => null,
                            'items' => $section->subItems->map(function ($item) {
                                return [
                                    'title' => $item->title,
                                    'url' => ($item->route && Route::has($item->route))
                                        ? route_with_academic_year($item->route, [], ['per_page' => 10])
                                        : '#',
                                ];
                            }),
                        ];
                    });
            }
        });

    }
}

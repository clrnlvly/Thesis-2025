<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Grades;
use App\Models\Student_Info;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use League\Csv\Reader;

class CSVController extends Controller
{
    public function index(Request $request)
    {
        $csvData = [];

        if ($request->has('csv')) {
            $filename = $request->query('csv');
            $path = "temp/{$filename}";

            if (Storage::exists($path)) {
                $json = Storage::get($path);
                $csvData = json_decode($json, true);
                Storage::delete($path);
            }
        }

        $studentIds = Student_Info::pluck('student_id')
            ->map(fn ($id) => (string) $id)
            ->toArray();

        return Inertia::render('Professor/CSVTable', [
            'csvData' => is_array($csvData) ? $csvData : [],
            'studentInfoIds' => $studentIds,
            'uploadedFilename' => $request->query('csv')
        ]);
    }

    public function bulkUpload(Request $request)
    {
        Log::debug('Bulk CSV Upload initiated');

        $request->validate([
            'csv_files.*' => 'required|file|mimes:csv,txt|max:10240',
        ]);

        $allRecords = [];

        foreach ($request->file('csv_files') as $index => $file) {
            Log::debug("Processing file {$index}", ['file' => $file->getClientOriginalName()]);

            $csv = Reader::createFromPath($file->getRealPath(), 'r');
            $csv->setHeaderOffset(0);

            $records = iterator_to_array($csv->getRecords());

            $allRecords = array_merge($allRecords, $records);

            Log::debug("Parsed records", ['count' => count($records)]);
        }

        $filename = uniqid('csv_', true) . '.json';
        Storage::put("temp/{$filename}", json_encode($allRecords));

        Log::debug('All records stored', ['path' => "temp/{$filename}"]);

        return redirect()->route('index.csv', ['csv' => $filename]);
    }

    public function store(Request $request)
    {
        $data = $request->input('csvData');

        if (!is_array($data) || empty($data)) {
            return back()->withErrors(['message' => 'No valid data to save.']);
        }

        DB::beginTransaction();
        try {
            $headerMap = [
                'student id' => 'student_info_id',
                'semester' => 'semester',
                'year level' => 'year_level',
                'subject' => 'subject',
                'grade' => 'grade',
                'status' => 'status',
            ];

            $successCount = 0;
            foreach ($data as $entry) {
                $normalized = [];

                foreach ($entry as $key => $value) {
                    $key = strtolower(trim($key));
                    if (array_key_exists($key, $headerMap)) {
                        $normalized[$headerMap[$key]] = $value;
                    }
                }

                if (count($normalized) === count($headerMap)) {
                    Grades::create($normalized);
                    $successCount++;
                }
            }

            DB::commit();

            return back()->with([
                'csvData' => $data,
                'studentInfoIds' => Student_Info::pluck('student_id')->toArray(),
                'success' => "Successfully saved {$successCount} records",
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Grade save failed", ['error' => $e->getMessage()]);
            return back()->withErrors(['message' => 'Failed to save grades.']);
        }
    }

    public function grade() {
        return Inertia::render('Admin/Grades/SubmittedGrade');
    }
}

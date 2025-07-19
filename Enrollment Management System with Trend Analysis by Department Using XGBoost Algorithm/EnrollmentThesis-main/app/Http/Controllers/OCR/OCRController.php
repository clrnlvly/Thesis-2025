<?php

namespace App\Http\Controllers\OCR;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // For sending HTTP requests
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OCRController extends Controller
{
    public function index()
    {
        return Inertia::render("OCR/Camera");
    }

    // public function processOCR(Request $request)
    // {
    //     Log::info('OCR Request Received', ['request_data' => $request->all()]);

    //     // Get the base64 image data
    //     $imageData = $request->input('image');
        
    //     if (!$imageData) {
    //         Log::error('No image data received');
    //         return Inertia::render('Admin/Admission/CreateStudent', [
    //             'error' => 'No image data received',
    //         ]);
    //     }

    //     // Log to ensure the base64 string is received
    //     Log::info('Base64 Image Data:', ['image_data' => substr($imageData, 0, 100)]); // Logs first 100 chars

    //     // Remove data URL prefix if present
    //     if (strpos($imageData, 'data:image') === 0) {
    //         $imageData = preg_replace('#^data:image/\w+;base64,#i', '', $imageData);
    //         Log::info('Removed data URL prefix');
    //     }

    //     // Decode the base64 image data
    //     $image = base64_decode($imageData);
    //     if ($image === false) {
    //         Log::error('Failed to decode the image');
    //         return Inertia::render('Admin/Admission/CreateStudent', [
    //             'error' => 'Failed to decode the image',
    //         ]);
    //     }

    //     // Save to temporary file for OCR API
    //     $tempPath = storage_path('app/temp_image_'.time().'.png');
    //     if (!file_put_contents($tempPath, $image)) {
    //         Log::error('Failed to save temporary image');
    //         return Inertia::render('Admin/Admission/CreateStudent', [
    //             'error' => 'Failed to save temporary image',
    //         ]);
    //     }

    //     try {
    //         // Send image to OCR.space API
    //         $response = Http::attach(
    //             'file', file_get_contents($tempPath), 'image.png'
    //         )->post('https://api.ocr.space/parse/image', [
    //             'apikey' => 'K88091610488957', // Store in .env
    //             'language' => 'eng',
    //         ]);

    //         // Delete temp file
    //         @unlink($tempPath);

    //         if ($response->successful()) {
    //             $data = $response->json();
    //             Log::info('OCR Response', $data);
                
    //             if (isset($data['ParsedResults'][0]['ParsedText'])) {
    //                 return Inertia::render('Admin/Admission/CreateStudent', [
    //                     'text' => $data['ParsedResults'][0]['ParsedText'],
    //                 ]);
    //             }
                
    //             Log::error('No text found', ['response' => $data]);
    //             return Inertia::render('Admin/Admission/CreateStudent', [
    //                 'error' => 'No text found in image',
    //             ]);
    //         }

    //         Log::error('OCR API failed', ['status' => $response->status()]);
    //         return Inertia::render('Admin/Admission/CreateStudent', [
    //             'error' => 'OCR processing failed',
    //         ]);

    //     } catch (\Exception $e) {
    //         Log::error('OCR Exception', ['error' => $e->getMessage()]);
    //         return Inertia::render('Admin/Admission/CreateStudent', [
    //             'error' => 'OCR processing error',
    //         ]);
    //     }
    // }


}

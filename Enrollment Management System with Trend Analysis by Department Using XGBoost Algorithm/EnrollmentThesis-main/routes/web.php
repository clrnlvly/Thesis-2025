<?php

use App\Http\Controllers\Admin\AdminApplicationController;
use App\Http\Controllers\Admin\BillingController;
use App\Http\Controllers\Admin\CourseSelectionController;
use App\Http\Controllers\Admin\CSVController;
use App\Http\Controllers\Admin\CurriculumController;
use App\Http\Controllers\Admin\DisplayController;
use App\Http\Controllers\Admin\EmailController;
use App\Http\Controllers\Admin\EnrollmentConfirmationController;
use App\Http\Controllers\Admin\EnrollmentController;
use App\Http\Controllers\Admin\GeneralSettingController;
use App\Http\Controllers\Admin\GradesController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\UserManagement;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OCR\OCRController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Student\ApplicationController;
use App\Http\Controllers\Student\EvaluationController;
use App\Http\Controllers\Student\GeneralController;
use App\Http\Middleware\VerifyAdminIp;
use App\Models\Admin\GradeController;
use App\Models\AuditTrailCurriculum;
use App\Models\Campus;
use App\Models\FAQ;
use App\Models\Programs;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// use App\Http\Middleware\VerifyAdminIp;

// Route::middleware(['auth', 'verified', VerifyAdminIp::class])->group(function () {
//     Route::get('/admin/dashboard', [AdminController::class, 'index']);
// });


// Route::get('/', function () {
//     return Inertia::render('Dashboard', ['program'=>Programs::all()]);
//         for git
// });

Route::get('/', function () {
    $FAQ = FAQ::all();
    $campus = Campus::all();
    return Inertia::render('Public/LandingPage', ['FAQ'=>$FAQ, 'campus'=>$campus]);
})->name('home');

Route::prefix('dashboard/admin')->group(function () {
    Route::get('/enrollment', [DashboardController::class, 'enrollment'])->name('admin.dashboard.enrollment');
    Route::get('/audit-trail', [DashboardController::class, 'AuditTrail'])->name('admin.dashboard.audit-trail');
    Route::get('/billing', function () {
        return Inertia::render('Dashboard/Admin/Billing');
    })->name('admin.dashboard.billing');
});

Route::get('/profile',function () {
    return Inertia::render('Profile/Partials/Edit');
})->name('profile');

Route::get('/mail-send/{id}/approved', [EmailController::class, 'sendEmailSuccess'])->name('send.email');
Route::get('/mail-send/{id}/rejected', [EmailController::class, 'sendEmailRejected'])->name('send.email.rejected');
Route::get('/mail-send/{id}/onhold', [EmailController::class, 'sendEmailOnHold'])->name('send.email.onhold');

Route::get('/mail-send/{id}/payment/approved', [EmailController::class, 'sendEmailPaymentVerified'])->name('send.email.payment.verified');

Route::get('/mail-send/{users_id}/officialy-enrolled', [EmailController::class, 'sendEmailOfficiallyEnrolled'])->name('send.email.official-enroll');

Route::group([], function () {
    Route::get('/Error', function () {
        return Inertia::render('Error404');
    })->name('404');
    Route::get('/Success', function () {
        return Inertia::render('Success');
    })->name('200');
});

// public section / landing page
Route::group([], function () {
    Route::get('/FAQ', [PublicController::class, 'FAQ'])->name('landing-page.section.FAQ');
    Route::get('/application', [ApplicationController::class, 'index'])->name('landing-page.section.application');
    Route::post('/application', [ApplicationController::class, 'create'])->name('public.application.submit');
    Route::get('/application/payment', [PaymentController::class, 'index'])->name('public.payment.submit');
    Route::get('/tuition/details', [PublicController::class, 'tuitionDetails'])->name('public.payment.details');
    Route::get('/admission-guide', [PublicController::class, 'admissionGuide'])->name('public.admission.guide');
    Route::post('/private-file', [PaymentController::class, 'store'])->name('student.payment');
    Route::post('/private-file/{id}/update', [PaymentController::class, 'edit'])->name("admin.payment.update");
    Route::get('/private-files/{filename}', [PaymentController::class, 'showImage'])->name("admin.payment.showImage");
    Route::delete('/private-files/{id}/delete', [PaymentController::class, 'destroy'])->name("admin.payment.destroy");
    Route::get('/program/shs', [PublicController::class, 'shs'])->name('landing-page.section.SHS');
    Route::get('/program/college', [PublicController::class, 'college'])->name('landing-page.section.College');
    Route::get('/requirements', [PublicController::class, 'requirements'])->name('landing-page.section.Requirements');

});
Route::middleware('auth')->group(function () {

    // Student
    Route::get('/dashboard/personal-information', [GeneralController::class, 'personalInfo'])->name('student.personal.info');
    Route::get('/dashboard/documents', [GeneralController::class, 'documents'])->name('student.documents');
    Route::get('/dashboard/grades', [GeneralController::class, 'grades'])->name('student.grades');
    Route::get('/dashboard/enrollment', [GeneralController::class, 'enrollment'])->name('student.enrollment');
    Route::get('/dashboard/payment', [GeneralController::class, 'payment'])->name('student.payment.transaction');
    Route::get('/dashboard/payment/plan', [GeneralController::class, 'plan'])->name('student.payment.plan');
    Route::get('/dashboard/subjects', [GeneralController::class, 'subjects'])->name('student.subject');
    Route::get('/dashboard/student/schedule', [GeneralController::class, 'schedule'])->name('student.schedule');
    Route::get('/dashboard/student/evaluation', [GeneralController::class, 'evaluation'])->name('student.evaluation');
    Route::get('/dashboard/student/payment', [GeneralController::class, 'paymentForm'])->name('student.payment.form');

    Route::post('/student/enroll-next-term', [EnrollmentController::class, 'enrollNextTerm'])->name('enroll.next.term');

    // Professor

    //Admin
Route::get('help', function() {
        return Inertia::render('Admin/Help');
})->name('admin.help');
Route::get('admin/evaluation', [EvaluationController::class, 'indexAdmin'])->name('admin.evaluation');
Route::post('/evaluation', [EvaluationController::class, 'store']);
Route::get('/enrolled-student', [EnrollmentController::class, 'studentEnrolled'])->name('enrolled.student');

Route::prefix('/setting')->group(function () {
    Route::get('/', [GeneralSettingController::class, 'index'])->name('admin.setting.general');
    Route::prefix('general')->group(function ()  {
        Route::get('/academic-year', [GeneralSettingController::class, 'academicYear'])->name("admin.setting.general.academicYear");
        Route::post('/academic-year/store', [GeneralSettingController::class, 'academicYearStore'])->name("admin.setting.general.academicYear-store");
        Route::post('/academic-year/{id}/update', [GeneralSettingController::class, 'academicYearEdit'])->name("admin.setting.general.academicYear-update");
        Route::delete('/academic-year/{id}/delete', [GeneralSettingController::class, 'academicYearDestroy'])->name("admin.setting.general.academicYear-destroy");
       
        
        Route::post('/faq', [GeneralSettingController::class, 'faqStore'])->name("admin.setting.general.faq");
        Route::delete('/faq/{id}/delete', [GeneralSettingController::class, 'faqDestroy'])->name("admin.setting.general.faq-destroy");
        Route::post('/faq/{id}/update', [GeneralSettingController::class, 'faqEdit'])->name("admin.setting.general.faq-update");
    
        Route::post('/campus', [GeneralSettingController::class, 'campusStore'])->name("admin.setting.general.campus");
        Route::delete('/campus/{id}/delete', [GeneralSettingController::class, 'campusDestroy'])->name("admin.setting.general.campus-destroy");
        Route::post('/campus/{id}/update', [GeneralSettingController::class, 'campusEdit'])->name("admin.setting.general.campus-update");
    
        Route::post('/id-setup', [GeneralSettingController::class, 'idFormatStore'])->name("admin.setting.general.id-setup");
        Route::delete('/id-setup/{id}/delete', [GeneralSettingController::class, 'idFormatDestroy'])->name("admin.setting.general.id-destroy");
        Route::post('/id-setup/{id}/update', [GeneralSettingController::class, 'idFormatEdit'])->name("admin.setting.general.id-update");
    });
});
    
Route::prefix('/enrollment')->group(function () {
    Route::get('/', [EnrollmentController::class, 'index'])->name('admin.enrollment');
});

Route::prefix('admin/application')->group(function () {
    Route::get('/', [AdminApplicationController::class, 'index'])->name("admin.application");
    Route::get('/create', [AdminApplicationController::class, 'add'])->name("admin.application.create");
    Route::post('/create-student', [AdminApplicationController::class, 'createStudent'])->name("admin.application.createStudent");
    Route::delete('/student/{id}/delete', [AdminApplicationController::class, 'destroyStudent'])->name("admin.student.destroy");
    Route::post('/{id}/update', [AdminApplicationController::class, 'edit'])->name("admin.application.update");
    Route::get('/documents', [AdminApplicationController::class, 'indexDocuments'])->name("admin.documents");
    // Route::post('/document/{id}/update', [AdminApplicationController::class, 'updateDocuments'])->name("admin.documents.update");
    Route::post('/document/{student_info_id}/update', [AdminApplicationController::class, 'updateDocuments'])->name("admin.documents.haha");
   
    Route::delete('/document/{id}/delete', [AdminApplicationController::class, 'destroyDocuments'])->name("admin.documents.destroy");
    });
    Route::get('/course-selection', [CourseSelectionController::class, 'index'])->name('admin.course.selection');

Route::prefix('email')->group( function () {
    Route::get('/', [EmailController::class, 'index'])->name('admin.email');
});

Route::prefix('curriculum')->group(function () {
    Route::get("/", [CurriculumController::class, 'index'])->name('admin.curriculum');
});

Route::get('/program', [ProgramController::class, 'index'])->name("admin.program");
Route::post('/program/store', [ProgramController::class, 'store'])->name("admin.program.store");
Route::post('/program/store-from-excel', [ProgramController::class, 'storeFromExcel'])->name("admin.program.storeFromExcel");

Route::post('/program/{id}/update', [ProgramController::class, 'edit'])->name("admin.program.update");
Route::delete('/program/{id}/delete', [ProgramController::class, 'destroy'])->name("admin.program.destroy");


Route::get('/subject', [SubjectController::class, 'index'])->name("admin.subject");
Route::post('/subject/store', [SubjectController::class, 'store'])->name("admin.subject.store");

Route::post('/subject/store-from-excel', [SubjectController::class, 'storeFromExcel'])->name("admin.subject.storeFromExcel");

Route::post('/subject/{id}/update', [SubjectController::class, 'edit'])->name("admin.subject.update");
Route::delete('/subject/{id}/delete', [SubjectController::class, 'destroy'])->name("admin.subject.destroy");
Route::post('/subject/assigned', [CourseSelectionController::class, 'store'])->name('admin.course-section.add');


Route::get('/section', [SectionController::class, 'index'])->name("admin.section");
Route::post('/section/store', [SectionController::class, 'store'])->name("admin.section.store");
Route::post('/section/schedule/store', [SectionController::class, 'storeSchedule'])->name("admin.schedule.store");
Route::post('/section/{id}/update', [SectionController::class, 'updateSection'])->name("admin.section.update");
Route::post('/schedule/{id}/update', [SectionController::class, 'editSchedule'])->name("admin.schedule.update");
Route::delete('/section/{id}/delete', [SectionController::class, 'destroy'])->name("admin.section.destroy");

Route::get('/user-management', [UserManagement::class, 'index'])->name('admin.user.management');
Route::get('/user-management/create', [UserManagement::class, 'createUser'])->name('admin.user.management.create');
Route::post('/user-management{id}//update', [UserManagement::class, 'update'])->name('admin.user.management.update');
Route::delete('/user-management/{id}/delete', [UserManagement::class, 'destroyUser'])->name('admin.user.management.destroy');

Route::prefix('billing')->group(function () {
    Route::get('/', [BillingController::class, 'index'])->name('admin.billing');
    Route::post('/store/other-billing', [BillingController::class, 'storeOtherBilling'])->name("admin.billing.storeOther");
    Route::post('/store/shs-billing', [BillingController::class, 'storeSHSBilling'])->name("admin.billing.storeSHS");
    Route::post('/store/college-billing', [BillingController::class, 'storeCollegeBilling'])->name("admin.billing.storeCollege");
    Route::get('/payment', [PaymentController::class, 'indexPayment'])->name("admin.payment");
    Route::post('/store/payment-details', [PaymentController::class, 'storePaymentDetails'])->name('admin.payment.storeDetails');
    Route::get('/assign-payment', [PaymentController::class, 'indexAssignFee'])->name('admin.assign-fee.index');

    Route::post('/shs-fee/{id}/update', [BillingController::class, 'editSHSFee'])->name("admin.shsfee.update");
    Route::delete('/shs-fee/{id}/delete', [BillingController::class, 'destroySHSFee'])->name("admin.shsfee.destroy");
    Route::post('/college-fee/{id}/update', [BillingController::class, 'editCollegeFee'])->name("admin.collegefee.update");
    Route::delete('/college-fee/{id}/delete', [BillingController::class, 'destroyCollegeFee'])->name("admin.collegefee.destroy");
    Route::post('/other-fee/{id}/update', [BillingController::class, 'editOtherFee'])->name("admin.otherfee.update");
    Route::delete('/other-fee/{id}/delete', [BillingController::class, 'destroyOtherFee'])->name("admin.otherfee.destroy");

    Route::get('payment-list',[PaymentController::class, 'paymentIndex'])->name('admin.payment.list');
});

Route::get('enrollment/final-step', [EnrollmentConfirmationController::class, 'index'])->name('enrollment.final.step');
Route::post('enrollment/assign-section', [EnrollmentConfirmationController::class, 'insertStudentSection'])->name('enrollment.insert.section');

Route::prefix('grades')->group(function () {
    Route::get('/', [GradesController::class, 'index'])->name('upload.grades');
    Route::post('/grade/edit-request', [GradesController::class, 'editRequest'])->name('prof.request.edit.grade');
    Route::post('/store-from-excel', [GradesController::class, 'storeFromExcel'])->name("admin.grades.storeFromExcel");
    Route::post('/admin/grades/update-status/{id}', [GradesController::class, 'updateGradeStatus'])->name("update.grade.status");;
    Route::get('/submitted-professor-grade', [GradesController::class, 'submittedGradeProfessor'])->name('index.submitted.grade.professor');
    Route::get('/submitted-admin-grade', [GradesController::class, 'submittedGradeAdmin'])->name('index.submitted.grade.admin');
    Route::get('/change-admin-grade', [GradesController::class, 'changeGradeAdmin'])->name('index.change.grade.admin');
    Route::get('/change-prof-grade', [GradesController::class, 'changeGradeProf'])->name('index.change.grade.professor');
    Route::post('/display-settings/grade-sidebar', [DisplayController::class, 'toggleGradeSidebar'])->name('toggle.grade.sidebar');
    Route::post('/create', [GradesController::class, 'store'])->name('grades.admin.store');
    Route::delete('/{id}', [GradesController::class, 'deleteGrades'])->name('grades.delete');
    Route::put('/{grade}', [GradesController::class, 'update'])->name('grades.update');

    // Route::get('/csv', [CSVController::class, 'index'])->name('index.csv');
    // Route::post('/upload-csv', [CSVController::class, 'upload'])->name('upload.csv');
    // Route::post('/store', [CSVController::class, 'store'])->name('grades.store');
    Route::post('/upload-csv-bulk', [CSVController::class, 'bulkUpload'])->name('upload.csv.bulk');
    Route::get('/csv', [CSVController::class, 'index'])->name('index.csv');
    Route::post('/csv/store', [CSVController::class, 'store'])->name('grades.store');
    // Route::get('/submitted-grade', [CSVController::class, 'grade'])->name('index.submitted.grade');
});

Route::prefix('display')->group(function () {
    Route::get('/display', [DisplayController::class, 'index'])->name('index.display');
    Route::post('/display/update', [DisplayController::class, 'updateDisplay'])->name('display.update');
});

Route::prefix('OCR')->group(function () {
    Route::get('/',[OCRController::class, 'index'])->name('ocr');
    // Route::post('/process-ocr', [OCRController::class, 'processOCR'])->name('process.ocr');
});

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');    
});

require __DIR__.'/auth.php';

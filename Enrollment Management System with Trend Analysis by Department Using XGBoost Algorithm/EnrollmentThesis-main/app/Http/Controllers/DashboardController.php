<?php

namespace App\Http\Controllers;

use App\Models\AuditTrailCurriculum;
use App\Models\AuditTrailEnrollment;
use App\Models\AuditTrailStudent;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Programs;
use App\Models\Student_Info;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user(); 

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please login to access the dashboard.');
        }

        $adminCount = $this->getUserCount(['super admin', 'accounting', 'registrar']);
        $professorCount = $this->getUserCount(['professor']);
        $studentCount = $this->getUserCount(['student']);
        $shsCount = $this->getProgramCount('SHS');
        $collegeCount = $this->getProgramCount('College');
        $preEnrolledCount = $this->getPreEnrolledCount();
        $shsEnrolledCount = $this->getEnrolledCountByDepartment('SHS');
        $collegeEnrolledCount = $this->getEnrolledCountByDepartment('College');

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'adminCount' => $adminCount,
            'professorCount' => $professorCount,
            'studentCount' => $studentCount,
            'shsCount' => $shsCount,
            'collegeCount' => $collegeCount,
            'preEnrolledCount' => $preEnrolledCount,
            'shsEnrolledCount' => $shsEnrolledCount,
            'collegeEnrolledCount' => $collegeEnrolledCount
        ]);
    }

    public function enrollment()
    {
        $shsEnrolledCount = $this->getEnrolledCountByDepartment('SHS');
        $collegeEnrolledCount = $this->getEnrolledCountByDepartment('College');
        $studentEnrolled = $this->getLatestEnrolledStudents();

        return Inertia::render('Dashboard/Admin/Enrollment', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'shsEnrolledCount' => $shsEnrolledCount,
            'collegeEnrolledCount' => $collegeEnrolledCount,
            'studentEnrolled' => $studentEnrolled
        ]);
    }


    private function getUserCount(array $roles)
    {
        return User::whereIn('role', $roles)->count();
    }

    private function getProgramCount(string $department)
    {
        return Programs::where('department', $department)->count();
    }

    private function getPreEnrolledCount()
    {
        return Student_Info::whereIn('status', ['pending', 'onhold'])->count();
    }

    private function getEnrolledCountByDepartment(string $department)
    {
        return Student_Info::where('status', 'enrolled')
                ->where('department', $department)
                ->selectRaw('DATE(created_at) as date, count(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();
    }

    private function getLatestEnrolledStudents()
    {
        return Student_Info::orderBy('created_at', 'desc')
                            ->orderBy('id', 'desc')
                            ->take(20) 
                            ->get();
    }

    public function AuditTrail(Request $request) {
        
        $curriculumAuditTrail = AuditTrailCurriculum::orderBy('created_at', 'desc')->take(50)->get();
        $enrollmentAuditTrail = AuditTrailEnrollment::orderBy('created_at', 'desc')->take(50)->get();
        $studentAuditTrail = AuditTrailStudent::orderBy('created_at', 'desc')->take(50)->get();
      
        $curriculumAuditTrail = $curriculumAuditTrail->map(function ($item) {
            $user = User::find($item->user);
            $item->user_name = $user ? $user->name : 'Unknown';
            $item->user_role = $user ? $user->role : 'Unknown';
            return $item;
        });
    
        $enrollmentAuditTrail = $enrollmentAuditTrail->map(function ($item) {
            $user = User::find($item->user);
            $item->user_name = $user ? $user->name : 'Unknown';
            $item->user_role = $user ? $user->role : 'Unknown';
            return $item;
        });
    
        $studentAuditTrail = $studentAuditTrail->map(function ($item) {
            $user = User::find($item->user);
            $item->user_name = $user ? $user->name : 'Unknown';
            $item->user_role = $user ? $user->role : 'Unknown';
            return $item;
        });
    
        return Inertia::render('Dashboard/Admin/AuditTrail', [
            'curriculum_audit_trail' => $curriculumAuditTrail,
            'enrollment_audit_trail' => $enrollmentAuditTrail,
            'student_audit_trail' => $studentAuditTrail,
        ]);
    }
    
    
    
}

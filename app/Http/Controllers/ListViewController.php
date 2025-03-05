<?php

namespace App\Http\Controllers;

use App\Models\ContractType;
use App\Models\Employee;
use App\Models\JobTitle;
use App\Models\WorkShift;
use Illuminate\Http\Request;

class ListViewController extends Controller
{
    /**
     * Return the list of employees as JSON.
     */
    public function employee()
    {
        $employees = Employee::all(); // O paginate si querés: Employee::paginate(10);
        return response()->json($employees);
    }

    /**
     * Return the list of contract types as JSON.
     */
    public function contract_types()
    {
        $contractTypes = ContractType::all(); // O paginate si querés: ContractType::paginate(10);
        return response()->json($contractTypes);
    }

    public function job_titles()
    {
        $jobTitles = JobTitle::all();
        return response()->json($jobTitles);
    }

    public function work_shifts()
    {
        $workShifts = WorkShift::all();
        return response()->json($workShifts);
    }
}

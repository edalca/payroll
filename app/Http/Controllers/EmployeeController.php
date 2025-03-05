<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $employees = Employee::all(); // O podrías paginar con Employee::paginate(10);
        return Inertia::render('employee/index', [
            "data" => $employees
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('employee/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type_document' => 'required|string|max:50',
            'code' => 'required|string|max:50|unique:employees,code',
            'id_number' => 'required|string|max:20|unique:employees,id_number',
            'nit' => 'nullable|string|max:20',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'birth_date' => 'required|date',
            'address' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'nullable|string|email|max:100|unique:employees,email',
            'sex' => 'required|string|in:Masculino,Femenino',
            'nationality_id' => 'required|exists:countries,id',
            'country_id' => 'required|exists:countries,id',
            'marital_status_id' => 'required|exists:marital_statuses,id',
        ]);

        Employee::create($validatedData);

        return redirect()->route('employee')->with('success', 'Empleado creado exitosamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee): Response
    {
        return Inertia::render('employee/edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validatedData = $request->validate([
            'type_document' => 'required|string|max:50',
            'code' => 'required|string|max:50|unique:employees,code,' . $employee->id,
            'id_number' => 'required|string|max:20|unique:employees,id_number,' . $employee->id,
            'nit' => 'nullable|string|max:20',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'birth_date' => 'required|date',
            'address' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'nullable|string|email|max:100|unique:employees,email,' . $employee->id,
            'sex' => 'required|string|in:Masculino,Femenino',
            'nationality_id' => 'required|exists:countries,id',
            'country_id' => 'required|exists:countries,id',
            'marital_status_id' => 'required|exists:marital_statuses,id',
        ]);

        $employee->update($validatedData);

        return redirect()->route('employees.index')->with('success', 'Empleado actualizado exitosamente.');
    }
}

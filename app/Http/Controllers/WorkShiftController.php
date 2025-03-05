<?php

namespace App\Http\Controllers;

use App\Models\WorkShift;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkShiftController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('work_shifts/index', ["data" => WorkShift::all()]);
    }

    public function create(): Response
    {
        return Inertia::render('work_shifts/create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:255|unique:work_shifts,code',
            'name' => 'required|string|max:255|unique:work_shifts,name',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        WorkShift::create($validatedData);

        return redirect()->route('work_shifts')->with('success', 'Turno de trabajo creado exitosamente.');
    }

    public function edit(WorkShift $workShift): Response
    {
        return Inertia::render('work_shifts/edit', [
            'workShift' => $workShift,
            'action' => 'Edit',
        ]);
    }

    public function update(Request $request, WorkShift $workShift)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:255|unique:work_shifts,code,' . $workShift->id,
            'name' => 'required|string|max:255|unique:work_shifts,name,' . $workShift->id,
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $workShift->update($validatedData);

        return redirect()->route('work_shifts')->with('success', 'Turno de trabajo actualizado exitosamente.');
    }
}

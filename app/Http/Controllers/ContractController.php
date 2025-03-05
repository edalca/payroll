<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('contracts/index', [
            "data" => Contract::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('contracts/create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:255|unique:contracts,code',
            'employee_id' => 'required|exists:employees,id',
            'contract_type_id' => 'required|exists:contract_types,id',
            'job_title_id' => 'required|exists:job_titles,id',
            'work_shift_id' => 'required|exists:work_shifts,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'salary' => 'required|numeric|min:0',
        ]);

        Contract::create($validatedData);

        return redirect()->route('contracts')->with('success', 'Contrato creado exitosamente.');
    }

    public function edit(Contract $contract): Response
    {
        return Inertia::render('contracts/edit', [
            'contract' => $contract,
            'action' => 'Edit',
        ]);
    }

    public function update(Request $request, Contract $contract)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:255|unique:contracts,code,' . $contract->id,
            'employee_id' => 'required|exists:employees,id',
            'contract_type_id' => 'required|exists:contract_types,id',
            'job_title_id' => 'required|exists:job_titles,id',
            'work_shift_id' => 'required|exists:work_shifts,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'salary' => 'required|numeric|min:0',
        ]);

        $contract->update($validatedData);

        return redirect()->route('contracts')->with('success', 'Contrato actualizado exitosamente.');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\ContractType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContractTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $contractTypes = ContractType::all(); // O paginate si querés: ContractType::paginate(10);
        return Inertia::render('contract_types/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('contract_types/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:50|unique:contract_types,code',
            'name' => 'required|string|max:255|unique:contract_types,name',
            'description' => 'required|string|max:255',
        ]);

        ContractType::create($validatedData);

        return redirect()->route('contract_types')->with('success', 'Tipo de contrato creado exitosamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContractType $contractType): Response
    {
        return Inertia::render('contract_types/edit', [
            'contractType' => $contractType,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContractType $contractType)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:50|unique:contract_types,code,' . $contractType->id,
            'name' => 'required|string|max:255|unique:contract_types,name,' . $contractType->id,
            'description' => 'required|string|max:255',
        ]);

        $contractType->update($validatedData);

        return redirect()->route('contract_types')->with('success', 'Tipo de contrato actualizado exitosamente.');
    }
}

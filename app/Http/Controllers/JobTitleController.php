<?php

namespace App\Http\Controllers;

use App\Models\JobTitle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobTitleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('job_titles/index', ["data" => JobTitle::all()]);
    }

    public function create(): Response
    {
        return Inertia::render('job_titles/create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:job_titles,name',
        ]);

        JobTitle::create($validatedData);

        return redirect()->route('job_titles')->with('success', 'Título de trabajo creado exitosamente.');
    }

    public function edit(JobTitle $jobTitle): Response
    {
        return Inertia::render('job_titles/edit', [
            'jobTitle' => $jobTitle,
            'action' => 'Edit',
        ]);
    }

    public function update(Request $request, JobTitle $jobTitle)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:job_titles,name,' . $jobTitle->id,
        ]);

        $jobTitle->update($validatedData);

        return redirect()->route('job_titles')->with('success', 'Título de trabajo actualizado exitosamente.');
    }
}

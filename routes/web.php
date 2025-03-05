<?php

use App\Http\Controllers\APIController;
use App\Http\Controllers\ContractTypeController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\JobTitleController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\ListViewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkShiftController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index');
})->middleware(["auth", "verified"])->name('index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::controller(EmployeeController::class)->prefix("employee")->group(function () {
        Route::get("/", "index")->name("employee");
        Route::get("/create", "create")->name("employee.create");
        Route::post("/store", "store")->name("employee.store");
        Route::get("/{employee}/edit", "edit")->name("employee.edit");
        Route::put("/{employee}", "update")->name("employee.update");
    });

    Route::controller(ContractTypeController::class)->prefix("contract_types")->group(function () {
        Route::get("/", "index")->name("contract_types");
        Route::get("/create", "create")->name("contract_types.create");
        Route::post("/store", "store")->name("contract_types.store");
        Route::get("/{contractType}/edit", "edit")->name("contract_types.edit");
        Route::put("/{contractType}", "update")->name("contract_types.update");
    });

    Route::controller(JobTitleController::class)->prefix("job_titles")->group(function () {
        Route::get("/", "index")->name("job_titles");
        Route::get("/create", "create")->name("job_titles.create");
        Route::post("/store", "store")->name("job_titles.store");
        Route::get("/{jobTitle}/edit", "edit")->name("job_titles.edit");
        Route::put("/{jobTitle}", "update")->name("job_titles.update");
    });

    Route::controller(WorkShiftController::class)->prefix("work_shifts")->group(function () {
        Route::get("/", "index")->name("work_shifts");
        Route::get("/create", "create")->name("work_shifts.create");
        Route::post("/store", "store")->name("work_shifts.store");
        Route::get("/{workShift}/edit", "edit")->name("work_shifts.edit");
        Route::put("/{workShift}", "update")->name("work_shifts.update");
    });

    //Controller Link
    Route::controller(LinkController::class)->prefix("link")->group(function () {
        Route::get("/country", "country")->name("link.country");
        Route::get("/marital_status", "marital_status")->name("link.marital_status");
    });

    Route::controller(ListViewController::class)->prefix("listview")->group(function () {
        Route::get("/employee", "employee")->name("listview.employee");
        Route::get("/contract_types","contract_types")->name("listview.contract_types");
        Route::get("/job_titles", "job_titles")->name("listview.job_titles");
        Route::get("/work_shifts", "work_shifts")->name("listview.work_shifts");
    });
});
require __DIR__ . '/auth.php';

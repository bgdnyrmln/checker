<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanyUser;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'date' => 'required|date',
            'content' => 'required|string|max:1000',
        ]);

        $announcement = Announcement::create($data);

        return response()->json($announcement, 201);
    }



    public function index(Request $request)
    {
        $data = $request->validate([
            'company_id' => 'required|exists:companies,id',
        ]);

        $announcements = Announcement::where('company_id', $data['company_id'])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($announcements);
    }

}

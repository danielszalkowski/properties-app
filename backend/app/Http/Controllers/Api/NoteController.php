<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Resources\NoteResource;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $query = Note::query();
        if ($q = $request->input('q')) {
            $query->where('title', 'like', "%{$q}%");
        }
        return NoteResource::collection($query->orderBy('created_at', 'desc')->paginate(10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['title' => 'required', 'content' => 'nullable']);
        $note = Note::create($validated);
        return new NoteResource($note);
    }

    public function show(Note $note)
    {
        return new NoteResource($note);
    }

    public function update(Request $request, Note $note)
    {
        $validated = $request->validate(['title' => 'required', 'content' => 'nullable']);
        $note->update($validated);
        return new NoteResource($note);
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return response()->noContent();
    }
}
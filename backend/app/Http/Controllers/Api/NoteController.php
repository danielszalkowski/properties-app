<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Resources\NoteResource;

class NoteController extends Controller
{
    /**
     * GET /api/notes?q=
     */
    public function index(Request $request)
    {
        $query = Note::query();

        if ($q = $request->input('q')) {
            $query->where('title', 'like', "%{$q}%");
        }

        $notes = $query->orderBy('created_at', 'desc')->paginate(10);

        return NoteResource::collection($notes);
    }

    /**
     * POST /api/notes
     */
    public function store(StoreNoteRequest $request)
    {
        $note = Note::create($request->validated());

        return (new NoteResource($note))->response()->setStatusCode(201);
    }

    /**
     * GET /api/notes/{id}
     */
    public function show(Note $note)
    {
        return new NoteResource($note);
    }

    /**
     * PUT /api/notes/{id}
     */
    public function update(UpdateNoteRequest $request, Note $note)
    {
        $note->update($request->validated());

        return new NoteResource($note);
    }

    /**
     * DELETE /api/notes/{id}
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->noContent();
    }
}

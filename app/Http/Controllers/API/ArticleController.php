<?php

namespace App\Http\Controllers\API;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends BaseController
{
    public function index(): JsonResponse
    {
        $articles = Article::all();
        return $this->sendResponse($articles, 'Articles retrieved successfully.', 201);
    }

    public function store(Request $request): JsonResponse 
    {
        $request->validate([
            'image' => 'nullable|url',
            'title' => 'required|string',
            'link' => 'required|url',
            'date' => 'required|date',
            'content' => 'required|string',
            'status' => 'required|in:For Edit,Published',
            'writer_id' => 'required|exists:users,id',
            'editor_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $article = Article::create($request->all());

        return $this->sendResponse($article, 'Article created successfully.', 201);
    }

    public function show(Article $article): JsonResponse
    {
        return $this->sendResponse($article, 'Article retrieved successfully.', 201);
    }

    public function update(Request $request, Article $article): JsonResponse 
    {
        $request->validate([
            'image' => 'nullable|url',
            'title' => 'required|string',
            'link' => 'required|url',
            'date' => 'required|date',
            'content' => 'required|string',
            'status' => 'required|in:For Edit,Published',
            'writer_id' => 'required|exists:users,id',
            'editor_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $article->update($request->all());

        return $this->sendResponse($article, 'Article updated successfully.');
    }

    public function destroy(Article $article): JsonResponse 
    {
        $article->delete();

        return $this->sendResponse(null, 'Article deleted successfully.', 204);
    }

}

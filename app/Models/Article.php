<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *    schema="Article",
 *    type="object",
 *    title="Article",
 *    description="Article model",
 *    required={"image","title","link","date","content","status","writer_id","editor_id","company_id"},
 *    @OA\Property(property="id", type="integer", example="1"),
 *    @OA\Property(property="image", type="string", example="image"),
 *    @OA\Property(property="title", type="string", example="title"),
 *    @OA\Property(property="link", type="string", example="link"),
 *    @OA\Property(property="date", type="string", format="date", example="2021-09-01"),
 *    @OA\Property(property="content", type="string", example="content"),
 *    @OA\Property(property="status", type="string", example="status"),
 *    @OA\Property(property="writer_id", type="integer", example="1"),
 *    @OA\Property(property="editor_id", type="integer", example="1"),
 *    @OA\Property(property="company_id", type="integer", example="1"),
 *    @OA\Property(property="created_at", type="string", format="date-time", example="2021-09-01T00:00:00.000000Z"),
 *    @OA\Property(property="updated_at", type="string", format="date-time", example="2021-09-01T00:00:00.000000Z"),
 * )
*/ 
class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'title',
        'link',
        'date',
        'content',
        'status',
        'writer_id',
        'editor_id',
        'company_id',
    ];

    public function writer()
    {
        return $this->belongsTo(User::class, 'writer_id');
    }

    public function editor()
    { 
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (int|string $value) => date('d-m-Y H:i:s A', strtotime($value)),
        );
    }
}


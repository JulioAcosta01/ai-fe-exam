<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 *   schema="Company",
 *   type="object",
 *   title="Company",
 *   description="Company model",
 *   required={"logo","name","status"},
 *   @OA\Property(property="id", type="integer", example="1"),
 *   @OA\Property(property="logo", type="string", example="logo"),
 *   @OA\Property(property="name", type="string", example="name"),
 *   @OA\Property(property="status", type="string", example="status"),
 *   @OA\Property(property="created_at", type="string", format="date-time", example="2021-09-01T00:00:00.000000Z"),
 *   @OA\Property(property="updated_at", type="string", format="date-time", example="2021-09-01T00:00:00.000000Z"),
 * ) 
 */
class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo',
        'name',
        'status',
    ];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

}

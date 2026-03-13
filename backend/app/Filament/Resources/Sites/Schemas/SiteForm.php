<?php

namespace App\Filament\Resources\Sites\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SiteForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('domain')
                    ->required()
                    ->unique(ignoreRecord: true),
                Select::make('type')
                    ->options([
                        'Product Site' => 'Product Site',
                        'Review Site'  => 'Review Site',
                    ])
                    ->required(),
                Select::make('template_id')
                    ->relationship('template', 'name')
                    ->searchable()
                    ->preload(),
                Select::make('status')
                    ->options([
                        'Active'   => 'Active',
                        'Draft'    => 'Draft',
                        'Archived' => 'Archived',
                    ])
                    ->default('Draft'),
                TextInput::make('primary_product')
                    ->label('Primary Product')
                    ->maxLength(255),
                TextInput::make('language')
                    ->default('EN')
                    ->maxLength(5),
                TextInput::make('pages_count')
                    ->numeric()->default(0),
                TextInput::make('posts_count')
                    ->numeric()->default(0),
                TextInput::make('reviews_count')
                    ->numeric()->default(0),
            ]);
    }
}

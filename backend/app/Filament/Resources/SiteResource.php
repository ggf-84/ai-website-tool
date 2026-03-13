<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteResource\Pages;
use App\Models\Site;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Resources\Table;

class SiteResource extends Resource
{
    protected static ?string $model = Site::class;

    protected static ?string $navigationIcon = 'heroicon-o-globe-alt';
    protected static ?string $navigationLabel = 'Sites';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('domain')
                ->required()
                ->unique(ignoreRecord: true),

            Forms\Components\Select::make('type')
                ->options([
                    'Product Site' => 'Product Site',
                    'Review Site'  => 'Review Site',
                ])
                ->required(),

            Forms\Components\Select::make('template_id')
                ->relationship('template', 'name')
                ->searchable()
                ->preload(),

            Forms\Components\Select::make('status')
                ->options([
                    'Active'   => 'Active',
                    'Draft'    => 'Draft',
                    'Archived' => 'Archived',
                ])
                ->default('Draft'),

            Forms\Components\TextInput::make('primary_product')
                ->label('Primary Product')
                ->maxLength(255),

            Forms\Components\TextInput::make('language')
                ->default('EN')
                ->maxLength(5),

            Forms\Components\TextInput::make('pages_count')
                ->numeric()->default(0),

            Forms\Components\TextInput::make('posts_count')
                ->numeric()->default(0),

            Forms\Components\TextInput::make('reviews_count')
                ->numeric()->default(0),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('domain')
                    ->searchable(),

                Tables\Columns\BadgeColumn::make('type'),

                Tables\Columns\BadgeColumn::make('status'),

                Tables\Columns\TextColumn::make('template.name')
                    ->label('Template'),

                Tables\Columns\TextColumn::make('pages_count')->label('Pages'),
                Tables\Columns\TextColumn::make('posts_count')->label('Articles'),
                Tables\Columns\TextColumn::make('reviews_count')->label('Reviews'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->label('Updated'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'Product Site' => 'Product Site',
                        'Review Site'  => 'Review Site',
                    ]),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'Active'   => 'Active',
                        'Draft'    => 'Draft',
                        'Archived' => 'Archived',
                    ]),
            ])
            ->actions([
                EditAction::make(),
                ViewAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListSites::route('/'),
            'create' => Pages\CreateSite::route('/create'),
            'edit'   => Pages\EditSite::route('/{record}/edit'),
        ];
    }
}

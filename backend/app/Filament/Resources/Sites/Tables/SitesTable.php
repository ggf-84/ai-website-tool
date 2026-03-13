<?php

namespace App\Filament\Resources\Sites\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SitesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('domain')
                    ->searchable(),
                BadgeColumn::make('type'),
                BadgeColumn::make('status'),
                TextColumn::make('template.name')
                    ->label('Template'),
                TextColumn::make('pages_count')->label('Pages'),
                TextColumn::make('posts_count')->label('Articles'),
                TextColumn::make('reviews_count')->label('Reviews'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->label('Updated'),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->options([
                        'Product Site' => 'Product Site',
                        'Review Site'  => 'Review Site',
                    ]),
                SelectFilter::make('status')
                    ->options([
                        'Active'   => 'Active',
                        'Draft'    => 'Draft',
                        'Archived' => 'Archived',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}

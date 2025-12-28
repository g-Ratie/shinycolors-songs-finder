"use client";

import type { SongWithRelations } from "@/lib/types/database";

interface SongListProps {
  songs: SongWithRelations[];
}

const attributeColors = {
  stella: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  luna: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  sol: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export function SongList({ songs }: SongListProps) {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        該当する楽曲がありません
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {songs.length}件の楽曲
      </div>
      <div className="grid gap-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {song.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{song.unit.name}</span>
                  {song.member && (
                    <>
                      <span>/</span>
                      <span>{song.member.name}</span>
                    </>
                  )}
                  {song.attribute && (
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${attributeColors[song.attribute]}`}
                    >
                      {song.attribute.charAt(0).toUpperCase() +
                        song.attribute.slice(1)}
                    </span>
                  )}
                </div>
                {song.vibe_tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {song.vibe_tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {song.youtube_url && (
                <a
                  href={song.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

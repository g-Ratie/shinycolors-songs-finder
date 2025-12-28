"use client";

import Image from "next/image";
import type { SongWithRelations } from "@/lib/types/database";
import { extractVideoId, getThumbnailUrl } from "@/lib/youtube";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => {
          const videoId = song.youtube_url
            ? extractVideoId(song.youtube_url)
            : null;
          const thumbnailUrl = videoId ? getThumbnailUrl(videoId, "mq") : null;

          return (
            <a
              key={song.id}
              href={song.youtube_url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors ${
                song.youtube_url
                  ? "hover:border-red-400 dark:hover:border-red-500 cursor-pointer"
                  : "cursor-default"
              }`}
            >
              {thumbnailUrl && (
                <div className="relative aspect-video">
                  <Image
                    src={thumbnailUrl}
                    alt={song.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {song.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <span>{song.unit.name}</span>
                  {song.member && (
                    <>
                      <span>/</span>
                      <span>{song.member.name}</span>
                    </>
                  )}
                  {song.attribute && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-xs font-medium ${attributeColors[song.attribute]}`}
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
                        className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import type { SongType, AttributeType } from "@/lib/types/database";

interface SongInput {
  title: string;
  unit_id: string;
  member_id: string | null;
  song_type: SongType;
  attribute: AttributeType | null;
  youtube_url: string;
  vibe_tag_ids: string[];
}

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function createSong(input: SongInput): Promise<ActionResult> {
  const { vibe_tag_ids, ...songData } = input;

  const { data: song, error: songError } = await supabase
    .from("songs")
    .insert(songData)
    .select("id")
    .single();

  if (songError) {
    console.error("Failed to create song:", songError);
    return { success: false, error: "楽曲の作成に失敗しました" };
  }

  if (vibe_tag_ids.length > 0) {
    const { error: tagError } = await supabase.from("song_vibe_tags").insert(
      vibe_tag_ids.map((tag_id) => ({
        song_id: song.id,
        vibe_tag_id: tag_id,
      }))
    );

    if (tagError) {
      console.error("Failed to add vibe tags:", tagError);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/songs");

  return { success: true };
}

export async function updateSong(
  id: string,
  input: SongInput
): Promise<ActionResult> {
  const { vibe_tag_ids, ...songData } = input;

  const { error: songError } = await supabase
    .from("songs")
    .update(songData)
    .eq("id", id);

  if (songError) {
    console.error("Failed to update song:", songError);
    return { success: false, error: "楽曲の更新に失敗しました" };
  }

  // タグを一度削除して再追加
  await supabase.from("song_vibe_tags").delete().eq("song_id", id);

  if (vibe_tag_ids.length > 0) {
    const { error: tagError } = await supabase.from("song_vibe_tags").insert(
      vibe_tag_ids.map((tag_id) => ({
        song_id: id,
        vibe_tag_id: tag_id,
      }))
    );

    if (tagError) {
      console.error("Failed to add vibe tags:", tagError);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/songs");

  return { success: true };
}

export async function deleteSong(id: string): Promise<ActionResult> {
  // 先にタグの紐付けを削除
  await supabase.from("song_vibe_tags").delete().eq("song_id", id);

  const { error } = await supabase.from("songs").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete song:", error);
    return { success: false, error: "楽曲の削除に失敗しました" };
  }

  revalidatePath("/");
  revalidatePath("/admin/songs");

  return { success: true };
}

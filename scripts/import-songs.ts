import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import songs from "../data/fujiwarahaji_songs.json";

config({ path: ".env.local.prod" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importSongs() {
  // 既存データを全削除
  console.log("Deleting existing songs...");
  const { error: deleteError } = await supabase
    .from("songs")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // 全削除のためのダミー条件

  if (deleteError) {
    console.error("Delete error:", deleteError);
    process.exit(1);
  }

  // song_id昇順でソート
  const sortedSongs = [...songs].sort(
    (a: { song_id: number }, b: { song_id: number }) => a.song_id - b.song_id
  );

  const songData = sortedSongs.map((song: { name: string }) => ({
    title: song.name,
  }));

  console.log(`Importing ${songData.length} songs (sorted by song_id)...`);

  const { data, error } = await supabase
    .from("songs")
    .insert(songData)
    .select("id, title");

  if (error) {
    console.error("Error:", error);
    process.exit(1);
  }

  console.log(`Successfully imported ${data.length} songs`);
}

importSongs();

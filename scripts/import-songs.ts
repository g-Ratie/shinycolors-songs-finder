import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import songs from "../data/fujiwarahaji_songs.json";

config({ path: ".env.local.prod" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importSongs() {
  const songData = songs.map((song: { name: string }) => ({
    title: song.name,
  }));

  console.log(`Importing ${songData.length} songs...`);

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

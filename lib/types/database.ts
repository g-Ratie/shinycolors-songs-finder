export type SongType = "unit" | "solo" | "collaboration" | "other";
export type AttributeType = "stella" | "luna" | "sol";

export interface Unit {
  id: string;
  name: string;
  slug: string;
}

export interface Member {
  id: string;
  name: string;
  unit_id: string;
  sort_order: number;
  unit?: Unit;
}

export interface VibeTag {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface Song {
  id: string;
  title: string;
  unit_id: string;
  member_id: string | null;
  song_type: SongType;
  attribute: AttributeType | null;
  youtube_url: string | null;
  links: Record<string, string>;
  created_at: string;
  updated_at: string;
  unit?: Unit;
  member?: Member;
  vibe_tags?: VibeTag[];
}

export interface SongWithRelations extends Song {
  unit: Unit;
  member: Member | null;
  vibe_tags: VibeTag[];
}

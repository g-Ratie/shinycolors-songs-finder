export type SongType = "unit" | "solo" | "collaboration" | "other";
export type AttributeType = "stella" | "luna" | "sol";

export interface Unit {
  id: string;
  name: string;
  slug: string;
}

export interface MemberUnit {
  member_id: string;
  unit_id: string;
  is_primary: boolean;
  unit?: Unit;
}

export interface Member {
  id: string;
  name: string;
  sort_order: number;
  member_units?: MemberUnit[];
  units?: Unit[];
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
  youtube_url: string;
  links: Record<string, string>;
  created_at: string;
  updated_at: string;
  unit?: Unit;
  member?: Member | null;
  vibe_tags?: VibeTag[];
}

export interface SongWithRelations extends Song {
  unit: Unit;
  member: Member | null;
  vibe_tags: VibeTag[];
}

export type InquiryType = "request" | "question" | "other";
export type InquiryStatus = "pending" | "in_progress" | "completed" | "issued";

export interface Inquiry {
  id: string;
  inquiry_type: InquiryType;
  name: string | null;
  content: string;
  status: InquiryStatus;
  github_issue_url: string | null;
  created_at: string;
  updated_at: string;
}

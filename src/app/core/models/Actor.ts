export interface Actor {
  profile_path: string;
  name: string;
  character: string;
}

export interface CreditsDTO {
  cast: Actor[];
};
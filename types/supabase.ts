export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accreditation: {
        Row: {
          email: string | null
          type: number
          uuid: string
        }
        Insert: {
          email?: string | null
          type: number
          uuid: string
        }
        Update: {
          email?: string | null
          type?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "accreditation_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "accreditation_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "profile_type"
            referencedColumns: ["id"]
          }
        ]
      }
      food_restriction: {
        Row: {
          content: string
          id: number
        }
        Insert: {
          content: string
          id?: number
        }
        Update: {
          content?: string
          id?: number
        }
        Relationships: []
      }
      mentor_profile: {
        Row: {
          cv_link: string | null
          email: string
          notes: string | null
          share_cv: boolean
          shirt_size: string
          sleep: boolean
        }
        Insert: {
          cv_link?: string | null
          email: string
          notes?: string | null
          share_cv: boolean
          shirt_size: string
          sleep: boolean
        }
        Update: {
          cv_link?: string | null
          email?: string
          notes?: string | null
          share_cv?: boolean
          shirt_size?: string
          sleep?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "mentor_profile_email_fkey"
            columns: ["email"]
            isOneToOne: true
            referencedRelation: "person"
            referencedColumns: ["email"]
          }
        ]
      }
      participant_profile: {
        Row: {
          accepted: number
          age: number
          city: string
          credits: boolean
          cv_link: string | null
          email: string
          genre: string
          motivation: string | null
          notes: string | null
          phone: string
          school: string
          share_cv: boolean
          shirt_size: string
          sleep: boolean
          studies: string
          study_level: string
          year: number | null
        }
        Insert: {
          accepted: number
          age: number
          city: string
          credits: boolean
          cv_link?: string | null
          email: string
          genre: string
          motivation?: string | null
          notes?: string | null
          phone: string
          school: string
          share_cv: boolean
          shirt_size: string
          sleep: boolean
          studies: string
          study_level: string
          year?: number | null
        }
        Update: {
          accepted?: number
          age?: number
          city?: string
          credits?: boolean
          cv_link?: string | null
          email?: string
          genre?: string
          motivation?: string | null
          notes?: string | null
          phone?: string
          school?: string
          share_cv?: boolean
          shirt_size?: string
          sleep?: boolean
          studies?: string
          study_level?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_profile_email_fkey"
            columns: ["email"]
            isOneToOne: true
            referencedRelation: "person"
            referencedColumns: ["email"]
          }
        ]
      }
      pass: {
        Row: {
          accreditation: string
          date: string
          event: number
          id: number
        }
        Insert: {
          accreditation: string
          date: string
          event: number
          id?: number
        }
        Update: {
          accreditation?: string
          date?: string
          event?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pass_accreditation_fkey"
            columns: ["accreditation"]
            isOneToOne: false
            referencedRelation: "accreditation"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "pass_event_fkey"
            columns: ["event"]
            isOneToOne: false
            referencedRelation: "pass_event"
            referencedColumns: ["id"]
          }
        ]
      }
      pass_event: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      person: {
        Row: {
          dni: string | null
          email: string
          food_restriction: number
          name: string
          type: number
        }
        Insert: {
          dni?: string | null
          email: string
          food_restriction: number
          name: string
          type: number
        }
        Update: {
          dni?: string | null
          email?: string
          food_restriction?: number
          name?: string
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "person_food_restriction_fkey"
            columns: ["food_restriction"]
            isOneToOne: false
            referencedRelation: "food_restriction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "profile_type"
            referencedColumns: ["id"]
          }
        ]
      }
      profile_type: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      sponsor_profile: {
        Row: {
          company: string
          email: string
        }
        Insert: {
          company: string
          email: string
        }
        Update: {
          company?: string
          email?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_profile_email_fkey"
            columns: ["email"]
            isOneToOne: true
            referencedRelation: "person"
            referencedColumns: ["email"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

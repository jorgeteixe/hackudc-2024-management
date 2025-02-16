export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
            foreignKeyName: "accreditation_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "profile_type"
            referencedColumns: ["id"]
          },
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
          email: string
          notes: string | null
          share_cv: boolean
          shirt_size: string
        }
        Insert: {
          email: string
          notes?: string | null
          share_cv: boolean
          shirt_size: string
        }
        Update: {
          email?: string
          notes?: string | null
          share_cv?: boolean
          shirt_size?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_profile_email_fkey"
            columns: ["email"]
            isOneToOne: true
            referencedRelation: "person"
            referencedColumns: ["email"]
          },
        ]
      }
      participant_profile: {
        Row: {
          age: number
          city: string
          credits: boolean
          email: string
          motivation: string | null
          notes: string | null
          phone: string
          school: string
          share_cv: boolean
          shirt_size: string
          studies: string
          study_level: string
          year: number | null
        }
        Insert: {
          age: number
          city: string
          credits: boolean
          email: string
          motivation?: string | null
          notes?: string | null
          phone: string
          school: string
          share_cv: boolean
          shirt_size: string
          studies: string
          study_level: string
          year?: number | null
        }
        Update: {
          age?: number
          city?: string
          credits?: boolean
          email?: string
          motivation?: string | null
          notes?: string | null
          phone?: string
          school?: string
          share_cv?: boolean
          shirt_size?: string
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
          },
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
          date?: string
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
          },
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
          },
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
      qr_event: {
        Row: {
          date: string
          email: string
          id: number
        }
        Insert: {
          date?: string
          email: string
          id?: number
        }
        Update: {
          date?: string
          email?: string
          id?: number
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
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

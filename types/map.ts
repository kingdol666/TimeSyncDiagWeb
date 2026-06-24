// Map related types for thickness map visualization

export interface MapData {
  map_image: string; // base64 encoded image
  start_time: string;
  end_time: string;
  data_points_count: number;
  min_thickness: number;
  max_thickness: number;
  avg_thickness: number;
  created_at?: string;
}

export interface MapQueryResponse {
  success: boolean;
  message: string;
  data?: {
    map_image?: string;
    start_time?: string;
    end_time?: string;
    data_points_count?: number;
    min_thickness?: number;
    max_thickness?: number;
    avg_thickness?: number;
    maps?: MapData[];
    total_count?: number;
    time_range?: {
      start: string;
      end: string;
    };
  };
}

export interface TimeRangeRequest {
  start_time: string;
  end_time: string;
}

export interface MapTimeRange {
  from: string;
  to: string;
}

export interface MapFilters {
  timeRange: MapTimeRange;
  mode: "realtime" | "history";
}

export interface MapDisplayOptions {
  showLegend: boolean;
  showTimestamp: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}
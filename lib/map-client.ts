import type { MapQueryResponse, MapData, TimeRangeRequest } from "@/types/map";

/**
 * Map API client for thickness map visualization
 * Provides methods to fetch thickness maps from the backend
 */
class MapApiClient {
  private baseUrl = "/api/backend";

  /**
   * Get the latest thickness map
   * @returns Promise<MapQueryResponse> - Response containing the latest map data
   */
  async getLatestMap(): Promise<MapQueryResponse> {
    try {
      console.log("🔍 [MAP API] Fetching latest thickness map...");
      
      const response = await fetch(`${this.baseUrl}/thickness-map/map/latest`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MapQueryResponse = await response.json();
      
      console.log("🔍 [MAP API] Latest map response:", {
        success: data.success,
        message: data.message,
        hasData: !!data.data?.map_image,
      });

      return data;
    } catch (error) {
      console.error("❌ [MAP API] Error fetching latest map:", error);
      
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch latest map",
      };
    }
  }

  /**
   * Get thickness maps by time range
   * @param startTime - Start time in ISO format
   * @param endTime - End time in ISO format
   * @returns Promise<MapQueryResponse> - Response containing maps in the time range
   */
  async getMapsByTimeRange(startTime: string, endTime: string): Promise<MapQueryResponse> {
    try {
      console.log("🔍 [MAP API] Fetching maps by time range...", {
        startTime,
        endTime,
      });

      const requestBody: TimeRangeRequest = {
        start_time: startTime,
        end_time: endTime,
      };

      const response = await fetch(`${this.baseUrl}/thickness-map/map/range`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MapQueryResponse = await response.json();
      
      console.log("🔍 [MAP API] Time range maps response:", {
        success: data.success,
        message: data.message,
        totalCount: data.data?.total_count || 0,
        mapsCount: data.data?.maps?.length || 0,
      });

      return data;
    } catch (error) {
      console.error("❌ [MAP API] Error fetching maps by time range:", error);
      
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch maps by time range",
      };
    }
  }

  /**
   * Convert base64 image string to blob URL for display
   * @param base64String - Base64 encoded image string
   * @returns string - Blob URL for the image
   */
  createImageUrl(base64String: string): string {
    try {
      // Remove data:image prefix if present
      const cleanBase64 = base64String.replace(/^data:image\/\w+;base64,/, '');
      
      // Convert base64 to binary
      const binaryString = atob(cleanBase64);
      const bytes = new Uint8Array(binaryString.length);
      
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Create blob and URL
      const blob = new Blob([bytes], { type: 'image/png' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("❌ [MAP API] Error creating image URL:", error);
      throw new Error("Failed to create image URL from base64 data");
    }
  }

  /**
   * Clean up blob URL to prevent memory leaks
   * @param url - Blob URL to revoke
   */
  revokeImageUrl(url: string): void {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }
}

// Export singleton instance
export const mapApiClient = new MapApiClient();

export default MapApiClient;